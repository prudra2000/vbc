"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function deleteCard(cardId: string) {
    const session = await auth();
  
    const existingCard = await db.card.findUnique({
      where: { id: cardId, userId: session?.user?.id },
    });
  
    if (!existingCard) {
      throw new Error("Card not found or does not belong to the user.");
    }
  
    const card = await db.card.delete({
      where: { id: cardId, userId: session?.user?.id },
    });
    return card; 
  }