/*
  Warnings:

  - The values [LIMPIEZA,MANTENIMIENTO,SEGURIDAD] on the enum `Area` will be removed.
  - The values [MANTENIMIENTO,LIMPIEZA,SEGURIDAD] on the enum `Role` will be removed.

*/

-- =========================
-- AREA
-- =========================
BEGIN;

CREATE TYPE "Area_new" AS ENUM (
  'CLEANING',
  'MAINTENANCE',
  'SECURITY'
);

ALTER TABLE "Report"
ALTER COLUMN "area"
TYPE "Area_new"
USING (
  CASE
    WHEN "area"::text = 'LIMPIEZA' THEN 'CLEANING'::"Area_new"
    WHEN "area"::text = 'MANTENIMIENTO' THEN 'MAINTENANCE'::"Area_new"
    WHEN "area"::text = 'SEGURIDAD' THEN 'SECURITY'::"Area_new"
  END
);

ALTER TYPE "Area" RENAME TO "Area_old";
ALTER TYPE "Area_new" RENAME TO "Area";
DROP TYPE "Area_old";

COMMIT;

-- =========================
-- INCIDENT TYPE
-- =========================
ALTER TYPE "IncidentType" ADD VALUE IF NOT EXISTS 'SECURITY';

-- =========================
-- ROLE
-- =========================
BEGIN;

CREATE TYPE "Role_new" AS ENUM (
  'ADMIN',
  'MAINTENANCE',
  'CLEANING',
  'SECURITY'
);

ALTER TABLE "User"
ALTER COLUMN "role"
TYPE "Role_new"
USING (
  CASE
    WHEN "role"::text = 'ADMIN' THEN 'ADMIN'::"Role_new"
    WHEN "role"::text = 'MANTENIMIENTO' THEN 'MAINTENANCE'::"Role_new"
    WHEN "role"::text = 'LIMPIEZA' THEN 'CLEANING'::"Role_new"
    WHEN "role"::text = 'SEGURIDAD' THEN 'SECURITY'::"Role_new"
  END
);

ALTER TABLE "UserInvitation"
ALTER COLUMN "role"
TYPE "Role_new"
USING (
  CASE
    WHEN "role"::text = 'ADMIN' THEN 'ADMIN'::"Role_new"
    WHEN "role"::text = 'MANTENIMIENTO' THEN 'MAINTENANCE'::"Role_new"
    WHEN "role"::text = 'LIMPIEZA' THEN 'CLEANING'::"Role_new"
    WHEN "role"::text = 'SEGURIDAD' THEN 'SECURITY'::"Role_new"
  END
);

ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";

COMMIT;