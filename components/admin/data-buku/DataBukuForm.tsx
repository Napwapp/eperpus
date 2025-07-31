"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { showAlert } from "@/components/ui/toast";

interface FormData {
  title: string;
  sinopsis: string;
  author: string;
  publisher: string;
  release_date: string;
  rak: string;
  lokasi: string;
  stok: string;
  cover: string;
  categories: string[];
}

export default function DataBukuForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    sinopsis: "",
    author: "",
    publisher: "",
    release_date: "",
    rak: "",
    lokasi: "",
    stok: "",
    cover: "",
    categories: [],
  });

  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasChanges = Object.values(formData).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  );

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          stok: parseInt(formData.stok),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gagal menambahkan buku");
      }

      showAlert({
        message: "Buku berhasil ditambahkan!",
        type: "success",
      });
      
      // Reset form after successful submission
      setFormData({
        title: "",
        sinopsis: "",
        author: "",
        publisher: "",
        release_date: "",
        rak: "",
        lokasi: "",
        stok: "",
        cover: "",
        categories: [],
      });

      // Refresh the page to show new data
      window.location.reload();
      
    } catch (error) {
      console.error("Error adding book:", error);
      showAlert({
        message: error instanceof Error ? error.message : "Gagal menambahkan buku",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      sinopsis: "",
      author: "",
      publisher: "",
      release_date: "",
      rak: "",
      lokasi: "",
      stok: "",
      cover: "",
      categories: [],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tambah Buku Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Judul Buku */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Buku *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Masukkan judul buku"
                required
              />
            </div>

            {/* Penulis */}
            <div className="space-y-2">
              <Label htmlFor="author">Penulis *</Label>
              <Input
                id="author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Masukkan nama penulis"
                required
              />
            </div>

            {/* Penerbit */}
            <div className="space-y-2">
              <Label htmlFor="publisher">Penerbit</Label>
              <Input
                id="publisher"
                value={formData.publisher}
                onChange={(e) => handleInputChange("publisher", e.target.value)}
                placeholder="Masukkan nama penerbit"
              />
            </div>

            {/* Tanggal Rilis */}
            <div className="space-y-2">
              <Label htmlFor="release_date">Tanggal Rilis</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => handleInputChange("release_date", e.target.value)}
              />
            </div>

            {/* Rak */}
            <div className="space-y-2">
              <Label htmlFor="rak">Rak</Label>
              <Input
                id="rak"
                value={formData.rak}
                onChange={(e) => handleInputChange("rak", e.target.value)}
                placeholder="Masukkan lokasi rak"
              />
            </div>

            {/* Lokasi */}
            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi *</Label>
              <Input
                id="lokasi"
                value={formData.lokasi}
                onChange={(e) => handleInputChange("lokasi", e.target.value)}
                placeholder="Masukkan lokasi buku"
                required
              />
            </div>

            {/* Stok */}
            <div className="space-y-2">
              <Label htmlFor="stok">Stok *</Label>
              <Input
                id="stok"
                type="number"
                min="0"
                value={formData.stok}
                onChange={(e) => handleInputChange("stok", e.target.value)}
                placeholder="Masukkan jumlah stok"
                required
              />
            </div>

            {/* Cover URL */}
            <div className="space-y-2">
              <Label htmlFor="cover">URL Cover</Label>
              <Input
                id="cover"
                value={formData.cover}
                onChange={(e) => handleInputChange("cover", e.target.value)}
                placeholder="Masukkan URL cover buku"
              />
            </div>
          </div>

          {/* Sinopsis */}
          <div className="space-y-2">
            <Label htmlFor="sinopsis">Sinopsis *</Label>
            <Textarea
              id="sinopsis"
              value={formData.sinopsis}
              onChange={(e) => handleInputChange("sinopsis", e.target.value)}
              placeholder="Masukkan sinopsis buku"
              rows={4}
              required
            />
          </div>

          {/* Kategori */}
          <div className="space-y-4">
            <Label>Kategori</Label>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Masukkan kategori"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <Button
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            
            {formData.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-violet-100 text-violet-800 px-3 py-1 rounded-full"
                  >
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
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={!hasChanges || isSubmitting}
              className="bg-violet-600 hover:bg-violet-700"
            >
              {isSubmitting ? "Menambahkan..." : "Tambah"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 