"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UpdateCardSchema } from "@/schemas/index";
import { getCardByUserID } from "@/data/card";
import { auth } from "@/auth";

export const updateCard = async (values: z.infer<typeof UpdateCardSchema>, cardID:string) => {

  console.log(cardID)
  const validatedFields = UpdateCardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const {
    userId,
    cardTitle,
    cardStyle,
    name,
    image,
    tagline,
    company,
    email,
    phone,
    location,
    website,
  } = validatedFields.data;
  const socialMedia = validatedFields.data.socialMedia || {};


  const card = await getCardByUserID(cardID);
  if (!card) {
    return {
      error: "Card not found",
    };
  }

  try {
    await db.card.update({
      where: {
        id: cardID,
      },
      data: {
        cardTitle: cardTitle || card.cardTitle,
        cardStyle: cardStyle || card.cardStyle,
        name: name || card.name,
        image: image || card.image,
        tagline: tagline || card.tagline,
        company: company || card.company,
        email: email || card.email,
        phone: phone || card.phone,
        location: location || card.location,
        website: website   || card.website,
        socialMedia: socialMedia || card.socialMedia,
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
