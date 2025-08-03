"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import Image from "next/image";
import { Check, X, BookCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showAlert } from "@/components/ui/toast";
import type { Pinjaman } from "@/lib/types/pinjaman";
import dayjs from "@/lib/utils/dayjs";
import { DataPinjamanTableSkeleton } from "./TableSkeleton";

export function DataPinjamanTable() {
  const [pinjamanData, setPinjamanData] = useState<Pinjaman[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data pinjaman
  const fetchPinjamanData = async () => {
    try {
      const response = await fetch("/api/pinjam-buku");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPinjamanData(data);
    } catch (error) {
      console.error("Error fetching pinjaman data:", error);
      showAlert({ message: "Gagal memuat data pinjaman", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Auto-check overdue pinjaman
  useEffect(() => {
    fetchPinjamanData();
    const checkOverdue = async () => {
      try {
        await fetch("/api/pinjam-buku/check-overdue", {
          method: "POST",
        });
      } catch (error) {
        console.error("Error checking overdue:", error);
      }
    };
    checkOverdue();
  }, []);

  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "-";
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  const shouldShowTanggalDipinjam = (status: string) => {
    return status !== "request" && status !== "refused";
  };

  const shouldShowTanggalDikembalikan = (status: string) => {
    return status !== "request" && status !== "refused";
  };

  const shouldShowAksi = (status: string) => {
    return status !== "request" && status !== "refused" && status !== "done";
  };

  // Setujui pinjaman
  const handleApprove = async (id: number) => {
    try {
      const response = await fetch("/api/pinjam-buku/approve", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinjamanId: id }),
      });
      const result = await response.json();
      if (!response.ok) {
        showAlert({
          message: result.error || "Gagal menyetujui pinjaman",
          type: "error",
        });
        return;
      }
      showAlert({ message: "Pinjaman berhasil disetujui", type: "success" });
      fetchPinjamanData(); // Refresh data
    } catch (error) {
      console.error("Error approving pinjaman:", error);
      showAlert({
        message: "Terjadi kesalahan saat menyetujui pinjaman",
        type: "error",
      });
    }
  };

  // Tolak permintaan pinjaman
  const handleReject = async (id: number) => {
    try {
      const response = await fetch("/api/pinjam-buku/refuse", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinjamanId: id }),
      });
      const result = await response.json();
      if (!response.ok) {
        showAlert({
          message: result.error || "Gagal menolak pinjaman",
          type: "error",
        });
        return;
      }
      showAlert({ message: "Pinjaman ditolak!", type: "success" });
      fetchPinjamanData(); // Refresh data
    } catch (error) {
      console.error("Error rejecting pinjaman:", error);
      showAlert({
        message: "Terjadi kesalahan saat menolak pinjaman",
        type: "error",
      });
    }
  };

  const handleComplete = async (id: number) => {
    try {
      const response = await fetch("/api/pinjam-buku/complete", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinjamanId: id }),
      });
      const result = await response.json();
      if (!response.ok) {
        showAlert({
          message: result.error || "Gagal menyelesaikan pinjaman",
          type: "error",
        });
        return;
      }
      showAlert({ message: "Pinjaman diselesaikan!", type: "success" });
      fetchPinjamanData(); // Refresh data
    } catch (error) {
      console.error("Error completing pinjaman:", error);
      showAlert({
        message: "Terjadi kesalahan saat menyelesaikan pinjaman",
        type: "error",
      });
    }
  };

  const hasRequestStatus = pinjamanData.some(
    (pinjaman) => pinjaman.status === "request"
  );
  const hasNonRequestStatus = pinjamanData.some(
    (pinjaman) =>
      pinjaman.status !== "request" &&
      pinjaman.status !== "refused" &&
      pinjaman.status !== "done"
  );

  if (loading) {
    return <DataPinjamanTableSkeleton />;
  }

  return (
    <Card className="border-violet-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Daftar Pinjaman Buku
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-violet-50">
                <TableHead className="w-16 text-center">ID</TableHead>
                <TableHead className="w-20 text-center">Cover</TableHead>
                <TableHead className="min-w-48">Buku / Judul Buku</TableHead>
                <TableHead className="min-w-32">Peminjam</TableHead>
                <TableHead className="w-24 text-center">Durasi</TableHead>
                <TableHead className="w-36 text-center">Status</TableHead>
                <TableHead className="w-32 text-center">
                  Tgl Permintaan
                </TableHead>
                <TableHead className="w-32 text-center">Tgl Dipinjam</TableHead>
                <TableHead className="w-32 text-center">
                  Tgl Dikembalikan
                </TableHead>
                <TableHead className="w-32 text-center">Dihapus</TableHead>
                {hasRequestStatus && (
                  <TableHead className="w-24 text-center">Aksi</TableHead>
                )}
                {hasNonRequestStatus && (
                  <TableHead className="w-24 text-center">Aksi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pinjamanData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data pinjaman
                  </TableCell>
                </TableRow>
              ) : (
                pinjamanData.map((pinjaman) => (
                  <TableRow key={pinjaman.id} className="hover:bg-violet-50/50">
                    <TableCell className="text-center font-medium">
                      {pinjaman.id}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        <Image
                          src={pinjaman.buku?.cover || "/file.svg"}
                          alt={`Cover ${pinjaman.buku?.title}`}
                          width={45}
                          height={60}
                          className="rounded-md border border-gray-200 object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900">
                        {pinjaman.buku?.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-700">
                        {pinjaman.user?.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm text-gray-600">
                        {pinjaman.durasi_pinjaman} hari
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={pinjaman.status} />
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {formatDate(pinjaman.tanggal_permintaan)}
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {shouldShowTanggalDipinjam(pinjaman.status)
                        ? formatDate(pinjaman.tanggal_dipinjam)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {shouldShowTanggalDikembalikan(pinjaman.status)
                        ? formatDate(pinjaman.tanggal_dikembalikan)
                        : "-"}
                    </TableCell>
                    <TableCell className="text-center text-sm text-gray-600">
                      {pinjaman.isDeleted ? "Dihapus" : "Aktif"}
                    </TableCell>
                    {hasRequestStatus && (
                      <TableCell className="text-center">
                        {pinjaman.status === "request" ? (
                          <div className="flex items-center justify-center space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent"
                              onClick={() => handleApprove(pinjaman.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 bg-transparent"
                              onClick={() => handleReject(pinjaman.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                    )}
                    {hasNonRequestStatus && (
                      <TableCell className="text-center">
                        {shouldShowAksi(pinjaman.status) ? (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 border-violet-500 text-violet-600 hover:bg-violet-50 hover:text-violet-700 bg-transparent"
                              >
                                <BookCheck className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Selesaikan Pinjaman?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menyelesaikan pinjaman
                                  buku {pinjaman.buku?.title} oleh{" "}
                                  {pinjaman.user?.name}? Tindakan ini akan
                                  mengembalikan stok buku dan mengubah status
                                  pinjaman menjadi selesai.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleComplete(pinjaman.id)}
                                >
                                  Selesaikan
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
