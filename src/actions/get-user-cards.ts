"use server"
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function getCards() {
  
  const session = await auth();
  
  if (!session?.user?.id) {
    return { error: "Unauthorized" };
  }

  try {
    const cards = await db.card.findMany({
      where: {
        userId: session.user.id
      }
    });

    return { cards };
  } catch (error) {
    console.error("Error fetching cards:", error);
    return { error: "Failed to fetch cards" };
  }
}