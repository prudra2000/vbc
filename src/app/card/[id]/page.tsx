"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card as PCard } from "@prisma/client"; // Import the Card type from Prisma
import Card from "../../../components/card/card";

const CardPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [card, setCard] = useState<PCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [nonEmptyCardData, setnonEmptyCardData] = useState<string[]>([]);
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
          console.log("Response:", response); // Log the response
          if (response.ok) {
            const cardData = await response.json();
            console.log("Card Data:", cardData); // Log the card data
            if (cardData) { // Check if cardData is not null
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
              const keysToRetain = [
                "linkedin",
                "github",
                "twitter",
                "instagram",
                "facebook",
                "tiktok",
                "youtube",
                "twitch",
                "discord",
                "snapchat",
                "whatsapp",
                "telegram",
                "reddit",
                "pinterest",
              ];
              const filteredData = Object.entries(cardData)
                .filter(([key, value]) => keysToRetain.includes(key) && value)
                .map(([key]) => key);
              console.log(filteredData); // Log filtered data before setting state
              setnonEmptyCardData(filteredData);
              setSelectedInputs(filteredData);
              console.log(cardData?.image);
            } else {
              setError("Card data is null or undefined");
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
    <div className="w-screen h-screen">
      <Card
        name={card?.title || ""}
        email={card?.description || ""}
        image={card?.image || ""}
        urls={urls} // Fix: use the correct state variable
        showUsername={false}
        selectedInputs={selectedInputs}
        type="primary"
      />
    </div>
  );
};

export default CardPage;