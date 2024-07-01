/*
  Warnings:

  - You are about to drop the column `colId` on the `Album` table. All the data in the column will be lost.
  - Added the required column `songId` to the `Collaborators` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_colId_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "colId";

-- AlterTable
ALTER TABLE "Collaborators" ADD COLUMN     "songId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "itemId" INTEGER;

-- CreateTable
CREATE TABLE "SongCollaborator" (
    "songId" INTEGER NOT NULL,
    "collaboratorId" INTEGER NOT NULL,

    CONSTRAINT "SongCollaborator_pkey" PRIMARY KEY ("songId","collaboratorId")
);

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Store_Item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCollaborator" ADD CONSTRAINT "SongCollaborator_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCollaborator" ADD CONSTRAINT "SongCollaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
