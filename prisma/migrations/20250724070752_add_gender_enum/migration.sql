-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('laki_laki', 'perempuan');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" "Gender";
