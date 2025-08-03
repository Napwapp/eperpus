import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const pinjaman = await prisma.pinjaman.findMany({
      where: {
        user: { email: session.user.email },
        isDeleted: false
      },
      include: {
        buku: {
          select: {
            id: true,
            title: true,
            author: true,
            cover: true,
            sinopsis: true,
            stok: true,
          },
        },
      },
    });

    return NextResponse.json(pinjaman);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
