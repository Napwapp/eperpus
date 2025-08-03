// Komponen fetching data detail buku
import CoverBooks from "./CoverBooks";
import BooksData from "./BooksData";
import CardPinjamBuku from "./CardPinjamBuku";
import { getBookById } from "@/lib/actions/books";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clsx from "clsx";


interface DetailBookAsyncProps {
  id: string;
}

export default async function DetailBookAsync({ id }: DetailBookAsyncProps) {
  const { book: buku, error } = await getBookById(id);

  if (error || !buku) {
    throw new Error(error || "Buku tidak ditemukan");
  }

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const isAdmin = role === "admin" || role === "superadmin";

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Cover Books */}
        <div className="lg:col-span-1">
          <CoverBooks cover={buku.cover} title={buku.title} />
        </div>

        {/* Middle Section - Books Data */}
        <div className={clsx("lg:col-span-1", isAdmin && "lg:col-span-2")}>
          <BooksData buku={buku} />
        </div>

        {/* Right Section - Card Pinjam Buku */}
        {!isAdmin && (
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <CardPinjamBuku bukuId={buku.id} bukuTitle={buku.title} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
