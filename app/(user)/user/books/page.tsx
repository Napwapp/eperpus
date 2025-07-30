import Header from "@/components/user-home/Header";
import BooksGrid from "@/components/user-books/BooksGrid";

export default function BooksPage() {
  return (  
    <div className="w-full overflow-hidden">
      <Header />
      <div>
        <h1 className="text-xl sm:text-2xl font-bold mb-7 text-gray-800">Daftar Buku</h1>
        <BooksGrid />
      </div>
    </div>
  );
} 