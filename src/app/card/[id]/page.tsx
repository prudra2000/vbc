// app/card/[id]/page.tsx
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

interface CardPageProps {
  params: { id: string };
}

// Server Component to fetch and display card data
export default async function CardPage({ params }: CardPageProps) {
  const { id } = params;

  // Fetch the business card data using Prisma
  const cardData = await db.businessCard.findUnique({
    where: { id },
  });

  if (!cardData) {
    notFound(); // Handle non-existent card with Next.js 404
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold">{cardData?.name}</h1>
      <p>{cardData?.title}</p>
      <p>{cardData?.company}</p>
      <p>Email: {cardData?.email}</p>
      <p>Phone: {cardData?.phone}</p>
    </div>
  );
}
