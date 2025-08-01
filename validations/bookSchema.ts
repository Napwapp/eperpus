import { z } from "zod";
import dayjs from "dayjs";

// Helper function untuk validasi file gambar yang lebih robust
const isValidImageFile = (file: File): boolean => {
  // Check MIME type
  const validMimeTypes = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
  ];
  
  if (!validMimeTypes.includes(file.type)) {
    return false;
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
  
  if (!hasValidExtension) {
    return false;
  }

  return true;
};

// Schema untuk validasi file gambar
const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "File tidak boleh kosong")
  .refine(
    (file) => isValidImageFile(file),
    "File harus berupa gambar (JPG, PNG, GIF, WebP, BMP, TIFF)"
  )
  .refine(
    (file) => file.size <= 5 * 1024 * 1024, // 5MB
    "Ukuran file maksimal 5MB"
  );

// Schema untuk validasi format rak
const rakSchema = z
  .string()
  .optional()
  .refine(
    (value) => {
      if (!value) return true; // Opsional
      const rakPattern = /^[A-Z]-\d{1,2}$/;
      return rakPattern.test(value);
    },
    {
      message: "Format rak harus A-00 (contoh: B-12)",
    }
  );

// Schema untuk validasi tanggal rilis
const releaseDateSchema = z
  .string()
  .min(1, "Tanggal rilis wajib diisi")
  .refine(
    (value) => {
      if (!value) return false;
      const date = dayjs(value);
      return date.isValid();
    },
    {
      message: "Format tanggal tidak valid",
    }
  )
  .refine(
    (value) => {
      if (!value) return false;
      const date = dayjs(value);
      const today = dayjs();
      return date.isBefore(today) || date.isSame(today, "day");
    },
    {
      message: "Tanggal rilis tidak boleh di masa depan",
    }
  );

// Schema untuk validasi kategori
const categoriesSchema = z
  .array(z.string().min(1, "Kategori tidak boleh kosong"))
  .min(1, "Wajib menambahkan setidaknya 1 kategori")
  .refine(
    (categories) => {
      const uniqueCategories = new Set(categories);
      return uniqueCategories.size === categories.length;
    },
    {
      message: "Kategori tidak boleh duplikat",
    }
  );

// Schema utama untuk form buku
export const bookFormSchema = z.object({
  title: z.string().min(1, "Judul buku wajib diisi"),
  cover: imageFileSchema,
  author: z
    .string()
    .min(1, "Penulis wajib diisi")
    .min(5, "Penulis minimal 5 karakter"),
  publisher: z.string().optional(),
  release_date: releaseDateSchema,
  rak: rakSchema,
  lokasi: z.string().optional(),
  stok: z
    .string()
    .min(1, "Stok wajib diisi")
    .refine(
      (value) => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 0;
      },
      {
        message: "Stok harus berupa angka positif",
      }
    ),
  sinopsis: z
    .string()
    .min(1, "Sinopsis wajib diisi")
    .min(20, "Sinopsis minimal 20 karakter")
    .max(300, "Sinopsis maksimal 300 karakter"),
  categories: categoriesSchema,
});

// Schema untuk edit buku (cover opsional, tapi jika ada harus valid)
export const bookEditSchema = bookFormSchema.omit({ cover: true }).extend({
  cover: z.union([imageFileSchema, z.string()]).optional(),
});

export type BookFormData = z.infer<typeof bookFormSchema>;
export type BookEditData = z.infer<typeof bookEditSchema>; 