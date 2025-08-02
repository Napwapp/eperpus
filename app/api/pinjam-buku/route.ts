import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import dayjs from "@/lib/utils/dayjs";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check role dan pastikan sudah terautentikasi
    if (!session?.user?.email || (session.user.role !== "admin" && session.user.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Ambil semua data pinjaman dengan include user dan buku
    const pinjaman = await prisma.pinjaman.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        buku: {
          select: {
            id: true,
            title: true,
            author: true,
            cover: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(pinjaman);
  } catch (error) {
    console.error("Error fetching pinjaman:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Request pinjaman dari user
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Pastikan user terautentikasi
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bukuId, durasi_pinjaman, alasan } = body;

    // Pastikan bukuId dan durasi_pinjaman ada
    if (!bukuId || !durasi_pinjaman) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validasi durasi_pinjaman max 14
    if (parseInt(durasi_pinjaman) > 14) {
      return NextResponse.json(
        { error: "Durasi pinjaman maksimal 14 hari" },
        { status: 400 }
      );
    }

    // Validasi alasan max 150 karakter
    if (alasan && alasan.length > 150) {
      return NextResponse.json(
        { error: "Alasan maksimal 150 karakter" },
        { status: 400 }
      );
    }

    // Get user ID from session
    const user = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Cek apakah buku ada dan stoknya masih ada
    const book = await prisma.buku.findUnique({
      where: { id: parseInt(bukuId) },
    });

    if (!book) {
      return NextResponse.json(
        { error: "Buku tidak ditemukan" },
        { status: 404 }
      );
    }

    if (book.stok <= 0) {
      return NextResponse.json(
        { error: "Stok buku habis" },
        { status: 400 }
      );
    }

    // Cek apakah user sudah memiliki permintaan pinjaman buku yang aktif pada buku tersebut
    const existingRequest = await prisma.pinjaman.findFirst({
      where: {
        user_id: user.id,
        id_books: parseInt(bukuId),
        status: {
          in: ['request', 'aktif', 'diperpanjang']
        }
      }
    });

    // Jika ada
    if (existingRequest) {
      return NextResponse.json(
        { error: "Tidak bisa meminjam lagi. Kamu memiliki pinjaman yang belum selesai pada buku ini!" },
        { status: 400 }
      );
    }

    // Create pinjaman record and update book stock
    const [pinjaman] = await prisma.$transaction([
      prisma.pinjaman.create({
        data: {
          user_id: user.id,
          id_books: parseInt(bukuId),
          durasi_pinjaman: parseInt(durasi_pinjaman),
          status: 'request',
          tanggal_permintaan: dayjs().toDate(),
          alasan: alasan || null,
        },
      }),
      prisma.buku.update({
        where: { id: parseInt(bukuId) },
        data: { stok: book.stok - 1 },
      }),
    ]);

    return NextResponse.json({
      message: "Book borrowing request submitted successfully",
      pinjaman,
    });
  } catch (error) {
    console.error("Error creating pinjaman:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 