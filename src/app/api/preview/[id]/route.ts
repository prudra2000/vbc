import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const session = await auth();
  const { pathname } = new URL(request.url);
  const userId = session?.user?.id;
  const cardId = pathname.split("/").pop();

  if (!userId || !cardId) {
    return NextResponse.json({ isOwner: false }, { status: 400 });
  }
  try {
    const digiMeCard = await db.digiMeCard.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    return NextResponse.json({ card: digiMeCard }, { status: 200 });
  } catch (error) {
    console.error("Error checking card ownership:", error);
    return NextResponse.json({ isOwner: false }, { status: 500 });
  }
}
