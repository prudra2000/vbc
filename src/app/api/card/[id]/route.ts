// src/app/api/card/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(request: Request) {
  const { searchParams, pathname } = new URL(request.url);
  const cardId = pathname.split("/").pop();
  if (!cardId) {
    return NextResponse.json({ error: "Invalid card ID" }, { status: 400 });
  }
  try {
    const personalCard = await db.personalCard.findUnique({
      where: { id: cardId },
    });
    if (!personalCard) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }
    return NextResponse.json({ card: personalCard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
