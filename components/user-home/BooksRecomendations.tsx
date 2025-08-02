"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import BookCard from "./BookCard";
import { Kategori } from "@/lib/types/buku";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { fetchBooks } from "@/lib/features/booksSlice";
import type { RootState } from "@/lib/store";

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  cover?: string | null;
  categories: Kategori[];
  release_date?: string | null;
}

// ...dummy data dihapus, gunakan data dari redux


export default function BooksRecomendations() {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleLoadMore = () => {
    // TODO: Implement load more functionality
    dispatch(fetchBooks()); // bisa tambahkan pagination nanti
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
        {loading ? (
          <div className="col-span-4 text-center">Loading...</div>
        ) : error ? (
          <div className="col-span-4 text-center text-red-500">{error}</div>
        ) : books.length > 0 ? (
          books.slice(0, 10).map((book: BookCardProps) => (
            <BookCard key={book.id} {...book} />
          ))
        ) : (
          <div className="col-span-4 text-center">Tidak ada rekomendasi buku</div>
        )}
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
