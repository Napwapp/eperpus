import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

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
    const { bukuId, durasi_pinjaman } = body;

    // Pastikan bukuId dan durasi_pinjaman ada
    if (!bukuId || !durasi_pinjaman) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
        { error: "Kamu sudah memiliki permintaan pinjaman buku yang aktif pada buku tersebut" },
        { status: 400 }
      );
    }

    // Create pinjaman record
    const pinjaman = await prisma.pinjaman.create({
      data: {
        user_id: user.id,
        id_books: parseInt(bukuId),
        durasi_pinjaman: parseInt(durasi_pinjaman),
        status: 'request',
      },
    });

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