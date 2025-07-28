import { NextResponse } from "next/server";
import { registerUserSchema } from "@/validations/userSchema";
import { PrismaClient } from "@/lib/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Validasi
    const parsed = registerUserSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json({ error: firstIssue ? firstIssue.message : "Validasi gagal" }, { status: 400 });
    }
    const data = parsed.data;

    // Cek existing email
    const existing = await prisma.users.findUnique({ where: { email: data.email } });
    if (existing) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    let gender: "laki_laki" | "perempuan";
    if (data.kelamin === "Laki-laki") gender = "laki_laki";
    else gender = "perempuan";

    // Simpan user
    await prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        nomorHp: data.nohp,
        alamat: data.alamat,
        gender,
        verified_at: null,
      },
    });

    return NextResponse.json({ success: true, email: data.email, message: "Registrasi berhasil. Silakan lanjutkan verifikasi OTP." });
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
