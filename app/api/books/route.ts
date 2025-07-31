import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient, Prisma } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const skip = (page - 1) * limit;

    // buat where clause dengan tipe Prisma yang tepat
    const where: Prisma.bukuWhereInput = {};
    
    // jika ada pencarian
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { sinopsis: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categories = {
        some: {
          kategori: { contains: category, mode: 'insensitive' }
        }
      };
    }

    // Ambil data buku
    const [books, total] = await Promise.all([
      prisma.buku.findMany({
        where,
        include: {
          categories: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.buku.count({ where }),
    ]);

    return NextResponse.json({
      books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user || (session.user.role !== "admin" && session.user.role !== "superadmin")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      sinopsis,
      author,
      publisher,
      release_date,
      rak,
      lokasi,
      stok,
      cover,
      categories
    } = body;

    // Validate required fields
    if (!title || !sinopsis || !author || !lokasi || stok === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create book with categories
    const book = await prisma.buku.create({
      data: {
        title,
        sinopsis,
        author,
        publisher: publisher || null,
        release_date: release_date ? new Date(release_date) : null,
        rak: rak || null,
        lokasi,
        stok: parseInt(stok),
        cover: cover || null,
        categories: {
          create: categories?.map((category: string) => ({
            kategori: category
          })) || []
        }
      },
      include: {
        categories: true
      }
    });

    return NextResponse.json(
      { 
        message: "Buku berhasil ditambahkan",
        book: {
          ...book,
          createdAt: book.createdAt.toISOString(),
          updatedAt: book.updatedAt.toISOString(),
          release_date: book.release_date?.toISOString() || null,
          categories: book.categories.map(category => ({
            ...category,
            createdAt: category.createdAt.toISOString(),
            updatedAt: category.updatedAt.toISOString(),
          }))
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating book:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 