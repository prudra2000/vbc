import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const cardId = searchParams.get('cardId');

  if (!userId || !cardId) {
    return NextResponse.json({ isOwner: false }, { status: 400 });
  }

  try {
    const card = await db.card.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    return NextResponse.json({ isOwner: card !== null }, { status: 200 });
  } catch (error) {
    console.error("Error checking card ownership:", error);
    return NextResponse.json({ isOwner: false }, { status: 500 });
  }
}