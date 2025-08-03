import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBooks } from "@/lib/actions/books";
import DataBukuTableWrapper from "@/components/admin/data-buku/DataBukuTableWrapper";
import Header from "@/components/user-home/Header";

export default async function DataBukuPage() {
  const session = await getServerSession(authOptions);

  // Redirect jika bukan admin atau superadmin
  if (
    !session?.user ||
    (session.user.role !== "admin" && session.user.role !== "superadmin")
  ) {
    redirect("/");
  }

  // Ambil data buku
  const { books, error } = await getBooks();
  console.log(error);

  return (
    <>
      <Header />
      <div className="w-full p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Data Buku</h1>
          <p className="text-gray-600">Kelola data buku perpustakaan</p>
        </div>

        <div className="space-y-8">
          <DataBukuTableWrapper initialBooks={books} />
        </div>
      </div>
    </>
  );
}
