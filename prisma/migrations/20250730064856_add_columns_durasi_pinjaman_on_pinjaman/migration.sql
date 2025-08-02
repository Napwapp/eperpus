/*
  Warnings:

  - Added the required column `durasi_pinjaman` to the `pinjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."pinjaman" ADD COLUMN     "durasi_pinjaman" INTEGER NOT NULL;
