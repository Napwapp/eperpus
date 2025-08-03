# 📚 ePerpus

**ePerpus** adalah sistem informasi peminjaman buku digital berbasis web yang dikembangkan menggunakan Next.js dengan database Neon (serverless PostgreSQL) serta Prisma sebagai ORM-nya.  
Aplikasi ini dibuat untuk menyelesaikan tugas akhir **Kelas Fullstack Fase 2 JIDA**, dan juga memiliki potensi untuk digunakan sebagai sistem perpustakaan sekolah yang memudahkan pengelolaan data perpustakaan secara digital.

---

## 🚀 Fitur-Fitur Utama ePerpus

### 🔐 Autentikasi
- **Login & Registrasi**
- **2FA (Two Factor Authentication)**  
  Pengguna harus memverifikasi email saat mendaftar. Sistem akan mengirim kode OTP ke email yang didaftarkan, yang hanya berlaku selama 5 menit dan bisa digunakan satu kali saja.
- **OAuth Google**  
  Pengguna bisa langsung login menggunakan akun Google tanpa perlu melakukan registrasi manual dan verifikasi email.
- **Reset Password**  
  Pengguna dapat mereset dan mengganti password jika lupa.

> ⚠️ **Disclaimer!**  
> Jika muncul pesan "Password tidak ditemukan" saat login manual, kemungkinan email tersebut sebelumnya digunakan untuk login via Google. Karena login menggunakan Google tidak menyimpan password ke database, login manual tidak akan berhasil.

---

### 📚 Manajemen Buku
- Pengguna dapat melihat daftar buku yang tersedia dan mengajukan permintaan peminjaman.
- Pengelola (admin) dapat menambah, mengedit, dan menghapus buku serta menyesuaikan stok sesuai kebutuhan.

---

### 📦 Meminjam Buku
- Pengguna dapat meminjam buku (yang tersedia) yang pengguna inginkan.

### 🔁 Pengembalian Buku
- Untuk mengembalikan buku, pengguna tidak dapat mengembalikannya secara online, pengguna harus mendatangi perpustakaan untuk mengembalikan buku secara langsung dan biarkan pengelola yang akan memverifikasi status pinjaman nya

## ⚙️ Tech Stack

| Teknologi           | Keterangan                                 |
|---------------------|--------------------------------------------|
| Next.js             | Framework utama                            |
| Neon                | Database PostgreSQL serverless             |
| Prisma              | ORM untuk interaksi database               |
| ShadCN              | UI component library                       |
| Lucide React        | Icon modern untuk UI                       |
| HeroIcons           | Icon modern untuk UI                       |
| Zod                 | Validasi schema                            |
| React Hook Form     | Pengelolaan form                           |
| Day.js              | Formatting dan logika tanggal              |
| Cloudinary          | Upload gambar                              |
| React Hot Toast     | Notifikasi responsif                       |
| Redux Toolkit       | State management                           |
| Nodemailer          | Pengiriman email OTP                       |

---

## Stuktur Data

### Tabel `users`
| Kolom         | Tipe Data     | Keterangan                                                |
|---------------|---------------|-----------------------------------------------------------|
| id            | String (UUID) | Primary key                                               |
| name          | String        | Nama lengkap pengguna                                     |  
| email         | String        | Email unik                                                |
| password      | String?       | Password yang terenkripsi                                 |
| nomorHp       | Text          | Nomor telepon pengguna                                    |
| alamat        | Text          | Alamat pengguna                                           |
| role          | Enum          | `user`, `admin`, `superadmin` default`user`               |
| gender        | Enum          | `laki-laki`, `perempuan`, `tidak_memilih` default `tidak `|
| verified_at   | TimeStamp     | Tanggal akun diverifikasi                                 |
| creared_at    | TimeStamp     | Tanggal akun dibuat                                       |
| updated_at    | TimeStamp     | Tanggal data akun diupdate                                |

**Relasi ke tabel buku dan pinjaman**

### Tabel `otps`
| Kolom               | Tipe Data   | Keterangan                            |
|---------------------|-------------|---------------------------------------|
| id                  | Text        | Primary key                           |
| code                | Text        | Kode otp                              |
| expired             | TimeStamp   | Masa berlaku, Expired dalam 5 menit   |
| userId              | Text        | Relasi ke tabel `users`               |
| created_at          | TimeStamp   | Waktu Saat data dibuat                |
| updated_at          | TimeStamp   | Waktu saat data diperbarui            |

**Relasi ke tabel users**

### Tabel `buku`
| Kolom          | Tipe Data     | Keterangan                                     |
|----------------|---------------|------------------------------------------------|
| id             | Serial        | Primary key                                    |
| cover          | String        | Cover buku                                     |
| title          | Text          | Judul buku                                     |
| sinopsis       | Text          | Sinopsis buku                                  |
| author         | Text          | Penulis                                        |
| publisher      | Text          | Publisher atau penerbit                        |
| release_date   | Date          | Tanggal rilis                                  |
| kategori       | String        | Nama kategori                                  |
| rak            | Text          | Nomor/lokasi rak                               |
| lokasi         | Text          | Lokasi penyimpanan (default: "Perpus Sekolah") |
| stok           | Int           | Stok yang tersedia                             |
| created_at     | Timestamp     | waktu data dibuat                              |
| updated_at     | Timestamp     | waktu data diupdate                            |

**Relasi ke tabel kategori dan pinjaman**

### Tabel `kategori`
| Kolom               | Tipe Data   | Keterangan                            |
|---------------------|-------------|---------------------------------------|
| id                  | Serial      | Primary key                           |
| books_id            | Int         | Relasi ke tabel `buku`                |
| kategori            | Text        | Kumpulan kategori                     |
| created_at          | TimeStamp   | Waktu Saat kategori dibuat            |
| updated_at          | TimeStamp   | Waktu saat kategori diperbarui        |

**Relasi ke tabel buku**

### Tabel `pinjaman`

| Kolom                | Tipe Data   | Keterangan                                     |
|----------------------|-------------|------------------------------------------------|
| id                   | Serial      | Primary key                                    |
| user_id              | Text        | Relasi ke tabel `user`                         |
| id_books             | Int         | Relasi ke tabel `buku`                         |
| status               | enum        | `request`(default), `aktif`,`diperpanjang`,    ..           `menunggu_pengembalian`, `done`, `refused`                                            |
| tanggal_permintaan   | TimeStamp   | Tanggal permintaan                             |
| tanggal_dipinjam     | TimeStamp?  | Tanggal pinjaman saat pertama kali aktif       |
| tanggal_dikembalikan | TimeStamp?  | Hari pengembalian pinjaman                     |
| durasi_pinjaman      | Int         | Durasi pinjaman Contoh: 7 Hari                 |
| alasan               | Text?       | Alasan meminjam buku                           |
| created_at           | Timestamp   | waktu data dibuat                              |
| updated_at           | Timestamp   | waktu data diupdate                            |

**Relasi ke tabel users dan buku**

---

## Akses
Di ePerpus memiliki beberapa role yang memiliki akses yang berbeda
1. user = memiliki akses dihalaman: `user/*`
2. admin = memiliiki akses dihalaman: `user/*`, `admin/*` dengan sedikit perbedaan UI
3. superadmin = memiliki akses dihalaman: `user/*`, `admin/*`, `superadmin`.

Pada dokumentasi kali ini saya akan menyebut ke 3 role tersebut menjadi:
1. user = pengguna
2. admin = pengelola
3. superadmin = pemilik sistem
supaya lebih mudah saja

> ⚠️ **Catatan:**  
> !!untuk role superadmin ini, saya belum membuat akses halaman spesifiknya. Jadi saat ini belum ada halaman superadmin/*. Rencananya,saya ingin membuat halaman untuk memanage data pengguna. Tapi sepertinya waktunya tidak cukup. Jadi, untuk saat ini `superadmin` aksesnya sama saja dengan `admin`!! Mohon Maaf🙏
> Tapi, saya akan tetap menyediakan akun untuk akses `superadmin` ini, walaupun akses halamannya sama saja dengan `admin`
> Dan proyek ini akan saya terus kembangkan kedepannya untuk projek Ujian Kompetensi sekolah SMK saya**

---

## Alur kerja aplikasi ePerpus
**Sebelumnya User harus terautentikasi terlebih dahulu**
1. Pendaftaran Akun (Pengguna Harus autentikasi terlebih dahulu) Bisa daftar dan login manual, bisa login menggunakan Google.
-> Pengguna mendaftarkan akun dihalaman /register
-> Sistem mengirimkan kode otp ke email yang didaftarkan oleh pengguna
-> Pengguna diarahkan ke halaman verifikasi
-> Pengguna memverifikasikan email nya dengan menginputkan dan mencocokan kode otp yang dikirimkan di email pengguna
-> Jika berhasil, pengguna akan diarahkan ke halaman login, Pengguna bisa login sekarang

2. Peminjaman Buku
Kali ini pengguna telah terautentikasi, sekarang pengguna bisa melihat lihat buku yang tersedia dan bisa meminjamnya apabila tertarik .
-> Pengguna masuk kehalaman detail buku pada salah satu buku.
-> Pengguna mengisi form, seperti berapa hari ingin meminjam dan alasan apa untuk meminjam buku tersebut lalu pengguna menekan tombol `Pinjam`. **Pengguna hanya bisa meminjam maksimal selama 14 hari**
-> Data `tanggal_dipinjam` akan tercatat
-> Data `tanggal_dipinjam` dengan durasi pinjaman (berapa harinya) yang kamu masukan pada form akan dihitung dan dicatat kedalam data `tanggal_dikembalikan`.
-> Seluruh data permintaan dikirim ke pengelola.
-> Supaya pinjaman nya aktif, pinjaman tersebut harus disetujui oleh pengelola terlebih dahulu. Pengelola dapat menyetujui dan menolak permintaan pinjaman. 
-> Pengelola menyetujui pinjaman, status pinjaman akan diperbarui menjadi aktif dan kamu bisa mengambil bukunya diperpustakaan tersebut (hanya sebagai `ibarat` saja, karna data bukunya bukan bersifat buku digital). Atau pengelola menolak pinjaman, maka status pinjaman nya akan menjadi `refused` atau `ditolak`.

3. Perpanjangan Buku
### Maaf, Fitur belum tersedia (Belum sempat untuk membuat nya)

4. Pengembalian Buku
-> Kamu harus mengembalikan pinjaman buku kamu ke perpustakaan (sebagai perumpamaan) Sebelum masa pinjaman kamu habis. 
-> Jika masa pinjaman kamu telah melewati data tanggal di kembalikan kamu, maka status pinjaman kamu otomatis akan diperbarui menjadi `menunggu_pengembalian`. dihalaman, akan ditampilkan dengan `Telat`.
-> Kapanpun pengelola bisa menghubungimu melalui email. (Karna nomer hp bisa bebas, walaupun ada validasi sedikit, tapi tidak ada verifikasi).
-> Jika kamu telah mengembalikan buku pinjaman kamu ke perpustakaan (perumpamaan). Pengelola akan menyelesaikan pinjaman kamu di halaman yang memiliki akses untuk admin. 
-> Status pinjaman kamu akan diperbarui menjadi `done`. Akan ditampilkan dihalaman `Selesai`.

---

## Setup di local server

```bash
# Clone repositori ini
git clone https://github.com/Napwapp/eperpus.git
cd eperpus

# Install semua dependensi
pnpm install

# Buat file environment
cp .env
# Lalu isi semua key yang diperlukan.
# Di repositori saya, saya sudah menyediakan key-key kosongan yang perlu diisi value-valuenya

# Setup Neon Database
# - Masuk ke vercel.com → Storage → Create Database → Neon
# - Ikuti instruksi, lalu ambil semua key yang diperlukan dan isi di .env:

DATABASE_URL=
DATABASE_URL_UNPOOLED=
PGHOST=
PGHOST_UNPOOLED=
PGUSER=
PGDATABASE=
PGPASSWORD=
POSTGRES_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
POSTGRES_URL_NO_SSL=
POSTGRES_PRISMA_URL=

# Setup bcrypt...
NEXTAUTH_SECRET=
# Jalankan
openssl rand -base64 32
# Kemudian, di file .env kamu, tambahkan kunci yang telah kamu buat ke variabel NEXTAUTH_SECRET:

# Setup email untuk pengiriman pesan otp...
EMAIL_FROM_NAME="nama-email-bebas"
EMAIL_FROM=emailyangakanmengirimkandataotp@gmail.com
EMAIL_PASS=sandiaplikasikamu
# untuk mendapatkan value dari EMAIL_PASS...
# - pergi ke myaccount.google.com dibrowser manapun
# - lalu ketikkan dipencarian "Sandi aplikasi"
# - ketika sudah berada di halaman Sandi aplikasi, masukkan nama aplikasi yang diinginkan lalu klik Buat
# - Salin sandi aplikasi yang didapatkan dan tempelkan ke 
EMAIL_PASS=sandiaplikasikamu

# Setup Google Oauth...
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# - Dapatkan key dan valuenya di Google Cloud Console

# Setup Cloudinary...
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# - Masuk ke website cloudinary dan login
# - Di tab image, cari tombol view api keys klik tombol tersebut.
# - Ikuti instruksinya dan ambil api key nya. lalu tempelkan di file.env kamu

# Base url
BASE_URL=http://localhost:3000
# ganti variable ini dengan nama domain kamu jika sudah di production

# Jalankan migration Prisma (hanya pertama kali)
pnpm dlx prisma migrate dev --name init

# Jalankan server development
pnpm run dev
```

---

## Struktur proyek
> Mungkin masih ada yang tidak terbawa atau tidak sesuai.

```
eperpus/
│
├── app/                                 # Routing dan halaman utama aplikasi
│   ├── favicon.ico                      # Ikon aplikasi
│   ├── globals.css                      # CSS global
│   ├── layout.tsx                       # Layout utama untuk semua halaman
│   ├── loading.tsx                      # Komponen loading global
│   ├── not-found.tsx                    # Komponen halaman 404
│   ├── page.tsx                         # Halaman utama (landing page)
│   ├── StoreProvider.tsx                 # Provider untuk state management
│   ├── NextAuthSession.tsx              # Provider session NextAuth
│   ├── (auth)/                          # Halaman autentikasi
│   │   ├── login/
│   │   │   ├── Login.tsx                # Komponen form login
│   │   │   └── page.tsx                 # Halaman utama login
│   │   ├── register/
│   │   │   ├── inputRegister.tsx        # Komponen input register
│   │   │   ├── Register.tsx             # Komponen utama register
│   │   │   └── page.tsx                 # Halaman utama register
│   │   ├── reset-password/
│   │   │   ├── ResetPassword.tsx        # Komponen form reset password
│   │   │   └── page.tsx                 # Halaman reset password
│   │   ├── verify/
│   │   │   ├── Verify.tsx               # Komponen form verifikasi OTP
│   │   │   └── page.tsx                 # Halaman verifikasi OTP
│   ├── (user)/                          # Halaman untuk user, admin, 
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx             # Halaman dashboard admin
│   │   │   ├── data/
│   │   │   │   ├── buku/
│   │   │   │   │   └── page.tsx         # Halaman kelola buku
│   │   │   │   ├── pinjaman/
│   │   │   │   │   └── page.tsx         # Halaman kelola pinjaman
│   │   ├── user/
│   │   │   ├── books/
│   │   │   │   └── page.tsx             # Halaman daftar buku
│   │   │   ├── home/
│   │   │   │   └── page.tsx             # Halaman beranda user
│   │   │   ├── pinjaman/
│   │   │   │   └── page.tsx             # Halaman daftar pinjaman user
│   │   │   ├── profile/
│   │   │   │   └── page.tsx             # Halaman pengaturan profil
│   ├── api/                             # API routes
│   │   ├── auth/
│   │   ├── books/
│   │   ├── pinjam-buku/
│   │   ├── upload/
│   │   └── user/
│   ├── auth/
│   │   └── redirect/
│   ├── detail-book/
│   │   └── [id]/
│   ├── ui/
│   │   └── fonts.ts
│
├── components/                          # Kumpulan komponen UI dan halaman
│   ├── BackButton.tsx                   # Tombol kembali
│   ├── ButtonLogout.tsx                 # Tombol logout
│   ├── nav-links.tsx                    # Navigasi link
│   ├── sidebar.tsx                      # Sidebar navigasi
│   ├── admin/
│   │   ├── Header.tsx
│   │   ├── dashboard/
│   │   │   ├── DataBuku.tsx
│   │   │   ├── DataPinjaman.tsx
│   ├── detail-books/
│   │   ├── BooksData.tsx
│   │   ├── CardPinjamBuku.tsx
│   │   ├── Categories.tsx
│   │   ├── CoverBooks.tsx
│   │   ├── DetailBookAsync.tsx
│   │   ├── Header.tsx
│   ├── error-boundary/
│   │   └── ErrorBoundary.tsx
│   ├── landing/
│   │   ├── BukuSection.tsx
│   │   ├── BukuSkeletons.tsx
│   │   ├── Faq.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── LayananSection.tsx
│   │   ├── Navbar.tsx
│   │   └── TentangKami.tsx
│   ├── profile/
│   │   ├── EditProfileSheet.tsx
│   │   ├── Header.tsx
│   │   ├── Profile.tsx
│   │   └── ProfileContent.tsx
│   ├── skeletons/
│   │   ├── BooksGridSkeleton.tsx
│   │   └── DetailBookSkeleton.tsx
│   ├── ui/...
│   ├── user-books/
│   │   ├── AddBookButton.tsx
│   │   └── ... (komponen lain terkait buku user)
│   ├── user-home/
│   │   └── ... (komponen beranda user)
│   ├── user-pinjaman/
│   │   └── ... (komponen pinjaman user)
│
├── hooks/
│   └── use-mobile.ts                    # Custom hook untuk deteksi mobile
│
├── lib/                                 # Library dan utilitas
│   ├── auth.ts                          # Logika autentikasi
│   ├── cloudinary.ts                    # Integrasi Cloudinary
│   ├── hooks.ts                         # Kumpulan custom hooks
│   ├── store.ts                         # State management
│   ├── utils.ts                         # Fungsi utilitas
│   ├── actions/
│   ├── features/
│   ├── generated/
│   ├── types/
│   └── utils/
│
├── middlewares/
│   └── role-access.ts                   # Middleware proteksi akses role
│
├── prisma/
│   ├── schema.prisma                    # Skema database Prisma
│   ├── seed.ts                          # Script seeding database
│   └── migrations/                      # Folder migrasi database
│
├── public/                              # File statis (gambar, ikon, dsb)
│   ├── book-lover.svg
│   ├── eperpus.svg
│   ├── file.svg
│   ├── globe.svg
│   ├── google.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   └── images/
│       └── ... (gambar-gambar lain)
│
├── validations/
│   ├── bookSchema.ts                    # Validasi schema buku (Zod)
│   └── userSchema.ts                    # Validasi schema user (Zod)
│
├── package.json                         # Konfigurasi npm/pnpm
├── tsconfig.json                        # Konfigurasi TypeScript
├── next.config.ts                       # Konfigurasi Next.js
├── postcss.config.mjs                   # Konfigurasi PostCSS
├── eslint.config.mjs                    # Konfigurasi ESLint
├── README.md                            # Dokumentasi proyek
├── CLOUDINARY_SETUP.md                  # Panduan setup Cloudinary
├── TYPE_FIXES.md                        # Catatan perbaikan tipe data
└── ...file dan folder lain
```

## Deployment
Proyek ini sudah dideploy menggunakan vercel. Jika berminat bisa kunjungi [https://eperpus.vercel.app/](https://eperpus.vercel.app/)

