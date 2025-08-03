import { Suspense } from "react";
import DetailBookHeader from "@/components/detail-books/Header";
import DetailBookAsync from "@/components/detail-books/DetailBookAsync";
import DetailBookSkeleton from "@/components/skeletons/DetailBookSkeleton";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";

// Perbaikan tipe params menggunakan Promise
interface DetailBookPageProps {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

function ErrorFallback() {
  return (
    <div className="text-center py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Buku tidak ditemukan</h1>
      <p className="text-gray-600 mb-4">Buku yang Anda cari tidak ditemukan atau telah dihapus.</p>
    </div>
  );
}

// Tambahkan async dan await untuk params
export default async function DetailBookPage({ params }: DetailBookPageProps) {
  // Await the params promise to get the actual values
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div className="min-h-screen bg-gray-50">      
      <DetailBookHeader />
      <div className="container mx-auto px-4 py-8">
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Suspense fallback={<DetailBookSkeleton />}>
            {/* Kirim id yang sudah di-resolve */}
            <DetailBookAsync id={id} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}