/*
  Warnings:

  - You are about to drop the column `comments` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Statistic` table. All the data in the column will be lost.
  - You are about to drop the column `week` on the `Statistic` table. All the data in the column will be lost.
  - Added the required column `position` to the `WeekPerformance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Statistic` DROP COLUMN `comments`,
    DROP COLUMN `likes`,
    DROP COLUMN `views`,
    DROP COLUMN `week`;

-- AlterTable
ALTER TABLE `WeekPerformance` ADD COLUMN `position` INTEGER NOT NULL,
    MODIFY `viewModifier` DECIMAL(65, 30),
    MODIFY `viewPoint` INTEGER,
    MODIFY `likeModifier` DECIMAL(65, 30),
    MODIFY `likePoint` INTEGER,
    MODIFY `commentModifier` DECIMAL(65, 30);

-- CreateTable
CREATE TABLE `WeekStatistic` (
    `id` VARCHAR(191) NOT NULL,
    `statisticId` VARCHAR(191) NOT NULL,
    `week` INTEGER NOT NULL,
    `views` INTEGER NOT NULL,
    `comments` INTEGER NOT NULL,
    `likes` INTEGER NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KAFUPerformance` (
    `id` VARCHAR(191) NOT NULL,
    `bestPosition` INTEGER NOT NULL,
    `weeksInChart` INTEGER NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3),

    UNIQUE INDEX `KAFUPerformance_videoId_unique`(`videoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KAFUWeekPerformance` (
    `id` VARCHAR(191) NOT NULL,
    `performanceId` VARCHAR(191) NOT NULL,
    `week` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,
    `viewModifier` DECIMAL(65, 30),
    `viewPoint` INTEGER,
    `likeModifier` DECIMAL(65, 30),
    `likePoint` INTEGER,
    `commentModifier` DECIMAL(65, 30),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WeekStatistic` ADD FOREIGN KEY (`statisticId`) REFERENCES `Statistic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KAFUPerformance` ADD FOREIGN KEY (`videoId`) REFERENCES `Video`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KAFUWeekPerformance` ADD FOREIGN KEY (`performanceId`) REFERENCES `KAFUPerformance`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
