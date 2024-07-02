-- DropForeignKey
ALTER TABLE "Collaborators" DROP CONSTRAINT "Collaborators_songId_fkey";

-- DropForeignKey
ALTER TABLE "SongCollaborator" DROP CONSTRAINT "SongCollaborator_collaboratorId_fkey";

-- DropForeignKey
ALTER TABLE "SongCollaborator" DROP CONSTRAINT "SongCollaborator_songId_fkey";

-- AddForeignKey
ALTER TABLE "Collaborators" ADD CONSTRAINT "Collaborators_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCollaborator" ADD CONSTRAINT "SongCollaborator_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongCollaborator" ADD CONSTRAINT "SongCollaborator_collaboratorId_fkey" FOREIGN KEY ("collaboratorId") REFERENCES "Collaborators"("id") ON DELETE CASCADE ON UPDATE CASCADE;
