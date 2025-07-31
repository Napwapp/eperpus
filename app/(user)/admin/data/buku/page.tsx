import { getBooks } from "@/lib/actions/books";
import DataBukuForm from "@/components/admin/data-buku/DataBukuForm";
import DataBukuTable from "@/components/admin/data-buku/DataBukuTable";

export default async function DataBukuPage() {
  const { books } = await getBooks();

  return (
    <div className="w-full p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Data Buku</h1>
        <p className="text-gray-600">Kelola data buku perpustakaan</p>
      </div>
      
      <div className="space-y-8">
        <DataBukuForm />
        <DataBukuTable books={books} />
      </div>
    </div>
  );
} 