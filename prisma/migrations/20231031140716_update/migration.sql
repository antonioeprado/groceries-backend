/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pending` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "pending" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "memberId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Session";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
