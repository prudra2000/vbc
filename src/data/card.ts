import { db } from "@/lib/db";
import { auth } from "@/auth";

export const getCardByUserID = async (cardId: string) => {
  const session = await auth();
  try {
    const card = await db.card.findFirst({
      where: {
        id: cardId,
        userId: session?.user?.id,
      },
    });
    return card;
  } catch {
    return null;
  }
};

export const isCardOwner = async (userId: string, cardId: string) => {

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    return card !== null;
  } catch (error) {
    console.error("Error checking card ownership:", error);

    return false;
  }
};
