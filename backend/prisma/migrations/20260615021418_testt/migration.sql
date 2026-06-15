/*
  Warnings:

  - You are about to drop the column `are` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "are",
ADD COLUMN     "area" "Area" NOT NULL DEFAULT 'LIMPIEZA';
