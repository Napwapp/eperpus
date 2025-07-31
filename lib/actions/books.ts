'use server';

import { PrismaClient } from "@/lib/generated/prisma";
import { Buku } from "@/lib/types/buku";

const prisma = new PrismaClient();

// Ambil semua data buku
export async function getBooks() {
  try {
    const books = await prisma.buku.findMany({
      include: {
        categories: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Convert Prisma Date objects to string format for compatibility
    const formattedBooks: Buku[] = books.map(book => ({
      ...book,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      release_date: book.release_date?.toISOString() || null,
      categories: book.categories.map(category => ({
        ...category,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
      })),
    }));

    return { books: formattedBooks, error: null };
  } catch (error) {
    console.error("Error fetching books:", error);
    return { books: [], error: "Gagal memuat data buku" };
  }
}

// Ambil data buku berdasarkan id
export async function getBookById(id: string) {
  try {
    const book = await prisma.buku.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: true,
      },
    });

    if (!book) {
      return { book: null, error: "Buku tidak ditemukan" };
    }

    // Convert Prisma Date objects to string format
    const formattedBook: Buku = {
      ...book,
      createdAt: book.createdAt.toISOString(),
      updatedAt: book.updatedAt.toISOString(),
      release_date: book.release_date?.toISOString() || null,
      categories: book.categories.map(category => ({
        ...category,
        createdAt: category.createdAt.toISOString(),
        updatedAt: category.updatedAt.toISOString(),
      })),
    };

    return { book: formattedBook, error: null };
  } catch (error) {
    console.error("Error fetching book:", error);
    return { book: null, error: "Gagal memuat detail buku" };
  }
} 