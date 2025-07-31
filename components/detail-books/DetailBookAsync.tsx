// Komponen fetching data detail buku
import CoverBooks from "./CoverBooks";
import BooksData from "./BooksData";
import CardPinjamBuku from "./CardPinjamBuku";
import { getBookById } from "@/lib/actions/books";

interface DetailBookAsyncProps {
  id: string;
}

export default async function DetailBookAsync({ id }: DetailBookAsyncProps) {
  const { book: buku, error } = await getBookById(id);

  if (error || !buku) {
    throw new Error(error || "Buku tidak ditemukan");
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Section - Cover Books */}
      <div className="lg:col-span-1">
        <CoverBooks cover={buku.cover} title={buku.title} />
      </div>

      {/* Middle Section - Books Data */}
      <div className="lg:col-span-1">
        <BooksData buku={buku} />
      </div>

      {/* Right Section - Card Pinjam Buku */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <CardPinjamBuku 
            bukuId={buku.id}
            bukuTitle={buku.title}
          />
        </div>
      </div>
    </div>
  );
} 