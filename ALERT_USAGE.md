# Alert System Documentation

## Overview
Sistem alert yang dibuat menggunakan React Context dan komponen BaseAlert untuk menampilkan pesan notifikasi di seluruh aplikasi.

## Komponen

### 1. BaseAlert (`components/ui/base-alert.tsx`)
Komponen alert sederhana yang menampilkan pesan dengan berbagai tipe:
- **success**: Pesan sukses (hijau)
- **error**: Pesan error (merah) 
- **warning**: Pesan peringatan (kuning)
- **info**: Pesan informasi (biru)

### 2. Toast (`components/ui/toast.tsx`)
Komponen toast yang lebih advanced dengan fitur:
- Animasi slide dan fade
- Progress bar untuk auto-close
- Posisi yang dapat dikustomisasi
- Auto-close dengan durasi yang dapat diatur

### 3. AlertContext (`lib/alert-context.tsx`)
Context provider untuk mengelola state alert di seluruh aplikasi.

## Cara Penggunaan

### 1. Menggunakan AlertContext

```tsx
import { useAlert } from "@/lib/alert-context";

function MyComponent() {
  const { showAlert } = useAlert();

  const handleSuccess = () => {
    showAlert("Operasi berhasil!", "success");
  };

  const handleError = () => {
    showAlert("Terjadi kesalahan!", "error");
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success Alert</button>
      <button onClick={handleError}>Error Alert</button>
    </div>
  );
}
```

### 2. Menggunakan BaseAlert Langsung

```tsx
import BaseAlert from "@/components/ui/base-alert";

function MyComponent() {
  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>
      {showAlert && (
        <BaseAlert
          type="error"
          message="Kamu belum login"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          autoClose={true}
          duration={4000}
        />
      )}
    </div>
  );
}
```

### 3. Menggunakan Toast

```tsx
import Toast from "@/components/ui/toast";

function MyComponent() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      {showToast && (
        <Toast
          type="success"
          title="Berhasil!"
          message="Data berhasil disimpan"
          show={showToast}
          onClose={() => setShowToast(false)}
          autoClose={true}
          duration={5000}
          position="top-right"
        />
      )}
    </div>
  );
}
```

## Middleware Integration

Alert system terintegrasi dengan middleware untuk menampilkan pesan error ketika user mencoba mengakses halaman yang dilindungi tanpa login:

```tsx
// middleware.ts
export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login?error=unauthorized",
    },
  }
);
```

```tsx
// Login.tsx
useEffect(() => {
  const error = searchParams.get("error");
  if (error === "unauthorized") {
    showCustomAlert("Kamu belum login", "error");
    router.replace("/login");
  }
}, [router, searchParams, showCustomAlert]);
```

## Props

### BaseAlert Props
- `type`: "success" | "error" | "warning" | "info" (default: "info")
- `message`: string - Pesan yang akan ditampilkan
- `show`: boolean - Menampilkan/menyembunyikan alert
- `onClose`: () => void - Callback ketika alert ditutup
- `autoClose`: boolean - Auto close alert (default: false)
- `duration`: number - Durasi auto close dalam ms (default: 5000)

### Toast Props
- `type`: "success" | "error" | "warning" | "info" (default: "info")
- `title`: string - Judul toast (opsional)
- `message`: string - Pesan yang akan ditampilkan
- `show`: boolean - Menampilkan/menyembunyikan toast
- `onClose`: () => void - Callback ketika toast ditutup
- `autoClose`: boolean - Auto close toast (default: true)
- `duration`: number - Durasi auto close dalam ms (default: 5000)
- `position`: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center" (default: "top-right")

## Setup

1. Pastikan AlertProvider sudah ditambahkan di `app/layout.tsx`:
```tsx
import { AlertProvider } from "@/lib/alert-context";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <NextAuthSession>
          <AlertProvider>
            {children}
          </AlertProvider>
        </NextAuthSession>
      </body>
    </html>
  );
}
```

2. Gunakan hook `useAlert` di komponen yang membutuhkan alert:
```tsx
import { useAlert } from "@/lib/alert-context";
``` 