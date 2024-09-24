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
    title,
    style,
    description,
    image,
    github,
    linkedin,
    twitter,
    instagram,
    facebook,
    tiktok,
    youtube,
    twitch,
    discord,
    snapchat,
    whatsapp,
    telegram,
    reddit,
    pinterest,
  } = validatedFields.data;


  const card = await getCardByUserID(cardID);
  if (!card) {
    return {
      error: "Card not found",
    };
  }

  try {
    await db.card.update({
      where: {
        id: card.id,
      },
      data: {
        title: title || card.title,
        description: description || card.description,
        image: image || card.image,
        style: style || card.style,
        github: github || card.github,
        linkedin: linkedin || card.linkedin,
        twitter: twitter || card.twitter,
        instagram: instagram || card.instagram,
        facebook: facebook || card.facebook,
        tiktok: tiktok || card.tiktok,
        youtube: youtube || card.youtube,
        twitch: twitch || card.twitch,
        discord: discord || card.discord,
        snapchat: snapchat || card.snapchat,
        whatsapp: whatsapp || card.whatsapp,
        telegram: telegram || card.telegram,
        reddit: reddit || card.reddit,
        pinterest: pinterest || card.pinterest,
      },
    });

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
