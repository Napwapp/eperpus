"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Clock, BookOpen, Trash2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataPinjaman } from "@/lib/types/pinjaman";
import { useRouter } from "next/navigation";
import { showAlert } from "../ui/toast";
import dayjs from "@/lib/utils/dayjs";
import Image from "next/image";
import Link from "next/link";

interface PinjamanCardProps {
  data: DataPinjaman;
}

export default function PinjamanCard({ data }: PinjamanCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState(false); // State untuk loading

  // handleDelete
    const handleDelete = async () => {
    setIsDeleting(true); // Aktifkan loading state
    try {
      const response = await fetch(`/api/user/pinjaman/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Gagal menghapus pinjaman");
      }

      showAlert({ message: "Pinjaman berhasil dihapus", type: "success" });
      router.refresh();
    } catch (error) {
      showAlert({
        message: error instanceof Error ? error.message : "Terjadi kesalahan",
        type: "error",
      });
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false); // Matikan loading state
    }
  };

  // Hitung mundur real-time
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const pinjamDate = dayjs(data.tanggalPinjam);
      const deadline = pinjamDate.add(data.durasiPinjam, "day");

      const diff = deadline.diff(now);

      // Ketika durasi telah habis
      if (diff <= 0) {
        setTimeLeft("Waktu habis");
        return;
      }

      const duration = dayjs.duration(diff);
      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();

      if (days > 0) {
        setTimeLeft(`${days} hari ${hours} jam`);
      } else if (hours > 0) {
        setTimeLeft(`${hours} jam ${minutes} menit`);
      } else {
        setTimeLeft(`${minutes} menit`);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update setiap menit

    return () => clearInterval(interval);
  }, [data.tanggalPinjam, data.durasiPinjam]);

  // Status pinjaman
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "request":
        return "warning";
      case "aktif":
        return "success";
      case "diperpanjang":
        return "warning";
      case "menunggu_pengembalian":
        return "destructive";
      case "done":
        return "success";
      case "refused":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "request":
        return "Menunggu Persetujuan";
      case "aktif":
        return "Aktif";
      case "diperpanjang":
        return "Diperpanjang";
      case "menunggu_pengembalian":
        return "Menunggu Pengembalian";
      case "done":
        return "Selesai";
      case "refused":
        return "Ditolak";
      default:
        return status;
    }
  };


  return (
    <Card className="w-full p-4 border border-gray-200 rounded-xl shadow-sm my-4 relative">
      {/* Button delete */}
      {data.statusPinjaman === "done" && (
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="absolute bottom-2 right-2 p-2 h-8 w-8"
          disabled={isDeleting} // Disable button saat loading
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" /> // Spinner saat loading
          ) : (
            <Trash2 className="w-4 h-4" /> // Icon trash normal
          )}
        </Button>
      )}

      <div className="flex gap-4">
        {/* Cover Buku */}
        <Link href={`/detail-book/${data.id_books}/${data.judul}`}>
          <div className="flex-shrink-0 relative w-20 h-24">
            {data.cover ? (
              <Image
                src={data.cover}
                alt={`Cover ${data.judul}`}
                fill
                className="object-cover rounded-sm border border-gray-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/file.svg";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-sm border border-gray-300 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {data.judul}
          </h3>

          {/* Synopsis dengan collapse */}
          <div className="space-y-2">
            <div className="relative">
              <p className="text-gray-600 text-sm leading-relaxed pr-8 text-justify">
                {isExpanded
                  ? data.sinopsis
                  : `${data.sinopsis.substring(0, 100)}...`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute top-0 right-0 p-1 min-w-0 w-6 h-6"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Info tambahan */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span>Stok: {data.stok}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {data.statusPinjaman === "done"
                ? "Selesai"
                : data.statusPinjaman === "refused"
                ? "Tidak disetujui"
                : timeLeft}
            </div>
          </div>
        </div>

        {/* Status Pinjaman */}
        <div className="flex-shrink-0">
          <Badge variant={getStatusVariant(data.statusPinjaman)}>
            {getStatusText(data.statusPinjaman)}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
