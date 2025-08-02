"use client";

import { useSession } from "next-auth/react";
import { BookOpen, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import InformationCard from "./InformationCard";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { useEffect, useMemo, useState } from "react";
import { fetchPinjamanUser } from "@/lib/features/pinjamanSlice";
import { InformationCardsSkeleton } from "./InformationCardsSkeleton";

export default function InformationCards() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { pinjaman, loading, error } = useAppSelector(
    (state) => state.pinjaman
  );
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (session) {
      dispatch(fetchPinjamanUser()).finally(() => {
        setisLoading(false);
      });
    }
  }, [dispatch, session]);

  // Hitung jumlah status dengan optimasi
  const { sedangDipinjam, pinjamanSelesai, totalDipinjam, telat } =
    useMemo(() => {
      if (!pinjaman)
        return {
          sedangDipinjam: 0,
          pinjamanSelesai: 0,
          totalDipinjam: 0,
          telat: 0,
        };

      return {
        sedangDipinjam: pinjaman.filter((p) => p.status === "aktif").length,
        pinjamanSelesai: pinjaman.filter((p) => p.status === "done").length,
        totalDipinjam: pinjaman.length,
        telat: pinjaman.filter((p) => p.status === "menunggu_pengembalian")
          .length,
      };
    }, [pinjaman]);

  const informationData = [
    {
      title: "Sedang Dipinjam",
      value: sedangDipinjam,
      subtitle: "buku aktif",
      icon: BookOpen,
      iconColor: "text-violet-600",
    },
    {
      title: "Pinjaman selesai",
      value: pinjamanSelesai,
      subtitle: "pinjaman yang telah selesai",
      icon: Clock,
      iconColor: "text-green-600",
    },
    {
      title: "Total Dipinjam",
      value: totalDipinjam,
      subtitle: "semua pinjaman",
      icon: TrendingUp,
      iconColor: "text-green-600",
    },
    {
      title: "Telat",
      value: telat,
      subtitle: "Segera kembalikan!",
      icon: AlertTriangle,
      iconColor: "text-red-600",
    },
  ];

  // Tampilkan skeleton hanya saat initial load
  if (isLoading) {
    return <InformationCardsSkeleton />;
  }

  // Jika error
  if (error) {
    return (
      <div className="col-span-4 text-center text-red-500 py-4">
        Gagal memuat data: {error}
        <button
          onClick={() => dispatch(fetchPinjamanUser())}
          className="ml-2 px-3 py-1 bg-red-100 rounded-md text-red-600"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {informationData.map((data, index) => (
        <InformationCard
          key={`${data.title}-${index}`}
          title={data.title}
          value={data.value}
          subtitle={data.subtitle}
          icon={data.icon}
          iconColor={data.iconColor}
          isLoading={loading && !isLoading} // Untuk subtle loading
        />
      ))}
    </div>
  );
}
