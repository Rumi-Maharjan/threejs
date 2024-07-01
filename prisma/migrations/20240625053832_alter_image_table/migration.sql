/*
  Warnings:

  - You are about to drop the column `artImageId` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `caption` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Inquiry` table. All the data in the column will be lost.
  - You are about to drop the column `coverImageId` on the `Song` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[songId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aboutId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `songId` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `Inquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artImageId_fkey";

-- DropForeignKey
ALTER TABLE "Song" DROP CONSTRAINT "Song_coverImageId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "artImageId";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "category";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "caption",
DROP COLUMN "path",
ADD COLUMN     "aboutId" INTEGER NOT NULL,
ADD COLUMN     "albumId" INTEGER NOT NULL,
ADD COLUMN     "blogId" INTEGER NOT NULL,
ADD COLUMN     "songId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Inquiry" DROP COLUMN "phone",
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "coverImageId";

-- AlterTable
ALTER TABLE "Store_Item" ADD COLUMN     "status" BOOLEAN DEFAULT true;

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "caption" VARCHAR(255),
    "images" TEXT NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_songId_key" ON "Image"("songId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
