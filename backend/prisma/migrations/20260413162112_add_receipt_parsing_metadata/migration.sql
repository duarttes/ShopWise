/*
  Warnings:

  - The `parsingWarnings` column on the `receipts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "receipts" ALTER COLUMN "parsingScore" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "parsingWarnings",
ADD COLUMN     "parsingWarnings" TEXT[] DEFAULT ARRAY[]::TEXT[];
