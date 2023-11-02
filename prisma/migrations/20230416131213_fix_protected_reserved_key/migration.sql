/*
  Warnings:

  - You are about to drop the column `protected` on the `Family` table. All the data in the column will be lost.
  - Added the required column `protect` to the `Family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Family" DROP COLUMN "protected",
ADD COLUMN     "protect" BOOLEAN NOT NULL;
