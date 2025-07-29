import Header from "@/components/user-home/Header";

export default function BooksPage() {
  return (  
    <div className="w-full overflow-hidden">
      <Header />
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Halaman Buku</h1>
        <p>Ini adalah halaman untuk mengelola buku.</p>
      </div>
    </div>
  );
} 