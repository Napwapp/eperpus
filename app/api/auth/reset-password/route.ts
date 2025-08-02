import { NextResponse } from "next/server";
import { resetPasswordEmailSchema } from "@/validations/userSchema";
import { PrismaClient } from "@/lib/generated/prisma";

// Step 1 Reset password (Cek email)
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validasi email
    const parsed = resetPasswordEmailSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json({ error: firstIssue ? firstIssue.message : "Validasi gagal" }, { status: 400 });
    }
    const { email } = parsed.data;

    // Cek apakah email ada di database
    const existingUser = await prisma.users.findUnique({ 
      where: { email: email },
      select: { id: true, email: true }
    });

    if (!existingUser) {
      return NextResponse.json({ error: "Email tidak ditemukan dalam sistem" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Email ditemukan. Silahkan atur password baru.",
      email: existingUser.email 
    });
  } catch (err: unknown) {
    const errorMessage = (err instanceof Error) ? err.message : "Terjadi kesalahan server";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
