import { NextResponse } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import dayjs from "dayjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
    }

    // Cari user
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User tidak ditemukan" }, { status: 404 });
    }

    // Hapus OTP expired untuk user ini
    await prisma.otps.deleteMany({
      where: {
        userId: user.id,
        expired: { lt: new Date() },
      },
    });

    // Generate OTP 6 digit
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expired = dayjs().add(5, "minute").toDate();

    // Simpan OTP ke otps
    await prisma.otps.create({
      data: {
        code: otp,
        expired,
        userId: user.id,
      },
    });

    // Kirim OTP ke email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Kode OTP Verifikasi Akun ePerpus anda",
      text: `Kode OTP Anda adalah: ${otp}\nKode berlaku selama 5 menit. Jangan berikan kode ini ke siapapun.`,
    });

    return NextResponse.json({ success: true, message: "OTP berhasil dikirim ke email." });
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 