import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, name, email, nomorHp, alamat, gender } = body;

    // Validate that the user is updating their own profile
    const currentUser = await prisma.users.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser || currentUser.id !== id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized to update this profile" },
        { status: 403 }
      );
    }

    // Check if email is already taken by another user
    if (email !== session.user.email) {
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== id) {
        return NextResponse.json(
          { success: false, error: "Email sudah digunakan oleh pengguna lain" },
          { status: 400 }
        );
      }
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        name,
        email,
        nomorHp,
        alamat,
        gender: gender === "laki_laki" ? "laki_laki" : "perempuan",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile berhasil diperbarui",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        nomorHp: updatedUser.nomorHp,
        alamat: updatedUser.alamat,
        gender: updatedUser.gender,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
        verified_at: updatedUser.verified_at,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat memperbarui profil" },
      { status: 500 }
    );
  }
} 