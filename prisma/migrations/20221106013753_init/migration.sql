/*
  Warnings:

  - Added the required column `priority` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "priority" INTEGER NOT NULL,
ADD COLUMN     "update_at" TIMESTAMP(3) NOT NULL;
