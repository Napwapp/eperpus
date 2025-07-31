"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";

export default function PageNotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <main>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* 404 */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-violet-600 mb-4">404</div>
              <div className="w-24 h-1 bg-violet-600 mx-auto rounded-full"></div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Halaman Tidak Ditemukan
              </h1>
              <p className="text-gray-600 leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman
                mungkin telah dipindahkan, dihapus, atau URL yang dimasukkan
                salah.
              </p>
            </div>

            {/* Button */}
            <div className="space-y-4">
              <button
                onClick={handleGoBack}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Kembali ke Halaman Sebelumnya
              </button>

              <Link
                href="/"
                className="w-full bg-white hover:bg-gray-200 text-violet-600 font-semibold py-3 px-6 rounded-lg border-2 border-violet-600 transition-colors duration-200 shadow-lg flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Kembali ke Beranda
              </Link>
            </div>

            {/* Informasi Tambahan */}
            <div className="mt-8 text-sm text-gray-500">
              <p>
                Jika Anda yakin ini adalah kesalahan, silakan hubungi support
                kami.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
