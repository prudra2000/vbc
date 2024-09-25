// src/app/api/card/[id]/route.ts
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Invalid card ID' }, { status: 400 });
  }

  try {
    const card = await db.card.findUnique({
      where: { id },
    });
  
    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
  
    return NextResponse.json(card, { status: 200 });
  } catch (error) {
    console.error('Error fetching card:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}