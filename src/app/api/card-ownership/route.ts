import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const cardId = searchParams.get('cardId');

    console.log('Checking ownership for userId:', userId, 'cardId:', cardId);

    if (!userId || !cardId) {
      console.log('Missing userId or cardId');
      return NextResponse.json({ isOwner: false, error: 'Missing userId or cardId' }, { status: 400 });
    }

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        userId: userId,
      },
    });

    console.log('Card found:', card);

    return NextResponse.json({ isOwner: card !== null });
  } catch (error) {
    console.error("Error checking card ownership1:", error);
    return NextResponse.json({ isOwner: false, error: 'Internal server error' }, { status: 500 });
  }
}