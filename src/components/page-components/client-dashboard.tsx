"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addCard } from "@/actions/add-card";
import { Card } from "@prisma/client";
import { getCards } from "@/actions/get-user-cards";

// Update the SessionType to include id
type SessionType = {
  user?: {
    name?: string;
    id?: string; // Add this line
  };
};

const ClientDashboard = () => {
  // Update the useState hook with the correct type
  const [session, setSession] = useState<SessionType | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      // Replace this with your actual method to fetch the session
      const response = await fetch("/api/auth/session");
      const sessionData = await response.json();
      setSession(sessionData);
    };
    const fetchCards = async () => {
        const result = await getCards();
        if ('cards' in result) {
          setCards(result.cards ?? []);
        } else {
          console.error(result.error);
          setError(result.error);
        }
        
      };

    fetchSession();
    fetchCards();
  }, []);
  
console.log(cards)
  // Update the starterValues
  const starterValues = {
    userId: session?.user?.id || "", // Add this line
    title: "",
    description: "",
    image: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    discord: "",
    snapchat: "",
    whatsapp: "",
    telegram: "",
    reddit: "",
    pinterest: "",
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div>
      Dashboard
      <div className="flex w-max justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome Back, {session?.user?.name}.
        </h1>
        <Link
          href={""}
          onClick={async (e) => {
            // Add 'e' parameter
            e.preventDefault(); // Prevent default link behavior
            if (session?.user?.id) {
              // Add this check
              await addCard(starterValues);
            } else {
              console.error("User ID is missing");
            }
          }}
        >
          <Button variant="outline">Add Card</Button>
        </Link>
      </div>
      <div>
        <h1>Your Cards</h1>
        {error && <p>Error: {error}</p>}
        {cards.map((card) => (
          <div key={card.id}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link href={`/editor/${card.id}`}>
              <Button>Edit</Button>
            </Link>
          </div>
        ))}
        {/* ... rest of your JSX */}
      </div>
    </div>
  );
};

export default ClientDashboard;
