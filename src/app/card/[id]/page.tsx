"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card as PCard } from "@prisma/client"; // Import the Card type from Prisma
import Card from "../../../components/card";

const CardPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [card, setCard] = useState<PCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonEmptySocial, setNonEmptySocial] = useState<string[]>();
  const [urls, setUrls] = useState<Record<string, string>>({
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
  });

  useEffect(() => {
    const fetchCard = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/card/${id}`);
          console.log('Response:', response); // Add this line
          if (response.ok) {
            const cardData = await response.json();
            console.log('Card Data:', cardData); // Add this line
            setCard(cardData);
            setUrls({
              linkedin: cardData.linkedin || "",
              github: cardData.github || "",
              twitter: cardData.twitter || "",
              instagram: cardData.instagram || "",
              facebook: cardData.facebook || "",
              tiktok: cardData.tiktok || "",
              youtube: cardData.youtube || "",
              twitch: cardData.twitch || "",
              discord: cardData.discord || "",
              snapchat: cardData.snapchat || "",
              whatsapp: cardData.whatsapp || "",
              telegram: cardData.telegram || "",
              reddit: cardData.reddit || "",
              pinterest: cardData.pinterest || "",
            });
            if (cardData) {
              setNonEmptySocial(Object.values(cardData).filter((url): url is string => typeof url === "string" && url !== ""));
              console.log(nonEmptySocial);
            }
          } else {
            setError(`Failed to fetch card data: ${response.statusText}`);
          }
        } catch (error) {
          setError("Error fetching card data");
          console.error("Error fetching card data:", error);
        }
      }
      setLoading(false);
    };
  
    fetchCard();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Card ID: {card?.id}</h1>
      <h1>Card ID: {card?.github}</h1>
      <Card
        name={card?.title || ""}
        email={card?.description || ""}
        location={card?.image || ""}
        urls={urls} // Fix: use the correct state variable
        showUsername={true}
        selectedInputs={[]}
      />
    </div>
  );
};

export default CardPage;