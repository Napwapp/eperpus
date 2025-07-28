import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: "Email dan kode OTP wajib diisi" }, { status: 400 });
    }

    // Cari user
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Cari OTP
    const otp = await prisma.otps.findFirst({
      where: {
        userId: user.id,
        code,
      },
    });

    if (!otp) {
      return NextResponse.json({ error: "Kode OTP tidak valid" }, { status: 400 });
    }

    // Cek expired
    if (dayjs().isAfter(otp.expired)) {
      return NextResponse.json({ error: "Kode sudah expired, tidak bisa digunakan lagi" }, { status: 400 });
    }

    // Update user verified_at
    await prisma.users.update({
      where: { id: user.id },
      data: { verified_at: new Date() },
    });

    // Hapus OTP yang sudah dipakai
    await prisma.otps.delete({ where: { id: otp.id } });

    return NextResponse.json({ success: true, message: "Verifikasi berhasil, silakan login." });
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
