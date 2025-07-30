import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email parameter is required" },
        { status: 400 }
      );
    }

    // Validate that the user is requesting their own profile
    if (email !== session.user.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized to access this profile" },
        { status: 403 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        nomorHp: true,
        alamat: true,
        gender: true,
        role: true,
        createdAt: true,
        verified_at: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        nomorHp: user.nomorHp,
        alamat: user.alamat,
        gender: user.gender,
        role: user.role,
        createdAt: user.createdAt.toISOString(),
        verified_at: user.verified_at?.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat memuat data profil" },
      { status: 500 }
    );
  }
}