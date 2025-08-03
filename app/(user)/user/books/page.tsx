import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Header from "@/components/user-home/Header";
import BooksGrid from "@/components/user-books/BooksGrid";
import AddBookButton from "@/components/user-books/AddBookButton";

export default async function BooksPage() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;

  return (
    <div className="w-full overflow-hidden">
      <Header />
      <div>
        <div className="flex items-center justify-between mb-7">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Daftar Buku
          </h1>
          <AddBookButton userRole={userRole} />
        </div>
        <BooksGrid />
      </div>
    </div>
  );
}
