"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { showAlert } from "@/components/ui/toast";
import { bookFormSchema, type BookFormData } from "@/validations/bookSchema";
import { uploadToCloudinary } from "@/lib/utils/cloudinary";
import UploadProgress from "./UploadProgress";
import Image from "next/image";
import { Buku } from "@/lib/types/buku";

interface DataBukuFormProps {
  onBookAdded?: (newBook: Buku) => void;
}

export default function DataBukuForm({ onBookAdded }: DataBukuFormProps) {
  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
    reset,
    clearErrors,
  } = useForm<BookFormData>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      publisher: "",
      release_date: "",
      rak: "",
      lokasi: "",
      stok: "",
      sinopsis: "",
      categories: [],
    },
  });

  const watchedCategories = watch("categories");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Preview image
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Set form value
      setValue("cover", file);
      clearErrors("cover");
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !watchedCategories.includes(newCategory.trim())) {
      const updatedCategories = [...watchedCategories, newCategory.trim()];
      setValue("categories", updatedCategories);
      setNewCategory("");
      clearErrors("categories");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    const updatedCategories = watchedCategories.filter(cat => cat !== categoryToRemove);
    setValue("categories", updatedCategories);
  };

  const onSubmit = async (data: BookFormData) => {
    setIsSubmitting(true);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary(data.cover);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Wait a bit to show 100% completion
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          cover: imageUrl,
          stok: parseInt(data.stok),
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Gagal menambahkan buku");
      }

      showAlert({
        message: "Buku berhasil ditambahkan!",
        type: "success",
      });
      
      // Reset form
      reset();
      setPreviewImage(null);
      
      // Update data secara real-time tanpa reload
      if (onBookAdded && responseData.book) {
        onBookAdded(responseData.book);
      }
      
    } catch (error) {
      console.error("Error adding book:", error);
      showAlert({
        message: error instanceof Error ? error.message : "Gagal menambahkan buku",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleCancel = () => {
    reset();
    setPreviewImage(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Tambah Buku Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Judul Buku */}
              <div className="space-y-2">
                <Label htmlFor="title">Judul Buku *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Masukkan judul buku"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              {/* Penulis */}
              <div className="space-y-2">
                <Label htmlFor="author">Penulis *</Label>
                <Input
                  id="author"
                  {...register("author")}
                  placeholder="Masukkan nama penulis"
                  className={errors.author ? "border-red-500" : ""}
                />
                {errors.author && (
                  <p className="text-sm text-red-500">{errors.author.message}</p>
                )}
              </div>

              {/* Penerbit */}
              <div className="space-y-2">
                <Label htmlFor="publisher">Penerbit</Label>
                <Input
                  id="publisher"
                  {...register("publisher")}
                  placeholder="Masukkan nama penerbit"
                />
              </div>

              {/* Tanggal Rilis */}
              <div className="space-y-2">
                <Label htmlFor="release_date">Tanggal Rilis *</Label>
                <Input
                  id="release_date"
                  type="date"
                  {...register("release_date")}
                  className={errors.release_date ? "border-red-500" : ""}
                />
                {errors.release_date && (
                  <p className="text-sm text-red-500">{errors.release_date.message}</p>
                )}
              </div>

              {/* Rak */}
              <div className="space-y-2">
                <Label htmlFor="rak">Rak</Label>
                <Input
                  id="rak"
                  {...register("rak")}
                  placeholder="Contoh: A-12"
                  className={errors.rak ? "border-red-500" : ""}
                />
                {errors.rak && (
                  <p className="text-sm text-red-500">{errors.rak.message}</p>
                )}
              </div>

              {/* Lokasi */}
              <div className="space-y-2">
                <Label htmlFor="lokasi">Lokasi</Label>
                <Input
                  id="lokasi"
                  {...register("lokasi")}
                  placeholder="Masukkan lokasi buku"
                />
              </div>

              {/* Stok */}
              <div className="space-y-2">
                <Label htmlFor="stok">Stok *</Label>
                <Input
                  id="stok"
                  type="number"
                  min="0"
                  {...register("stok")}
                  placeholder="Masukkan jumlah stok"
                  className={errors.stok ? "border-red-500" : ""}
                />
                {errors.stok && (
                  <p className="text-sm text-red-500">{errors.stok.message}</p>
                )}
              </div>

              {/* Upload Cover */}
              <div className="space-y-2">
                <Label htmlFor="cover">Upload Cover *</Label>
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
                      <p className="text-sm text-red-500">{errors.cover.message}</p>
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
            </div>

            {/* Sinopsis */}
            <div className="space-y-2">
              <Label htmlFor="sinopsis">Sinopsis *</Label>
              <Textarea
                id="sinopsis"
                {...register("sinopsis")}
                placeholder="Masukkan sinopsis buku (minimal 20 karakter, maksimal 300 karakter)"
                rows={4}
                className={errors.sinopsis ? "border-red-500" : ""}
              />
              {errors.sinopsis && (
                <p className="text-sm text-red-500">{errors.sinopsis.message}</p>
              )}
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <Label>Kategori *</Label>
              <div className="flex gap-2">
                <Input
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Tambah kategori"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCategory();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddCategory}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {watchedCategories.map((category, index) => (
                  <div key={index} className="flex items-center gap-2 bg-violet-100 text-violet-800 px-3 py-1 rounded-full">
                    <span className="text-sm">{category}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(category)}
                      className="text-violet-600 hover:text-violet-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.categories && (
                <p className="text-sm text-red-500">{errors.categories.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isDirty}
                className="bg-violet-600 hover:bg-violet-700"
              >
                {isSubmitting ? "Menambahkan..." : "Tambah"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="border-violet-600 bg-white text-violet-600 hover:bg-violet-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <UploadProgress isUploading={isUploading} progress={uploadProgress} />
    </>
  );
} 