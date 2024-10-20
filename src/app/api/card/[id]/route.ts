// src/app/api/card/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET(request: Request) {
  const {  pathname } = new URL(request.url);
  const cardId = pathname.split("/").pop();
  if (!cardId) {
    return NextResponse.json({ error: "Invalid card ID" }, { status: 400 });
  }
  try {
    const digiMeCard = await db.digiMeCard.findUnique({
      where: { id: cardId, isPublished: true },
    });
    if (!digiMeCard?.isPublished) {
      return NextResponse.json({ error: "Card is not published" }, { status: 403 });
    }
    return NextResponse.json({ card: digiMeCard }, { status: 200 });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
