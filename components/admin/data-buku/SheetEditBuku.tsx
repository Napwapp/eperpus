"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookEditSchema, BookEditData } from "@/validations/bookSchema";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { showAlert } from "@/components/ui/toast";
import { Buku } from "@/lib/types/buku";
import Image from "next/image";

interface SheetEditBukuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buku: Buku;
  onSuccess: (updated: Buku) => void;
}

export default function SheetEditBuku({
  open,
  onOpenChange,
  buku,
  onSuccess,
}: SheetEditBukuProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<BookEditData>({
    resolver: zodResolver(bookEditSchema),
    defaultValues: {
      title: buku?.title || "",
      author: buku?.author || "",
      publisher: buku?.publisher || "",
      release_date: buku?.release_date ? buku.release_date.slice(0, 10) : "",
      rak: buku?.rak || "",
      lokasi: buku?.lokasi || "",
      stok: buku?.stok?.toString() || "",
      sinopsis: buku?.sinopsis || "",
      categories: buku?.categories?.map((c) => c.kategori) || [],
      cover: undefined,
    },
  });

  // Initial value form
  const [initialValues, setInitialValues] = useState<BookEditData>({
    title: buku?.title || "",
    author: buku?.author || "",
    publisher: buku?.publisher || "",
    release_date: buku?.release_date ? buku.release_date.slice(0, 10) : "",
    rak: buku?.rak || "",
    lokasi: buku?.lokasi || "",
    stok: buku?.stok?.toString() || "",
    sinopsis: buku?.sinopsis || "",
    categories: buku?.categories?.map((c) => c.kategori) || [],
    cover: undefined,
  });

  // Haschange form
  const hasChanges = () => {
    const currentValues = watch();
    return !(
      currentValues.title === initialValues.title &&
      currentValues.author === initialValues.author &&
      currentValues.publisher === initialValues.publisher &&
      currentValues.release_date === initialValues.release_date &&
      currentValues.rak === initialValues.rak &&
      currentValues.lokasi === initialValues.lokasi &&
      currentValues.stok === initialValues.stok &&
      currentValues.sinopsis === initialValues.sinopsis &&
      JSON.stringify(currentValues.categories) ===
        JSON.stringify(initialValues.categories) &&
      !previewImage
    );
  };

  // Prefill data saat buku berubah
  useEffect(() => {
    if (buku) {
      const initialData = {
        title: buku.title || "",
        author: buku.author || "",
        publisher: buku.publisher || "",
        release_date: buku.release_date ? buku.release_date.slice(0, 10) : "",
        rak: buku.rak || "",
        lokasi: buku.lokasi || "",
        stok: buku.stok?.toString() || "",
        sinopsis: buku.sinopsis || "",
        categories: buku.categories?.map((c) => c.kategori) || [],
        cover: undefined,
      };
      reset(initialData);
      setInitialValues(initialData);
      setPreviewImage(null);
    }
  }, [buku, reset]);

  // Kategori
  const watchedCategories = watch("categories");

  // Kategori logic
  const handleAddCategory = (cat: string) => {
    if (cat.trim() && !watchedCategories.includes(cat.trim())) {
      setValue("categories", [...watchedCategories, cat.trim()]);
    }
  };
  const handleRemoveCategory = (cat: string) => {
    setValue(
      "categories",
      watchedCategories.filter((c) => c !== cat)
    );
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setValue("cover", file);
      clearErrors("cover");
    } else {
      setPreviewImage(null);
      setValue("cover", undefined);
    }
  };

  // Submit Handler
  const onSubmit = async (data: BookEditData) => {
    try {
      let coverUrl = buku.cover;

      // Jika user upload cover baru, upload ke Cloudinary
      if (data.cover && typeof data.cover !== "string") {
        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", data.cover);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        // Wait a bit to show 100% completion
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (!uploadRes.ok)
          throw new Error(uploadData.error || "Gagal upload cover");
        coverUrl = uploadData.url;
      }

      // PATCH ke API
      const res = await fetch(`/api/books/${buku.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, cover: coverUrl }),
      });
      const updated = await res.json();

      if (!res.ok) throw new Error(updated.error || "Gagal update buku");
      onSuccess(updated);
      onOpenChange(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Gagal update buku";
      showAlert({ message: errorMessage, type: "error" });
    } finally {
      setIsUploading(false);
    }
  };

  // UI
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side="right"
          className="max-w-lg w-full p-6 overflow-y-auto text-gray-700"
        >
          <SheetHeader className="p-0">
            <SheetTitle>Edit Buku</SheetTitle>
          </SheetHeader>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Buku *</Label>
              <Input id="title" {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Penulis *</Label>
              <Input id="author" {...register("author")} />
              {errors.author && (
                <p className="text-sm text-red-500">{errors.author.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="publisher">Penerbit</Label>
              <Input id="publisher" {...register("publisher")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="release_date">Tanggal Rilis *</Label>
              <Input
                id="release_date"
                type="date"
                {...register("release_date")}
              />
              {errors.release_date && (
                <p className="text-sm text-red-500">
                  {errors.release_date.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="rak">Rak</Label>
              <Input id="rak" {...register("rak")} />
              {errors.rak && (
                <p className="text-sm text-red-500">{errors.rak.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi</Label>
              <Input id="lokasi" {...register("lokasi")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stok">Stok *</Label>
              <Input id="stok" type="number" min={0} {...register("stok")} />
              {errors.stok && (
                <p className="text-sm text-red-500">{errors.stok.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="sinopsis">Sinopsis *</Label>
              <Textarea id="sinopsis" {...register("sinopsis")} rows={4} />
              {errors.sinopsis && (
                <p className="text-sm text-red-500">
                  {errors.sinopsis.message}
                </p>
              )}
            </div>
            {/* Kategori */}
            <div className="space-y-2">
              <Label>Kategori *</Label>
              <div className="flex gap-2">
                <Input
                  id="kategori-input"
                  placeholder="Tambah kategori"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    const input =
                      document.querySelector<HTMLInputElement>(
                        "#kategori-input"
                      );
                    if (input && input.value.trim()) {
                      handleAddCategory(input.value);
                      input.value = "";
                    }
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedCategories.map((cat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-violet-100 text-violet-800 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{cat}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat)}
                      className="text-violet-600 hover:text-violet-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-500">
                  {errors.categories.message}
                </p>
              )}
            </div>
            {/* Cover (opsional) */}
            <div className="space-y-2">
              <Label htmlFor="cover">Upload Cover Baru</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    id="cover"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={errors.cover ? "border-red-500" : ""}
                  />
                  {errors.cover && (
                    <p className="text-sm text-red-500">
                      {errors.cover.message}
                    </p>
                  )}
                </div>
                {previewImage && (
                  <div className="relative w-16 h-20 border rounded overflow-hidden">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={!hasChanges() || isSubmitting || isUploading}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {isSubmitting || isUploading
                  ? "Menyimpan..."
                  : "Simpan Perubahan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-violet-600 text-violet-600 hover:bg-violet-50"
              >
                Batal
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
