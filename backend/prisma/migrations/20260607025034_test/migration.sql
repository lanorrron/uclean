/*
  Warnings:

  - You are about to drop the column `title` on the `Report` table. All the data in the column will be lost.
  - Added the required column `incident_type` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `register_number` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "title",
ADD COLUMN     "incident_type" TEXT NOT NULL,
ADD COLUMN     "register_number" TEXT NOT NULL,
ADD COLUMN     "user_type" TEXT NOT NULL;
