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
import { Save, ExternalLink, PencilRuler } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";
import Header from "@/components/header";
import { EditorPreview } from "@/components/editor/editor-preview";

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
            console.log("cardData", cardData)
            setCard(cardData);
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
      cardTitle: formValues.cardTitle || "",
      cardStyle: formValues.cardStyle || "",
      name: formValues.name || "",
      image: formValues.image || "",
      tagline: formValues.tagline || "",
      company: formValues.company || "",
      email: formValues.email || "",
      phone: formValues.phone || "",
      location: formValues.location || "",
      website: formValues.website || "",
      style: formValues.image || "",
      linkedin: formValues.socialMedia.linkedin || "",
      github: formValues.socialMedia.github || "",
      twitter: formValues.socialMedia.twitter || "",
      instagram: formValues.socialMedia.instagram || "",
      facebook: formValues.socialMedia.facebook || "",
      tiktok: formValues.socialMedia.tiktok || "",
      youtube: formValues.socialMedia.youtube || "",
      twitch: formValues.socialMedia.twitch || "",
      discord: formValues.socialMedia.discord || "",
      snapchat: formValues.socialMedia.snapchat || "",
      whatsapp: formValues.socialMedia.whatsapp || "",
      telegram: formValues.socialMedia.telegram || "",
      reddit: formValues.socialMedia.reddit || "",
      pinterest: formValues.socialMedia.pinterest || "",
    };

    startTransition(async () => {
      try {
        const data = await updateCard(values, card?.id || "");
        setSuccess("Card Updated");
        console.log("test",data);
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
    <div className="h-full pt-8 px-10 bg-gray-100">
      <Header headerTitle={"Editor: " + card?.cardTitle}  icon={<PencilRuler className="stroke-blue-800"/>} />
      <div className="flex flex-col sm:flex-row w-full justify-center items-center pt-5 gap-2">
        <div className="w-full h-1/2">
         <EditorPreview formValues={formValues} selectedInputs={selectedInputs} /> 
          
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
                <Link href={`http://localhost:3000/card/${cardId}`} target="_blank" rel="noopener noreferrer">
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
