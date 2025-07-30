import BookCard from "../user-home/BookCard";

const BooksData = [
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    cover: "/file.svg",
    category: "History",
    release_date: "2025-07-29",
  },
  {
    id: "filosofi-teras",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    cover: "/file.svg",
    category: "Self Improvement",
    release_date: "2025-07-29",
  },
  {
    id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "/file.svg",
    category: "Finance",
    release_date: "2025-07-29",
  },
  {
    id: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "/file.svg",
    category: "Business",
    release_date: "2025-07-29",
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    cover: "/file.svg",
    category: "Psychology",
    release_date: "2025-07-29",
  },
  {
    id: "negeri-5-menara",
    title: "Negeri 5 Menara",
    author: "Ahmad Fuadi",
    cover: "/file.svg",
    category: "Novel",
    release_date: "2025-07-29",
  },
  {
    id: "dilan-1990",
    title: "Dilan 1990",
    author: "Pidi Baiq",
    cover: "/file.svg",
    category: "Novel",
    release_date: "2025-07-29",
  },
  {
    id: "bumi",
    title: "Bumi",
    author: "Tere Liye",
    cover: "/file.svg",
    category: "Novel",
    release_date: "2025-07-29",
  },
];

export default function BooksGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {BooksData.map((book) => (
        <BookCard
          key={book.title}
          id={book.id}
          title={book.title}
          author={book.author}
          cover={book.cover}
          category={book.category}
          release_date={book.release_date}
        />
      ))}
    </div>
  );
}
