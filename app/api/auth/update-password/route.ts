import { NextResponse } from "next/server";
import { resetPasswordNewPasswordSchema } from "@/validations/userSchema";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Step 2 Reset password (Update password)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validasi password baru
    const parsed = resetPasswordNewPasswordSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json({ error: firstIssue ? firstIssue.message : "Validasi gagal" }, { status: 400 });
    }
    const { newPassword, email } = body;

    // Cek apakah email ada di database
    const existingUser = await prisma.users.findUnique({ 
      where: { email: email },
      select: { id: true, email: true, password: true }
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 404 });
    }

    // Cek apakah password baru sama dengan password lama
    if (existingUser.password) {
      const isSamePassword = await bcrypt.compare(newPassword, existingUser.password);
      if (isSamePassword) {
        return NextResponse.json({ error: "Password baru tidak boleh sama dengan password sebelumnya" }, { status: 400 });
      }
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await prisma.users.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Password berhasil diubah. Silakan login dengan password baru Anda." 
    });

  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 