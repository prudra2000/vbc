"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { CardSchema } from "@/schemas/index";
import { getUserByEmail, getUserById } from "@/data/user";
import { auth } from "@/auth";

export const addCard = async (values: z.infer<typeof CardSchema>) => {
  const validatedFields = CardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const {
    userId,
    style,
    title,
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

  const session = await auth();
    

  try {console.log("Validated Fields Data:", validatedFields.data);
    const newCard = await db.card.create({
      data: {
        userId: session?.user?.id || "",
        title,
        style: style || "",
        description: description || "",
        image: image || "",
        github: github || "",
        linkedin: linkedin || "",
        twitter: twitter || "",
        instagram: instagram || "",
        facebook: facebook || "",
        tiktok: tiktok || "",
        youtube: youtube || "",
        twitch: twitch || "",
        discord: discord || "",
        snapchat: snapchat || "",
        whatsapp: whatsapp || "",
        telegram: telegram || "",
        reddit: reddit || "",
        pinterest: pinterest || "",
      },
    });

    return {
      success: "Card created successfully",
      card: newCard,
    };
  } catch (error) {
    console.error("Error creating card:", error);
    return {
      error: "Error creating card",
    };
  }
};
