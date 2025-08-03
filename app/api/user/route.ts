// app/api/users/route.ts
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  // Cek apakah user login
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Cek apakah role adalah admin atau superadmin
  if (
    session.user.role !== "admin" &&
    session.user.role !== "superadmin"
  ) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Gagal mengambil data user" }, { status: 500 });
  }
}
