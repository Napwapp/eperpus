import BookCard from "../user-home/BookCard";
import { getBooks } from "@/lib/actions/books";

export default async function BooksGridAsync() {
  const { books, error } = await getBooks();

  // Jika error
  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Tidak ada buku yang tersedia saat ini.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          cover={book.cover}
          categories={book.categories}
          release_date={book.release_date}
        />
      ))}
    </div>
  );
} 