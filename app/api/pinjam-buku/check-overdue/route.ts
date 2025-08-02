import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import dayjs from "@/lib/utils/dayjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Pastikan user terautentikasi dan memiliki role admin/superadmin
    if (!session?.user?.email || (session.user.role !== "admin" && session.user.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const today = dayjs().toDate();

    // Cari pinjaman yang sudah melewati tanggal_dikembalikan dan masih aktif/diperpanjang
    const overduePinjaman = await prisma.pinjaman.findMany({
      where: {
        status: {
          in: ['aktif', 'diperpanjang']
        },
        tanggal_dikembalikan: {
          lt: today
        }
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

    // Update status menjadi menunggu_pengembalian
    const updatePromises = overduePinjaman.map(pinjaman =>
      prisma.pinjaman.update({
        where: { id: pinjaman.id },
        data: { status: 'menunggu_pengembalian' },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      message: `Terlambat mengembalikan pinjaman ${overduePinjaman.length}`,
      updatedCount: overduePinjaman.length,
      overduePinjaman,
    });
  } catch (error) {
    console.error("Error checking overdue pinjaman:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 