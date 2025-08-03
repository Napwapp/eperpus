"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { fetchBooks } from "@/lib/features/booksSlice";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { BukuSectionSkeleton } from "./BukuSkeletons";

export default function BukuSection() {
  const dispatch = useAppDispatch();
  const { books, loading, error } = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <BukuSectionSkeleton />;
  }

  return (
    <section id="buku" className="py-12 md:py-16 bg-violet-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
          Koleksi Buku Populer
        </h2>

        {error ? (
          <p className="text-center text-sm text-red-500">
            Terjadi kesalahan: {error}
          </p>
        ) : books.length === 0 ? (
          <p className="text-center text-sm text-gray-500">
            Belum ada buku tersedia.
          </p>
        ) : (
          <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-violet-200">
            {books.map((book) => (
              <Card
                key={book.id}
                className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[220px] md:max-w-[220px] bg-white shadow-md flex-shrink-0"
              >
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Image
                    src={book.cover || "/file.svg"}
                    alt={book.title}
                    width={80}
                    height={110}
                    className="mb-2 sm:mb-3 rounded w-[60px] h-[80px] sm:w-[80px] sm:h-[110px] object-cover"
                  />
                  <CardTitle className="text-sm sm:text-base text-violet-700 mb-1 text-center line-clamp-2 min-h-[2.5em]">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mb-2 text-center line-clamp-1">
                    {book.author}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
