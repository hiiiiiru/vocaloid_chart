/*
  Warnings:

  - Added the required column `comments` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `likes` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `week` to the `Statistic` table without a default value. This is not possible if the table is not empty.
  - Made the column `videoId` on table `Statistic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Statistic` DROP FOREIGN KEY `Statistic_ibfk_1`;

-- DropForeignKey
ALTER TABLE `WeekStatistic` DROP FOREIGN KEY `WeekStatistic_ibfk_1`;

-- AlterTable
ALTER TABLE `Statistic` ADD COLUMN `comments` INTEGER NOT NULL,
    ADD COLUMN `likes` INTEGER NOT NULL,
    ADD COLUMN `views` INTEGER NOT NULL,
    ADD COLUMN `week` INTEGER NOT NULL,
    MODIFY `videoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Statistic` ADD FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
