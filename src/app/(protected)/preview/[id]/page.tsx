"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card as PCard } from "@prisma/client";
import BasicCard from "@/components/card-components/default-light";
import FloatButton from "@/components/ui/floatButton";
import { Eye, Fullscreen, PencilRuler, Share2 } from "lucide-react";
import ShareModal from "@/components/card/card-qr-modal";
import { GridLoader } from "react-spinners";
import BasicDarkCard from "@/components/card-components/default-dark";
import GlassLightCard from "@/components/card-components/glass-light";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EditorHeader from "@/components/editor/editorHeader";
import PreviewHeader from "@/components/preview/editorHeader";

type FormValues = {
  userId: string;
  cardTitle: string;
  cardStyle: string;
  cardData: {
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
    };
  };
};

const PreviewPage = () => {
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
  });
  const [digiMeCard, setDigiMeCard] = useState<FormValues>({
    userId: "",
    cardTitle: "",
    cardStyle: "",
    cardData: {
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
      },
    },
  });

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true); // Set loading to true at the start
      if (id) {
        try {
          const response = await fetch(`/api/preview/${id}`);
          if (response.ok) {
            const { card: digiMeCard } = await response.json();
            setCard(digiMeCard);
            if (digiMeCard) {
              setDigiMeCard({
                userId: digiMeCard.userId || "",
                cardTitle: digiMeCard.cardTitle || "",
                cardStyle: digiMeCard.cardStyle || "",
                cardData: {
                  name: digiMeCard.cardData.name || "",
                  image: digiMeCard.cardData.image || "",
                  tagline: digiMeCard.cardData.tagline || "",
                  company: digiMeCard.cardData.company || "",
                  email: digiMeCard.cardData.email || "",
                  phone: digiMeCard.cardData.phone || "",
                  location: digiMeCard.cardData.location || "",
                  website: digiMeCard.cardData.website || "",
                  socialMedia: {
                    linkedin: digiMeCard.cardData.socialMedia.linkedin || "",
                    github: digiMeCard.cardData.socialMedia.github || "",
                    twitter: digiMeCard.cardData.socialMedia.twitter || "",
                    instagram: digiMeCard.cardData.socialMedia.instagram || "",
                    facebook: digiMeCard.cardData.socialMedia.facebook || "",
                    tiktok: digiMeCard.cardData.socialMedia.tiktok || "",
                    youtube: digiMeCard.cardData.socialMedia.youtube || "",
                    twitch: digiMeCard.cardData.socialMedia.twitch || "",
                    discord: digiMeCard.cardData.socialMedia.discord || "",
                  },
                },
              });
              setUrls({
                linkedin:
                  `https://www.linkedin.com/in/${digiMeCard.cardData.socialMedia.linkedin}` ||
                  "",
                github:
                  `https://www.github.com/${digiMeCard.cardData.socialMedia.github}` ||
                  "",
                twitter:
                  `https://x.com/${digiMeCard.cardData.socialMedia.twitter}` ||
                  "",
                instagram:
                  `https://www.instagram.com/${digiMeCard.cardData.socialMedia.instagram}` ||
                  "",
                facebook:
                  `https://www.facebook.com/${digiMeCard.cardData.socialMedia.facebook}` ||
                  "",
                tiktok:
                  `https://www.tiktok.com/@${digiMeCard.cardData.socialMedia.tiktok}` ||
                  "",
                youtube:
                  `https://www.youtube.com/@${digiMeCard.cardData.socialMedia.youtube}` ||
                  "",
                twitch:
                  `https://www.twitch.tv/${digiMeCard.cardData.socialMedia.twitch}` ||
                  "",
                discord:
                  `https://discord.gg/${digiMeCard.cardData.socialMedia.discord}` ||
                  "",
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
              ];
              const filteredData = Object.entries(
                digiMeCard.cardData.socialMedia
              )
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
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-100">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading DigiMe...</h1>
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className="relative h-full pt-8 px-10 bg-gray-100 gap-4">
      <div className="mb-5">
        <PreviewHeader
          headerTitle={"Preview:"}
          cardTitle={card?.cardTitle || ""}
          cardID={card?.id || ""}
          icon={<Eye className="text-white" />}
          isPublished={card?.isPublished || false}
        />
      </div>
      <div className="overflow-hidden rounded-md">
        {digiMeCard.cardStyle === "defaultLight" && (
          <BasicCard
            cardValues={{
              ...digiMeCard,
              socialMedia: JSON.stringify(digiMeCard.cardData.socialMedia),
              urls: JSON.stringify(digiMeCard.cardData.socialMedia),
            }}
            urls={urls}
            showUsername={true}
            selectedInputs={selectedInputs}
            type={digiMeCard.cardStyle}
          />
        )}
        {digiMeCard.cardStyle === "defaultDark" && (
          <>
            <BasicDarkCard
              cardValues={{
                ...digiMeCard,
                socialMedia: JSON.stringify(digiMeCard.cardData.socialMedia),
                urls: JSON.stringify(digiMeCard.cardData.socialMedia),
              }}
              urls={urls}
              showUsername={true}
              selectedInputs={selectedInputs}
              type={digiMeCard.cardStyle}
            />
          </>
        )}
        {digiMeCard.cardStyle === "glassLight" && (
          <GlassLightCard
            cardValues={{
              ...digiMeCard,
              socialMedia: JSON.stringify(digiMeCard.cardData.socialMedia),
              urls: JSON.stringify(digiMeCard.cardData.socialMedia),
            }}
            urls={urls}
            showUsername={true}
            selectedInputs={selectedInputs}
            type={digiMeCard.cardStyle}
          />
        )}
      </div>
    </div>
  );
};

export default PreviewPage;
