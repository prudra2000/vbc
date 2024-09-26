"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PersonalCardSchema } from "@/schemas/index";
import { auth } from "@/auth";

export const addCard = async (values: z.infer<typeof PersonalCardSchema>) => {
  const validatedFields = PersonalCardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const {
    userId,
    cardStyle,
    cardTitle,
    name,
    image,
    tagline,
    company,
    email,
    phone,
    location,
    website,
    socialMedia,
  } = validatedFields.data;

  const session = await auth();

  try {
    const newCard = await db.personalCard.create({
      data: {
        userId: session?.user?.id || "",
        cardTitle: cardTitle || "",
        cardStyle: cardStyle || "",
        name: name || "",
        image: image || "",
        tagline: tagline || "",
        company: company || "",
        email: email || "",
        phone: phone || "",
        location: location || "",
        website: website || "",
        socialMedia: socialMedia || {},
      },
    });

    return {
      success: "Card created successfully",
      personalCard: newCard,
    };
  } catch (error) {
    console.error("Error creating card:", error);
    return {
      error: "Error creating card",
    };
  }
};
