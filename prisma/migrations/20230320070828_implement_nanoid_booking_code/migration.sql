/*
  Warnings:

  - The primary key for the `Booking` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Booking` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pkey",
ALTER COLUMN "id" SET DEFAULT nanoid(),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(6),
ADD CONSTRAINT "Booking_pkey" PRIMARY KEY ("id");
