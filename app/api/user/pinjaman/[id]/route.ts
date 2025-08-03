import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

interface DeleteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: Request,
  { params }: DeleteParams
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Resolve Promise dan konversi ke number
    const resolvedParams = await params;
    const pinjamanId = parseInt(resolvedParams.id);

    // Validasi ID
    if (isNaN(pinjamanId)) {
      return NextResponse.json(
        { error: "ID harus berupa angka" },
        { status: 400 }
      );
    }

    // Verifikasi kepemilikan pinjaman
    const pinjaman = await prisma.pinjaman.findFirst({
      where: {
        id: pinjamanId,
        user: { email: session.user.email },
      },
    });

    if (!pinjaman) {
      return NextResponse.json(
        { error: "Pinjaman tidak ditemukan" },
        { status: 404 }
      );
    }

    // Soft delete
    await prisma.pinjaman.update({
      where: { id: pinjamanId },
      data: { isDeleted: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}