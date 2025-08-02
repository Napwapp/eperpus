"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen } from "lucide-react";
import { showAlert } from "@/components/ui/toast";

interface PinjamBukuForm {
  durasi_pinjaman: string;
  alasan: string | null;
}

interface CardPinjamBukuProps {
  bukuId: number;
  bukuTitle: string;
  onSubmit?: (data: PinjamBukuForm) => void;
}

export default function CardPinjamBuku({
  bukuId,
  onSubmit,
}: CardPinjamBukuProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PinjamBukuForm>();

  const onSubmitForm = async (data: PinjamBukuForm) => {
    setIsSubmitting(true);
    try {
      // Validasi bukuId
      if (!bukuId || isNaN(bukuId)) {
        showAlert({ message: "ID buku tidak valid", type: "error" });
        return;
      }

      const response = await fetch("/api/pinjam-buku", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bukuId: bukuId,
          durasi_pinjaman: data.durasi_pinjaman,
          alasan: data.alasan || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        showAlert({
          message: result.error || "Gagal mengirim permintaan pinjaman",
          type: "error",
        });
        return;
      }

      showAlert({
        message: "Permintaan pinjaman berhasil dikirim!",
        type: "success",
      });
      reset();

      // Call optional onSubmit callback
      if (onSubmit) {
        onSubmit(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      showAlert({
        message: "Terjadi kesalahan saat mengirim permintaan",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <BookOpen className="w-5 h-5" />
          Pinjam Buku
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Durasi Pinjaman */}
          <div className="space-y-2">
            <Label htmlFor="durasi_pinjaman" className="text-sm font-medium">
              Durasi Pinjaman
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                id="durasi_pinjaman"
                type="number"
                placeholder="Masukkan durasi pinjaman yang kamu inginkan"
                className="pl-10"
                {...register("durasi_pinjaman", {
                  required: "Durasi pinjaman wajib diisi",
                  min: {
                    value: 1,
                    message: "Durasi minimal 1 hari",
                  },
                  max: {
                    value: 14,
                    message: "Durasi maksimal 14 hari",
                  },
                })}
              />
            </div>
            {errors.durasi_pinjaman && (
              <p className="text-sm text-red-600">
                {errors.durasi_pinjaman.message}
              </p>
            )}
            <p className="text-xs text-gray-500">Hari</p>
          </div>

          {/* Alasan Meminjam */}
          <div className="space-y-2">
            <Label htmlFor="alasan" className="text-sm font-medium">
              Alasan Meminjam
            </Label>
            <Textarea
              id="alasan"
              placeholder="Masukkan alasan kamu meminjam buku ini"
              className="min-h-[100px] resize-none"
              {...register("alasan", {
                maxLength: {
                  value: 150,
                  message: "Alasan maksimal 150 karakter",
                },
              })}
            />
            {errors.alasan && (
              <p className="text-sm text-red-600">{errors.alasan.message}</p>
            )}
            <p className="text-xs text-gray-500">*Optional</p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim..." : "Pinjam"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
