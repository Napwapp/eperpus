"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, BookOpen } from "lucide-react";

interface PinjamBukuForm {
  durasi_pinjaman: string;
  alasan: string;
}

interface CardPinjamBukuProps {
  bukuId: number;
  bukuTitle: string;
  onSubmit?: (data: PinjamBukuForm) => void;
}

export default function CardPinjamBuku({ bukuId, bukuTitle, onSubmit }: CardPinjamBukuProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PinjamBukuForm>();

  const onSubmitForm = async (data: PinjamBukuForm) => {
    setIsSubmitting(true);
    try {
      if (onSubmit) {
        onSubmit(data);
      }
      // Reset form after successful submission
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
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
                    message: "Durasi minimal 1 hari"
                  },
                  max: {
                    value: 30,
                    message: "Durasi maksimal 30 hari"
                  }
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
                required: "Alasan meminjam wajib diisi",
                minLength: {
                  value: 10,
                  message: "Alasan minimal 10 karakter"
                }
              })}
            />
            {errors.alasan && (
              <p className="text-sm text-red-600">
                {errors.alasan.message}
              </p>
            )}
            <p className="text-xs text-gray-500">*Optional</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mengirim..." : "Pinjam"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
