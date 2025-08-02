"use client";

import { Buku } from "@/lib/types/buku";
import Categories from "./Categories";
import { formatDateLong } from "@/lib/utils/dayjs";

interface BooksDataProps {
  buku: Buku;
}

export default function BooksData({ buku }: BooksDataProps) {
  return (
    <div className="flex-1 space-y-6">
      {/* Judul */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {buku.title}
        </h1>
      </div>

      {/* Tanggal Rilis */}
      {buku.release_date && (
        <div>
          <p className="text-sm text-gray-600">
            Tanggal Rilis: {formatDateLong(buku.release_date)}
          </p>
        </div>
      )}

      {/* Kategori */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Kategori:</h3>
        <Categories categories={buku.categories} />
      </div>

      {/* Penulis */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-1">Penulis:</h3>
        <p className="text-lg text-gray-900">{buku.author}</p>
      </div>

      {/* Publisher */}
      {buku.publisher && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Penerbit:</h3>
          <p className="text-lg text-gray-900">{buku.publisher}</p>
        </div>
      )}

      {/* Informasi Stok */}
      <div className="flex items-center gap-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Stok:</h3>
          <p className="text-lg font-medium text-gray-900">{buku.stok} buku</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Lokasi:</h3>
          <p className="text-lg text-gray-900">{buku.lokasi}</p>
        </div>
        {buku.rak && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-1">Rak:</h3>
            <p className="text-lg text-gray-900">{buku.rak}</p>
          </div>
        )}
      </div>

      {/* Sinopsis */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Sinopsis:</h3>
        <p className="text-gray-700 leading-relaxed">
          {buku.sinopsis}
        </p>
      </div>
    </div>
  );
}
