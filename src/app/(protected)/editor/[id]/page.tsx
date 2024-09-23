"use client";
import React, { useEffect, useState, startTransition } from "react";
import EditorForm from "../../../../components/editor/editor-card";
import { Page } from "@/components/card/page-renderer";
import { Card as PCard } from "@prisma/client";
import { useParams } from "next/navigation";
import * as z from "zod";
import { CardSchema, UpdateCardSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { updateCard } from "@/actions/update-card";
import { Button } from "../../../../components/ui/button";

type FormValues = {
  userId: string;
  title: string;
  description: string;
  image: string;
  urls: {
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

// Define UrlKeys type
type UrlKeys = keyof FormValues["urls"];

const EditorPage = () => {
  const { data: session } = useSession();
  const { id } = useParams();
  const cardId = Array.isArray(id) ? id[0] : id;
  const [card, setCard] = useState<PCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [nonEmptyCardData, setnonEmptyCardData] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    userId: "",
    title: "",
    description: "",
    image: "",
    urls: {
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

  const handleFormChange = (newValues: FormValues) => {
    setFormValues(newValues);
    console.log("ne", newValues);
  };

  useEffect(() => {
    const fetchCard = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/editor/${id}`);
          if (response.ok) {
            const cardData = await response.json();
            setCard(cardData);
            setFormValues({
              userId: cardData.userId || "",
              title: cardData.title || "",
              description: cardData.description || "",
              image: cardData.image || "",
              urls: {
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
              },
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

  const handleUpdateData = async (
    formValues1: z.infer<typeof UpdateCardSchema>, cardID: string
  ) => {
    const values = {
      userId: session?.user?.id || "",
      title: formValues.title || "", // Ensure title is provided here
      description: formValues.description || "",
      image: formValues.image || "",
      linkedin: formValues.urls.linkedin || "", // Set to empty string if undefined
      github: formValues.urls.github || "",
      twitter: formValues.urls.twitter || "",
      instagram: formValues.urls.instagram || "",
      facebook: formValues.urls.facebook || "",
      tiktok: formValues.urls.tiktok || "",
      youtube: formValues.urls.youtube || "",
      twitch: formValues.urls.twitch || "",
      discord: formValues.urls.discord || "",
      snapchat: formValues.urls.snapchat || "",
      whatsapp: formValues.urls.whatsapp || "",
      telegram: formValues.urls.telegram || "",
      reddit: formValues.urls.reddit || "",
      pinterest: formValues.urls.pinterest || "",
    };

    startTransition(async () => {
      try {
        const data = await updateCard(values, cardId);
        console.log(data);
      } catch (error) {
        console.error("Error adding card:", error);
        alert("Something went wrong.");
      }
    });
  };

  return (
    <div>
      <div className="flex w-full ">
        <div className="w-1/2">
          <Page formValues={formValues} selectedInputs={selectedInputs} />
        </div>
        <div className="w-1/2">
          <EditorForm
            formValues={formValues}
            onFormChange={handleFormChange}
            selected={selectedInputs} // Pass selectedInputs to EditorForm
            onSelectChange={setSelectedInputs}
          />
          <Button onClick={handleUpdateData}>Save Data</Button>
          <p>{session?.user?.id}</p>
          <p>{formValues.urls.github}</p>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
