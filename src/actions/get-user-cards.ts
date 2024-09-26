
"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getCards() {
  try {
    const session = await auth();
    console.log("Session:", session);

    if (!session?.user?.id) {
      console.log("No user ID in session");
      return { error: "Unauthorized" };
    }
    const cards = await db.personalCard.findMany({
      where: {
        userId: session.user.id,
      },
    });

    console.log("Fetched cards:", cards);
    return { cards };
  } catch (error) {
    console.error("Error in getCards:", error);
    return { error: "Failed to fetch cards" };
  }
}