/*
  Warnings:

  - You are about to drop the column `imag_url` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "imag_url",
ADD COLUMN     "image_url" TEXT;
