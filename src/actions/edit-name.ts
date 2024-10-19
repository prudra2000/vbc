"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { DigimedCardSchema, UpdateCardSchema } from "@/schemas/index";
import { getPersonalCardByUserID } from "@/data/card";
import { auth } from "@/auth";



export const editCardName = async (cardID:string, values: z.infer<typeof DigimedCardSchema>) => {

  const validatedFields = DigimedCardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const {
    cardTitle,
  } = validatedFields.data;


  const session = await auth();

  const card = await getPersonalCardByUserID(cardID);
  if (!card) {
    return {
      error: "Card not found",
    };
  }

  type CardData = {
    cardTitle: string;
  };


  try {
    await db.digiMeCard.update({
      where: {
        id: cardID,
        userId: session?.user?.id,
      },
      data: {
        cardTitle: cardTitle || card.cardTitle,
    }});

    return {
      success: "Card updated successfully",
    };
  } catch (error) {
    console.error("Error updating card:", error);
    return {
      error: "Error updating card",
    };
  }
};
