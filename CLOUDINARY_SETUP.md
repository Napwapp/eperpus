# Setup Cloudinary untuk ePerpus

## Langkah-langkah Setup

### 1. Install Dependencies
```bash
pnpm add next-cloudinary
```

### 2. Konfigurasi Environment Variables

di file `.env` di root project dan tambahkan:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Dapatkan Credentials dari Cloudinary

1. Login ke [Cloudinary Dashboard](https://cloudinary.com/console)
2. Buka tab "Dashboard"
3. Copy nilai dari:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 4. Struktur File yang Dibuat

```
app/
├── api/
│   └── upload/
│       ├── route.ts          # Upload image
│       └── delete/
│           └── route.ts      # Delete image
components/
├── admin/
│   └── data-buku/
│       ├── DataBukuForm.tsx
│       ├── DataBukuTable.tsx
│       ├── BookCoverImage.tsx  # Komponen khusus untuk cover
│       └── UploadProgress.tsx
lib/
├── utils/
│   └── cloudinary.ts         # Utility functions
└── cloudinary.ts             # Cloudinary config (deprecated)
```

### 5. Fitur yang Tersedia

#### Upload Image
- ✅ Validasi file type (image only)
- ✅ Validasi file size (max 5MB)
- ✅ Auto resize ke 300x400
- ✅ Optimized quality
- ✅ Organized dalam folder `eperpus/books`

#### Delete Image
- ✅ Secure deletion dengan signature
- ✅ Admin/superadmin only
- ✅ Error handling

#### Image Display
- ✅ Next.js Image optimization
- ✅ Fallback untuk gambar yang gagal load
- ✅ Error handling yang robust

### 6. Penggunaan dalam Form

```typescript
import { uploadToCloudinary } from "@/lib/utils/cloudinary";

// Upload image
const imageUrl = await uploadToCloudinary(file);

// Delete image (optional)
await deleteFromCloudinary(publicId);
```

### 7. Security Features

- ✅ Server-side validation
- ✅ Admin role check
- ✅ File type validation
- ✅ File size limit
- ✅ Secure API signatures
- ✅ Error handling

### 8. Testing

1. Pastikan environment variables sudah benar
2. Test upload image melalui form
3. Check di Cloudinary dashboard
4. Test delete image (jika diperlukan)

### 9. Troubleshooting

#### Error: "Cloudinary configuration missing"
- Pastikan semua environment variables sudah diset
- Restart development server

#### Error: "File must be an image"
- Pastikan file yang diupload adalah gambar
- Check file extension dan MIME type

#### Error: "File size must be less than 5MB"
- Compress image sebelum upload
- Atau increase limit di API route

#### Error: "Invalid src prop" pada Next.js Image
- Pastikan `next.config.ts` sudah dikonfigurasi dengan domain Cloudinary
- Restart development server setelah mengubah config
- Gunakan komponen `BookCoverImage` yang sudah dibuat

#### Error: "Image failed to load"
- Check URL gambar di Cloudinary dashboard
- Pastikan URL menggunakan HTTPS
- Gunakan fallback component yang sudah disediakan

### 10. Next.js Configuration

Pastikan `next.config.ts` sudah dikonfigurasi:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

### 11. Production Deployment

1. Set environment variables di hosting platform
2. Pastikan `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` bisa diakses client
3. `CLOUDINARY_API_KEY` dan `CLOUDINARY_API_SECRET` hanya di server
4. Deploy `next.config.ts` dengan konfigurasi images

### 12. Komponen Khusus

#### BookCoverImage
Komponen khusus untuk menampilkan cover buku dengan fallback:

```typescript
import BookCoverImage from "@/components/admin/data-buku/BookCoverImage";

<BookCoverImage 
  src={book.cover} 
  alt={book.title}
  className="w-12 h-16"
/>
```

Fitur:
- ✅ Error handling otomatis
- ✅ Fallback untuk gambar yang gagal load
- ✅ Loading state
- ✅ Responsive design 