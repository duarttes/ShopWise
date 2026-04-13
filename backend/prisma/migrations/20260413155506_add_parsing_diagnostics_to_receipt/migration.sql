-- AlterTable
ALTER TABLE "receipts" ADD COLUMN     "parsingScore" INTEGER,
ADD COLUMN     "parsingWarnings" JSONB;
