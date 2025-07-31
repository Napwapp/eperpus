# Implementasi Middleware Role-Based Access Control

## Overview

Sistem middleware role-based access control telah diimplementasikan untuk membatasi akses berdasarkan role user di aplikasi ePerpus. Sistem ini terdiri dari beberapa komponen yang bekerja bersama untuk memberikan keamanan yang komprehensif.

## Komponen yang Dibuat

### 1. Middleware Role (`middlewares/roleMiddleware.ts`)
File utama yang berisi fungsi-fungsi middleware untuk membatasi akses berdasarkan role.

**Fungsi yang tersedia:**
- `withRoleAccess(req, allowedRoles)` - Fungsi utama untuk membatasi akses
- `withUserAccess(req)` - Middleware untuk halaman user
- `withAdminAccess(req)` - Middleware untuk halaman admin  
- `withSuperAdminAccess(req)` - Middleware untuk halaman superadmin
- `isPathAllowedForRole(pathname, role)` - Fungsi utilitas untuk cek akses
- `getRedirectPathForRole(role)` - Fungsi untuk mendapatkan redirect path

### 2. Error Handler (`middlewares/errorHandler.ts`)
File untuk menangani error dalam middleware dengan lebih baik.

**Fungsi yang tersedia:**
- `handleMiddlewareError(error, req, fallbackPath)` - Menangani error middleware
- `validateToken(token)` - Memvalidasi token
- `getRoleFromToken(token)` - Mendapatkan role dari token dengan validasi

### 3. Error Message Handler (`components/ui/error-message-handler.tsx`)
Komponen untuk menampilkan pesan error dari localStorage menggunakan BaseAlert component.

**Fitur:**
- Otomatis menampilkan pesan error dari localStorage
- Mendukung custom messages
- Berbagai tipe alert (error, warning, success, info)
- Fungsi utilitas `showErrorMessage()` untuk menampilkan pesan manual
- Error otomatis dihapus setelah ditampilkan

### 4. Error Storage (`lib/errorStorage.ts`)
Fungsi untuk mengelola pesan error di localStorage.

**Fitur:**
- Menyimpan pesan error ke localStorage
- Mengambil pesan error dari localStorage
- Menghapus pesan error dari localStorage
- Fungsi helper untuk berbagai jenis error

## Definisi Role dan Akses

### User Role
- **Allowed Paths**: `/user/*`
- **Redirect Path**: `/user/home`
- **Akses**: Halaman user saja

### Admin Role  
- **Allowed Paths**: `/admin/*`, `/user/*`
- **Redirect Path**: `/admin/dashboard`
- **Akses**: Halaman admin dan user

### Superadmin Role
- **Allowed Paths**: `/admin/*`, `/user/*`, `/superadmin/*`
- **Redirect Path**: `/admin/dashboard`
- **Akses**: Semua halaman

## Cara Kerja

### 1. Middleware Utama (`middleware.ts`)
```typescript
// Cek path dan terapkan middleware yang sesuai
if (pathname.startsWith("/user")) {
  return withUserAccess(req);
}

if (pathname.startsWith("/admin")) {
  return withAdminAccess(req);
}
```

### 2. Proses Validasi
1. Middleware mengambil token dari request menggunakan `getToken`
2. Memvalidasi token menggunakan `validateToken`
3. Mengekstrak role dari token menggunakan `getRoleFromToken`
4. Memeriksa apakah role user ada dalam allowedRoles
5. Jika tidak diizinkan, simpan error ke localStorage dan redirect
6. Jika diizinkan, lanjutkan ke halaman yang diminta

### 3. Error Handling
- Jika terjadi error, gunakan `handleMiddlewareError`
- Error akan di-log untuk debugging
- Error disimpan ke localStorage
- Redirect ke fallback path

### 4. Pesan Error
- Pesan error ditampilkan menggunakan `BaseAlert` dari `components/ui/base-alert`
- Pesan error disimpan di localStorage untuk menghindari URL berantakan
- Pesan default: "Maaf, kamu tidak memiliki akses untuk mengakses halaman tersebut"
- Error otomatis dihapus setelah ditampilkan

## Integrasi dengan Layout

Komponen `ErrorMessageHandler` telah diintegrasikan ke `app/layout.tsx` untuk menampilkan pesan error di semua halaman:

```typescript
<NextAuthSession>
  <ErrorMessageHandler />
  {children}
  <Toaster position="top-right" reverseOrder={false} />
</NextAuthSession>
```

## File Pendukung

### Dokumentasi
- `middlewares/README.md` - Dokumentasi lengkap middleware
- `middlewares/example-usage.ts` - Contoh penggunaan
- `middlewares/test.ts` - Test cases dan scenarios

### Export
- `middlewares/index.ts` - Export semua fungsi middleware

## Penggunaan

### 1. Middleware Otomatis
Middleware sudah terintegrasi dengan `middleware.ts` dan akan otomatis berjalan untuk path yang didefinisikan.

### 2. Middleware Manual
```typescript
import { withRoleAccess } from "@/middlewares/roleMiddleware";

// Hanya user yang bisa akses
return withRoleAccess(req, ["user"]);

// User dan admin yang bisa akses
return withRoleAccess(req, ["user", "admin"]);
```

### 3. Custom Error Messages
```typescript
import ErrorMessageHandler from "@/components/ui/error-message-handler";

<ErrorMessageHandler 
  customMessages={{
    "access_denied": "Pesan custom untuk akses ditolak",
    "middleware_error": "Pesan custom untuk error middleware"
  }}
/>
```

## Testing

File `middlewares/test.ts` berisi test cases dan scenarios untuk memverifikasi implementasi:

```typescript
// Test utility functions
testUtilityFunctions();

// Test role access
testRoleAccess();

// Expected behavior untuk setiap role
console.log(expectedBehavior);
```

## Catatan Penting

1. **Token JWT**: Pastikan token mengandung field `role` dengan nilai yang sesuai
2. **Role Validation**: Role harus sesuai dengan definisi di `ROLE_ACCESS`
3. **Error Handling**: Semua error ditangani dengan graceful fallback
4. **BaseAlert Notification**: Pesan error ditampilkan menggunakan BaseAlert component
5. **localStorage**: Error message disimpan di localStorage untuk menghindari URL berantakan

## Keamanan

- Validasi token yang ketat
- Role-based access control yang komprehensif
- Error handling yang aman
- Redirect yang konsisten
- Logging untuk debugging
- BaseAlert untuk notifikasi yang konsisten
- localStorage untuk error handling yang bersih

## Extensibility

Sistem ini mudah diperluas:
- Tambah role baru di `ROLE_ACCESS`
- Tambah middleware baru di `roleMiddleware.ts`
- Custom error messages di `ErrorMessageHandler`
- Tambah test cases di `test.ts` 