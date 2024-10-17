"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { DigimedCardSchema, UpdateCardSchema } from "@/schemas/index";
import { getPersonalCardByUserID } from "@/data/card";
import { auth } from "@/auth";



export const updateCard = async (values: z.infer<typeof DigimedCardSchema>, cardID:string) => {

  const validatedFields = DigimedCardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const {
    cardTitle,
    cardStyle,
    cardData,
  } = validatedFields.data;


  const session = await auth();

  const card = await getPersonalCardByUserID(cardID);
  if (!card) {
    return {
      error: "Card not found",
    };
  }

  type CardData = {
    name: string;
    image: string;
    tagline: string;
    company: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    socialMedia: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
      facebook: string;
      tiktok: string;
      youtube: string;
      twitch: string;
      discord: string;
    };
  };


  try {
    await db.digiMeCard.update({
      where: {
        id: cardID,
        userId: session?.user?.id,
      },
      data: {
        cardTitle: cardTitle || card.cardTitle,
        cardStyle: cardStyle || card.cardStyle,
        cardData: {
          name: cardData.name || (card.cardData as CardData)?.name,
          image: cardData.image || (card.cardData as CardData)?.image,
          tagline: cardData.tagline || (card.cardData as CardData)?.tagline,
          company: cardData.company || (card.cardData as CardData)?.company,
          email: cardData.email || (card.cardData as CardData)?.email,
          phone: cardData.phone || (card.cardData as CardData)?.phone,
          location: cardData.location || (card.cardData as CardData)?.location,
          website: cardData.website || (card.cardData as CardData)?.website,
          socialMedia: cardData.socialMedia || (card.cardData as CardData)?.socialMedia,
        },
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
