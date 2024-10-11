/*
  Warnings:

  - A unique constraint covering the columns `[episodeId,characterId]` on the table `EpisodeCharacter` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "EpisodeCharacter_episodeId_characterId_key" ON "EpisodeCharacter"("episodeId", "characterId");
