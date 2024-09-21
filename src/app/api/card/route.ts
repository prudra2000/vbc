// app/api/card/create/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, title, company, email, phone } = await request.json();

  // Create a new business card in the database
  const newCard = await db.businessCard.create({
    data: {
      name,
      title,
      company,
      email,
      phone,
    },
  });

  return NextResponse.json({ id: newCard.id });
}
