-- CreateTable
CREATE TABLE "DigiMeCard" (
    "id" TEXT NOT NULL,
    "cardTitle" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardStyle" TEXT NOT NULL,
    "cardData" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DigiMeCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DigiMeCard" ADD CONSTRAINT "DigiMeCard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
