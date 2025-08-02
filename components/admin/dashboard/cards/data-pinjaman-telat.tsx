"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export function DataPinjamanTelatCard() {
  const [jumlah, setJumlah] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pinjam-buku", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const telat = Array.isArray(data)
          ? data.filter((p) => p.status === "menunggu_pengembalian")
          : [];
        setJumlah(telat.length);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data pinjaman telat");
        setLoading(false);
      });
  }, []);

  return (
    <Card className="border-violet-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-red-600">
          Data Pinjaman Telat
        </CardTitle>
        <div className="flex items-center space-x-1">
          {/* Book icon tetap tampil */}
          <Book className="h-5 w-5 text-red-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2">
          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
              <span className="text-sm text-gray-500">Memuat data...</span>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <>
              <div className="text-2xl font-bold text-red-600">{jumlah}</div>
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Pinjaman melewati batas waktu
        </p>
      </CardContent>
    </Card>
  );
}
