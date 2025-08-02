"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchPinjamanUser } from "@/lib/features/pinjamanSlice";
import type { Pinjaman } from "@/lib/types/pinjaman";
import type { Buku } from "@/lib/types/buku";
import PinjamanCard from "./PinjamanCard";
import type { DataPinjaman } from "@/lib/types/pinjaman";
import { useSession } from "next-auth/react";
import { PinjamanListSkeleton } from "./PinjamanListSkeleton";
import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";

export default function PinjamanList() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { pinjaman, error } = useAppSelector(
    (state) => state.pinjaman
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (session) {
      dispatch(fetchPinjamanUser()).finally(() => setIsInitialLoad(false));
    }
  }, [dispatch, session]);

  // Mapping pinjaman ke DataPinjaman agar sesuai dengan PinjamanCard
  const pinjamanData = useMemo(
    () =>
      pinjaman.map((p: Pinjaman) => {
        const buku: Partial<Buku> = p.buku ?? {};
        return {
          id: String(p.id),
          id_books: buku.id ?? 0,
          judul: buku.title ?? "",
          sinopsis: buku.sinopsis ?? "",
          cover: buku.cover ?? "/file.svg",
          stok: buku.stok ?? 0,
          tanggalPinjam: p.tanggal_dipinjam
            ? new Date(p.tanggal_dipinjam)
            : new Date(),
          durasiPinjam: p.durasi_pinjaman,
          statusPinjaman: p.status as DataPinjaman["statusPinjaman"],
        };
      }),
    [pinjaman]
  );

  if (isInitialLoad) {
    return <PinjamanListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Gagal memuat data: {error}
        <Button
          onClick={() => dispatch(fetchPinjamanUser())}
          className="ml-2 px-3 py-1 bg-red-100 rounded-md text-red-600"
        >
          Coba Lagi
        </Button>
      </div>
    );
  }

  // Jika pinjaman tidak ada
  if (pinjamanData.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p>Belum ada data pinjaman</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pinjamanData.map((pinjaman) => (
        <PinjamanCard key={pinjaman.id} data={pinjaman} />
      ))}
    </div>
  );
}
