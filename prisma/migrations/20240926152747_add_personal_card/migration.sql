-- CreateTable
CREATE TABLE "PersonalCard" (
    "id" TEXT NOT NULL,
    "cardTitle" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardStyle" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "socialMedia" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonalCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonalCard" ADD CONSTRAINT "PersonalCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
