/*
  Warnings:

  - You are about to drop the column `data` on the `Card` table. All the data in the column will be lost.
  - Added the required column `description` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discord` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `github` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `linkedin` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pinterest` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reddit` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `snapchat` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telegram` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tiktok` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitch` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twitter` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `youtube` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "data",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "discord" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "linkedin" TEXT NOT NULL,
ADD COLUMN     "pinterest" TEXT NOT NULL,
ADD COLUMN     "reddit" TEXT NOT NULL,
ADD COLUMN     "snapchat" TEXT NOT NULL,
ADD COLUMN     "telegram" TEXT NOT NULL,
ADD COLUMN     "tiktok" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "twitch" TEXT NOT NULL,
ADD COLUMN     "twitter" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL;
