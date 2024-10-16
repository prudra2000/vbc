
"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getCards() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Unauthorized" };
    }
    const cards = await db.digiMeCard.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return { cards };
  } catch (error) {
    console.error("Error in getCards:", error);
    return { error: "Failed to fetch cards" };
  }
}