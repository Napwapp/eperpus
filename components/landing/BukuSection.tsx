import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const books = [
  { title: "Atomic Habits", author: "James Clear", cover: "/file.svg", category: "Self Improvement" },
  { title: "Laskar Pelangi", author: "Andrea Hirata", cover: "/file.svg", category: "Novel" },
  { title: "Sapiens", author: "Yuval Noah Harari", cover: "/file.svg", category: "History" },
  { title: "Filosofi Teras", author: "Henry Manampiring", cover: "/file.svg", category: "Self Improvement" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", cover: "/file.svg", category: "Finance" },
  { title: "Bumi", author: "Tere Liye", cover: "/file.svg", category: "Novel" },
  { title: "The Lean Startup", author: "Eric Ries", cover: "/file.svg", category: "Business" },
  { title: "Negeri 5 Menara", author: "Ahmad Fuadi", cover: "/file.svg", category: "Novel" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "/file.svg", category: "Psychology" },
  { title: "Dilan 1990", author: "Pidi Baiq", cover: "/file.svg", category: "Novel" },
];

export default function BukuSection() {
  return (
    <section id="buku" className="py-12 md:py-16 bg-violet-50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">Koleksi Buku Populer</h2>
        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-violet-200">
          {books.map((book, idx) => (
            <Card key={idx} className="min-w-[160px] max-w-[160px] sm:min-w-[200px] sm:max-w-[200px] md:min-w-[220px] md:max-w-[220px] bg-white shadow-md flex-shrink-0">
              <CardContent className="flex flex-col items-center p-3 sm:p-4">
                <Image src={book.cover} alt={book.title} width={80} height={110} className="mb-2 sm:mb-3 rounded w-[60px] h-[80px] sm:w-[80px] sm:h-[110px] object-cover" />
                <CardTitle className="text-sm sm:text-base text-violet-700 mb-1 text-center line-clamp-2 min-h-[2.5em]">{book.title}</CardTitle>
                <CardDescription className="text-xs text-gray-500 mb-2 text-center line-clamp-1">{book.author}</CardDescription>
                <Badge className="bg-violet-100 text-violet-700 text-[10px] sm:text-xs">{book.category}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 