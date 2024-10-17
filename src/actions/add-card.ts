"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { DigimedCardSchema } from "@/schemas/index";
import { auth } from "@/auth";

export const addCard = async (values: z.infer<typeof DigimedCardSchema>) => {
  const validatedFields = DigimedCardSchema.safeParse(values);
  if (!validatedFields.success) {
    console.error("Validation failed:", validatedFields.error);
    return {
      error: "Validation failed",
    };
  }

  const { cardStyle, cardTitle, isPublished, cardData } = validatedFields.data;

  const session = await auth();

  // Debugging: Log the validated data
  console.log("Validated Fields:", validatedFields.data);

  try {
    const newCard = await db.digiMeCard.create({
      data: {
        userId: session?.user?.id || "",
        cardTitle: cardTitle || "",
        cardStyle: cardStyle || "",
        isPublished: isPublished ?? false,
        cardData: cardData,
      },
    });

    return {
      success: "Card created successfully",
      digiMeCard: newCard,
    };
  } catch (error) {
    console.error("Error creating card:", error);
    return {
      error: "Error creating card",
    };
  }
};
