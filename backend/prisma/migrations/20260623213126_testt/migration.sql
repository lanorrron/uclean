/*
  Warnings:

  - The values [LIMPIEZA,MANTENIMIENTO,SEGURIDAD] on the enum `Area` will be removed. If these variants are still used in the database, this will fail.
  - The values [MANTENIMIENTO,LIMPIEZA,SEGURIDAD] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Area_new" AS ENUM ('CLEANING', 'MAINTENANCE', 'SECURITY');
ALTER TABLE "Report" ALTER COLUMN "area" TYPE "Area_new" USING ("area"::text::"Area_new");
ALTER TYPE "Area" RENAME TO "Area_old";
ALTER TYPE "Area_new" RENAME TO "Area";
DROP TYPE "public"."Area_old";
COMMIT;

-- AlterEnum
ALTER TYPE "IncidentType" ADD VALUE 'SECURITY';

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'MAINTENANCE', 'CLEANING', 'SECURITY');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TABLE "UserInvitation" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;
