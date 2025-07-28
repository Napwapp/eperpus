-- AlterEnum
ALTER TYPE "Gender" ADD VALUE 'tidak_memilih';

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "nomorHp" DROP NOT NULL,
ALTER COLUMN "alamat" DROP NOT NULL;
