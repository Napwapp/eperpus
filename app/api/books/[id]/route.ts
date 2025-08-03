import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@/lib/generated/prisma";
import { bookEditSchema } from "@/validations/bookSchema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bookId = parseInt(params.id);

    // Jika id buku bukan nomer
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }

    // ambil data buku
    const book = await prisma.buku.findUnique({
      where: { id: bookId },
      include: {
        categories: true,
      },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (
      !session?.user ||
      (session.user.role !== "admin" && session.user.role !== "superadmin")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }
    const body = await request.json();

    // Validasi pakai bookEditSchema
    const parsed = bookEditSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // Update buku
    const updated = await prisma.buku.update({
      where: { id: bookId },
      data: {
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        release_date: data.release_date ? new Date(data.release_date) : null,
        rak: data.rak,
        lokasi: data.lokasi,
        stok: parseInt(data.stok),
        sinopsis: data.sinopsis,
        cover: typeof data.cover === "string" ? data.cover : undefined,
        updatedAt: new Date(),
        // Hapus semua kategori lama, lalu tambah yang baru
        categories: {
          deleteMany: {},
          create: data.categories.map((kategori: string) => ({ kategori })),
        },
      },
      include: { categories: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and has admin role
    if (
      !session?.user ||
      (session.user.role !== "admin" && session.user.role !== "superadmin")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bookId = parseInt(params.id);
    if (isNaN(bookId)) {
      return NextResponse.json({ error: "Invalid book ID" }, { status: 400 });
    }
    // Ambil data buku dulu untuk dapat cover
    const book = await prisma.buku.findUnique({ where: { id: bookId } });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    // Hapus buku
    await prisma.buku.delete({ where: { id: bookId } });

    // Jika ada cover, hapus dari Cloudinary
    if (book.cover) {
      // Extract publicId dari URL Cloudinary
      const match = book.cover.match(/eperpus\/books\/([^\.]+)\./);
      if (match && match[1]) {
        const publicId = `eperpus/books/${match[1]}`;
        // Panggil API internal untuk hapus dari Cloudinary
        await fetch(
          `${
            process.env.BASE_URL || "http://localhost:3000"
          }/api/upload/delete`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ publicId }),
          }
        );
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
