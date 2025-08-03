import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import dayjs from "@/lib/utils/dayjs";

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Pastikan user terautentikasi dan memiliki role admin/superadmin
    if (!session?.user?.email || (session.user.role !== "admin" && session.user.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { pinjamanId } = body;

    if (!pinjamanId) {
      return NextResponse.json(
        { error: "Pinjaman ID is required" },
        { status: 400 }
      );
    }

    // Ambil data pinjaman
    const pinjaman = await prisma.pinjaman.findUnique({
      where: { id: parseInt(pinjamanId) },
      include: {
        buku: true,
      },
    });

    if (!pinjaman) {
      return NextResponse.json(
        { error: "Pinjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    if (pinjaman.status !== 'request') {
      return NextResponse.json(
        { error: "Pinjaman sudah diproses" },
        { status: 400 }
      );
    }

    // Hitung tanggal dipinjam dan dikembalikan
    const tanggalDipinjam = dayjs().toDate();
    const tanggalDikembalikan = dayjs().add(pinjaman.durasi_pinjaman, 'day').toDate();

    // Update pinjaman status menjadi aktif
    const updatedPinjaman = await prisma.pinjaman.update({
      where: { id: parseInt(pinjamanId) },
      data: {
        status: 'aktif',
        tanggal_dipinjam: tanggalDipinjam,
        tanggal_dikembalikan: tanggalDikembalikan,
      },
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
    });

    return NextResponse.json({
      message: "Pinjaman berhasil disetujui",
      pinjaman: updatedPinjaman,
    });
  } catch (error) {
    console.error("Error approving pinjaman:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 