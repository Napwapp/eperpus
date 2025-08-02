import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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

    if (pinjaman.status === 'request' || pinjaman.status === 'refused' || pinjaman.status === 'done') {
      return NextResponse.json(
        { error: "Pinjaman tidak dapat diselesaikan" },
        { status: 400 }
      );
    }

    // Update pinjaman status menjadi done dan kembalikan stok buku
    const [updatedPinjaman] = await prisma.$transaction([
      prisma.pinjaman.update({
        where: { id: parseInt(pinjamanId) },
        data: {
          status: 'done',
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
              stok: true,
            },
          },
        },
      }),
      prisma.buku.update({
        where: { id: pinjaman.id_books },
        data: { stok: pinjaman.buku.stok + 1 },
      }),
    ]);

    return NextResponse.json({
      message: "Pinjaman diselesaikan!",
      pinjaman: updatedPinjaman,
    });
  } catch (error) {
    console.error("Error completing pinjaman:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 