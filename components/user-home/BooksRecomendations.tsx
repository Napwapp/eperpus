"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import BookCard from "./BookCard";
import { Kategori } from "@/lib/types/buku";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  cover?: string | null;
  categories: Kategori[];
  release_date?: string | null;
}

const recommendedBooksData: BookCardProps[] = [
  {
    id: 1,
    cover: "/file.svg",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    categories: [{ 
      id: 1, 
      books_id: 1, 
      kategori: "History", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 2,
    cover: "/file.svg",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    categories: [{ 
      id: 2, 
      books_id: 2, 
      kategori: "Self Improvement", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 3,
    cover: "/file.svg",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    categories: [{ 
      id: 3, 
      books_id: 3, 
      kategori: "Finance", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 4,
    cover: "/file.svg",
    title: "The Lean Startup",
    author: "Eric Ries",
    categories: [{ 
      id: 4, 
      books_id: 4, 
      kategori: "Business", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 5,
    cover: "/file.svg",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    categories: [{ 
      id: 5, 
      books_id: 5, 
      kategori: "Psychology", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 6,
    cover: "/file.svg",
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    categories: [{ 
      id: 6, 
      books_id: 6, 
      kategori: "Novel", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
  {
    id: 7,
    cover: "/file.svg",
    title: "Bumi",
    author: "Tere Liye",
    categories: [{ 
      id: 7, 
      books_id: 7, 
      kategori: "Novel", 
      createdAt: "2025-07-29T00:00:00.000Z", 
      updatedAt: "2025-07-29T00:00:00.000Z" 
    }],
    release_date: "2025-07-29",
  },
];

export default function BooksRecomendations() {
  const handleLoadMore = () => {
    // TODO: Implement load more functionality
    console.log("Load more books");
  };

  return (
    <div className="space-y-6 mt-10">
      {/* Header */}
      <div className="text-left mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Rekomendasi untuk Anda
        </h2>
        <p className="text-gray-600">Berdasarkan minat membaca Anda</p>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {recommendedBooksData.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center">
        <Button
          variant="outline"
          size="lg"
          onClick={handleLoadMore}
          className="flex items-center border-2 gap-2 mx-auto"
        >
          <ChevronDown className="h-4 w-4" />
          Muat Lebih Banyak
        </Button>
      </div>
    </div>
  );
}
