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
import { Save, ExternalLink } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";

type FormValues = {
  userId: string;
  title: string;
  description: string;
  image: string;
  style: string;
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
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [nonEmptyCardData, setnonEmptyCardData] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    userId: "",
    title: "",
    description: "",
    image: "",
    style: "",
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
            const { card: cardData } = await response.json();
            setCard(cardData);
            setFormValues({
              userId: cardData.userId || "",
              title: cardData.title || "",
              description: cardData.description || "",
              image: cardData.image || "",
              style: cardData.style || "",
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

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleUpdateData = async (
    formValues1: z.infer<typeof UpdateCardSchema>,
    cardID: string,
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();
    const values = {
      userId: session?.user?.id || "",
      title: formValues.title || "",
      description: formValues.description || "",
      image: formValues.image || "",
      style: formValues.image || "",
      linkedin: formValues.urls.linkedin || "",
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
        setSuccess("Card Updated");
        console.log(data);
        if (data.error) {
          throw new Error(data.error); // Handle error response from updateCard
        }
        // Optionally, you can show a success message here
      } catch (error) {
        console.error("Error updating card:", error); // Log the error
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row w-full gap-5 justify-center items-center">
        <div className="w-full sm:w-1/2">
          <Page formValues={formValues} selectedInputs={selectedInputs} />
        </div>
        <div className="w-full sm:w-1/2">
          <EditorForm
            formValues={formValues}
            onFormChange={handleFormChange}
            selected={selectedInputs} // Pass selectedInputs to EditorForm
            onSelectChange={setSelectedInputs}
          >
            <div className="flex flex-col gap-2">
              <FormSuccess message={success || ""} />
              <FormError message={""} />
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={(e) => handleUpdateData(formValues, cardId, e)}
                  className="w-full gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Data
                </Button>
                <Link href={`/card/${id}`}>
                  <Button className="w-full gap-2">
                    <ExternalLink className="w-5 h-5" />
                    View Card
                  </Button>
                </Link>
              </div>
            </div>
          </EditorForm>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
