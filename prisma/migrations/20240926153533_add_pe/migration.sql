/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `discord` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `pinterest` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `reddit` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `snapchat` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `style` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `telegram` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `tiktok` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `twitch` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `Card` table. All the data in the column will be lost.
  - Added the required column `cardStyle` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardTitle` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialMedia` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagline` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "discord",
DROP COLUMN "facebook",
DROP COLUMN "github",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "pinterest",
DROP COLUMN "reddit",
DROP COLUMN "snapchat",
DROP COLUMN "style",
DROP COLUMN "telegram",
DROP COLUMN "tiktok",
DROP COLUMN "title",
DROP COLUMN "twitch",
DROP COLUMN "twitter",
DROP COLUMN "whatsapp",
DROP COLUMN "youtube",
ADD COLUMN     "cardStyle" TEXT NOT NULL,
ADD COLUMN     "cardTitle" TEXT NOT NULL,
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "socialMedia" JSONB NOT NULL,
ADD COLUMN     "tagline" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL;
