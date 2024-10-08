"use server";

import { db } from "@/lib/db";
import { getPersonalCardByUserID } from "@/data/card";

export const unpublishCard = async (userId:string, cardID:string) => {



  const card = await getPersonalCardByUserID(cardID);
  if (!card) {
    return {
      error: "Card not found",
    };
  }

  try {
    await db.personalCard.update({
      where: {
        id: cardID,
        userId: userId,
      },
      data: {
        isPublished: false,
      },
    });

    return {
      success: "Card published successfully",
    };
  } catch (error) {
    console.error("Error updating card:", error);
    return {
      error: "Error updating card",
    };
  }
};
