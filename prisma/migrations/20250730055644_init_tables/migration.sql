-- CreateEnum
CREATE TYPE "PinjamanStatus" AS ENUM ('request', 'aktif', 'diperpanjang', 'menunggu_pengembalian', 'done');

-- CreateTable
CREATE TABLE "buku" (
    "id" SERIAL NOT NULL,
    "cover" TEXT,
    "title" TEXT NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publisher" TEXT,
    "release_date" TIMESTAMP(3),
    "rak" TEXT,
    "lokasi" TEXT NOT NULL DEFAULT 'perpus sekolah',
    "stok" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "buku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id" SERIAL NOT NULL,
    "books_id" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pinjaman" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "id_books" INTEGER NOT NULL,
    "status" "PinjamanStatus" NOT NULL DEFAULT 'request',
    "tanggal_permintaan" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggal_dipinjam" TIMESTAMP(3),
    "tanggal_dikembalikan" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pinjaman_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kategori" ADD CONSTRAINT "kategori_books_id_fkey" FOREIGN KEY ("books_id") REFERENCES "buku"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjaman" ADD CONSTRAINT "pinjaman_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pinjaman" ADD CONSTRAINT "pinjaman_id_books_fkey" FOREIGN KEY ("id_books") REFERENCES "buku"("id") ON DELETE CASCADE ON UPDATE CASCADE;
