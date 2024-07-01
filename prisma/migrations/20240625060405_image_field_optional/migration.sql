-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_aboutId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_blogId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_songId_fkey";

-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "aboutId" DROP NOT NULL,
ALTER COLUMN "albumId" DROP NOT NULL,
ALTER COLUMN "blogId" DROP NOT NULL,
ALTER COLUMN "songId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_aboutId_fkey" FOREIGN KEY ("aboutId") REFERENCES "About"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
