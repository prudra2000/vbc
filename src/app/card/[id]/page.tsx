"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card as PCard } from "@prisma/client";
import BasicCard from "@/components/card-components/default-light";
import FloatButton from "@/components/ui/floatButton";
import { Share2 } from "lucide-react";
import ShareModal from "@/components/card/card-qr-modal";
import { GridLoader } from "react-spinners";
import BasicDarkCard from "@/components/card-components/default-dark";
import GlassLightCard from "@/components/card-components/glass-light";

type FormValues = {
  userId: string;
  cardTitle: string;
  cardStyle: string;
  name: string;
  image: string;
  tagline: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  socialMedia: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    twitch: string;
    discord: string;
    snapchat: string;
    whatsapp: string;
    telegram: string;
    reddit: string;
    pinterest: string;
  };
};

const CardPage = () => {
  const { id } = useParams(); // Get the id from the URL
  const [card, setCard] = useState<PCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
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
  const [formValues, setFormValues] = useState<FormValues>({
    userId: "",
    cardTitle: "",
    cardStyle: "",
    name: "",
    image: "",
    tagline: "",
    company: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    socialMedia: {
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
    },
  });

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true); // Set loading to true at the start
      if (id) {
        try {
          const response = await fetch(`/api/card/${id}`);
          if (response.ok) {
            const { card: cardData } = await response.json();
            setCard(cardData);
            if (cardData) {
              setFormValues({
                userId: cardData.userId || "",
                cardTitle: cardData.cardTitle || "",
                cardStyle: cardData.cardStyle || "",
                name: cardData.name || "",
                image: cardData.image || "",
                tagline: cardData.tagline || "",
                company: cardData.company || "",
                email: cardData.email || "",
                phone: cardData.phone || "",
                location: cardData.location || "",
                website: cardData.website || "",
                socialMedia: {
                  linkedin: cardData.socialMedia.linkedin || "",
                  github: cardData.socialMedia.github || "",
                  twitter: cardData.socialMedia.twitter || "",
                  instagram: cardData.socialMedia.instagram || "",
                  facebook: cardData.socialMedia.facebook || "",
                  tiktok: cardData.socialMedia.tiktok || "",
                  youtube: cardData.socialMedia.youtube || "",
                  twitch: cardData.socialMedia.twitch || "",
                  discord: cardData.socialMedia.discord || "",
                  snapchat: cardData.socialMedia.snapchat || "",
                  whatsapp: cardData.socialMedia.whatsapp || "",
                  telegram: cardData.socialMedia.telegram || "",
                  reddit: cardData.socialMedia.reddit || "",
                  pinterest: cardData.socialMedia.pinterest || "",
                },
              });
              setUrls({
                linkedin: cardData.socialMedia.linkedin || "",
                github: cardData.socialMedia.github || "",
                twitter: cardData.socialMedia.twitter || "",
                instagram: cardData.socialMedia.instagram || "",
                facebook: cardData.socialMedia.facebook || "",
                tiktok: cardData.socialMedia.tiktok || "",
                youtube: cardData.socialMedia.youtube || "",
                twitch: cardData.socialMedia.twitch || "",
                discord: cardData.socialMedia.discord || "",
                snapchat: cardData.socialMedia.snapchat || "",
                whatsapp: cardData.socialMedia.whatsapp || "",
                telegram: cardData.socialMedia.telegram || "",
                reddit: cardData.socialMedia.reddit || "",
                pinterest: cardData.socialMedia.pinterest || "",
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
              const filteredData = Object.entries(cardData.socialMedia)
                .filter(([key, value]) => keysToRetain.includes(key) && value)
                .map(([key]) => key);
              setnonEmptyCardData(filteredData);
              setSelectedInputs(filteredData);
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
      setLoading(false); // Set loading to false after the fetch operation
    };

    fetchCard();
  }, [id]);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading DigiMe...</h1>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="w-screen h-screen">
      {isQRModalOpen && (
        <ShareModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          cardId={typeof id === "string" ? id : ""}
        />
      )}
      <FloatButton onClick={() => setIsQRModalOpen(true)}>
        <Share2 className="w-4 h-4 text-white" />
      </FloatButton>
      {formValues.cardStyle === "default" && (
          <BasicCard
            cardValues={{
              ...formValues,
              socialMedia: JSON.stringify(formValues.socialMedia),
              urls: JSON.stringify(formValues.socialMedia),
            }}
            urls={urls}
            showUsername={true}
            selectedInputs={selectedInputs}
            type={
              formValues.cardStyle as
                | "default"
                | "defaultDark"
                | "success"
                | "danger"
                | "dashboard"
            }
          />
      )}
      {formValues.cardStyle === "defaultDark" && (
        <>
          <BasicDarkCard
            cardValues={{
              ...formValues,
              socialMedia: JSON.stringify(formValues.socialMedia),
              urls: JSON.stringify(formValues.socialMedia),
            }}
            urls={urls}
            showUsername={true}
            selectedInputs={selectedInputs}
            type={
              formValues.cardStyle as
                | "primary"
                | "secondary"
                | "success"
                | "danger"
                | "dashboard"
            }
          />
        </>
      )}
      {formValues.cardStyle === "glassLight" && (
        <GlassLightCard
        cardValues={{
          ...formValues,
          socialMedia: JSON.stringify(formValues.socialMedia),
          urls: JSON.stringify(formValues.socialMedia),
        }}
        urls={urls}
        showUsername={true}
        selectedInputs={selectedInputs}
        type={
          formValues.cardStyle
        }
        />
      )}
    </div>
  );
};

export default CardPage;
