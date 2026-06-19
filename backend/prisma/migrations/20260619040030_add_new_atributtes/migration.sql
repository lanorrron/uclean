/*
  Warnings:

  - You are about to drop the column `image_url` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "image_url",
ADD COLUMN     "report_image_url" TEXT,
ADD COLUMN     "resolved_at" TIMESTAMP(3),
ADD COLUMN     "resolved_image_url" TEXT;
