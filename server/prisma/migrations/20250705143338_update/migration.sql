-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "priority" SET DEFAULT 0,
ALTER COLUMN "priority" DROP DEFAULT;
DROP SEQUENCE "Todo_priority_seq";
