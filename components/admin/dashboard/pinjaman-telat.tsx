"use client";

import { useEffect, useState } from "react";
import dayjs from "@/lib/utils/dayjs";
import type { Pinjaman } from "@/lib/types/pinjaman";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PinjamanTelatItem } from "./pinjaman-telat/item";
import { PinjamanTelatSkeleton } from "./pinjaman-telat-skeleton";


type PinjamanTelatMapped = {
  id: number;
  userName: string;
  bukuTitle: string;
  status:
    | "request"
    | "aktif"
    | "diperpanjang"
    | "menunggu_pengembalian"
    | "done"
    | "refused";
  tanggalPinjam: string;
  durasi: number;
  hariTelat: number;
};

export function PinjamanTelat() {
  const [pinjamanTelatData, setPinjamanTelatData] = useState<
    PinjamanTelatMapped[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/pinjam-buku", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Pinjaman[]) => {
        // Filter status menunggu_pengembalian
        const telat = Array.isArray(data)
          ? data.filter((p) => p.status === "menunggu_pengembalian")
          : [];
        // Map ke props yang dibutuhkan komponen item dan hitung hari telat
        const mapped: PinjamanTelatMapped[] = telat.map((p) => {
          const tanggalPinjam = p.tanggal_permintaan
            ? dayjs(p.tanggal_permintaan)
            : dayjs(p.createdAt);
          const durasi = p.durasi_pinjaman;
          const batasKembali = tanggalPinjam.add(durasi, "day");
          const hariTelat = Math.max(dayjs().diff(batasKembali, "day"), 0);
          return {
            id: p.id,
            userName: p.user?.name || "-",
            bukuTitle: p.buku?.title || "-",
            status: p.status,
            tanggalPinjam: tanggalPinjam.toISOString(),
            durasi,
            hariTelat,
          };
        });
        setPinjamanTelatData(mapped);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data pinjaman telat");
        setLoading(false);
      });
  }, []);

if (loading) {
    return <PinjamanTelatSkeleton />
  }

  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          Pinjaman telat
          <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
            {loading ? "..." : pinjamanTelatData.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-red-200 scrollbar-track-gray-100">
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : pinjamanTelatData.length === 0 ? (
          <div className="text-center text-gray-400">
            Tidak ada pinjaman yang telat untuk saat ini
          </div>
        ) : (
          pinjamanTelatData.map((pinjaman) => (
            <PinjamanTelatItem key={pinjaman.id} pinjaman={pinjaman} />
          ))
        )}
      </CardContent>
    </Card>
  );
}
