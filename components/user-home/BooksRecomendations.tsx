"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import BookCard from "./BookCard";

// Dummy data untuk rekomendasi buku (8 buku untuk 2 baris x 4 grid)
const recommendedBooksData = [
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/file.svg",
    category: "History",
    release_date: "2025-07-29",
  },
  {
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    cover: "/file.svg",
    category: "Self Improvement",
    release_date: "2025-07-29",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "/file.svg",
    category: "Finance",
    release_date: "2025-07-29",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "/file.svg",
    category: "Business",
    release_date: "2025-07-29",
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "/file.svg",
    category: "Psychology",
    release_date: "2025-07-29",
  },
  {
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    cover: "/file.svg",
    category: "Novel",
    release_date: "2025-07-29",
  },
  {
    title: "Dilan 1990",
    author: "Pidi Baiq",
    cover: "/file.svg",
    category: "Novel",
    release_date: "2025-07-29",
  },
  { title: "Bumi", author: "Tere Liye", cover: "/file.svg", category: "Novel", release_date: "2025-07-29" },
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rekomendasi untuk Anda</h2>
        <p className="text-gray-600">Berdasarkan minat membaca Anda</p>
      </div>
      
      {/* Grid layout: 2 rows x 4 columns with row gap */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {recommendedBooksData.map((book, idx) => (
          <BookCard key={idx} id={book.title.toLowerCase().replace(/\s+/g, "-")} {...book} />
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
