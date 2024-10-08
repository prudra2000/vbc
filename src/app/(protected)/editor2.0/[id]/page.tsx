"use client";
import React, { useEffect, useState, startTransition } from "react";
import EditorForm from "../../../../components/editor2/editorform";
import { Card as PCard } from "@prisma/client";
import { useParams } from "next/navigation";
import * as z from "zod";
import { UpdateCardSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { updateCard } from "@/actions/update-card";
import { Button } from "../../../../components/ui/button";
import { Save, PencilRuler } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import EditorHeader from "@/components/editor/editorHeader";
import { EditorPreview } from "@/components/editor/editor-preview";
import { GridLoader } from "react-spinners";

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
  };

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await fetch(`/api/editor/${id}`);
          if (response.ok) {
            const { card: cardData } = await response.json();
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
              urls: {
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
            const filteredData = Object.entries(cardData.socialMedia)
              .filter(([key, value]) => keysToRetain.includes(key) && value)
              .map(([key]) => key);
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
      socialMedia: {
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
      },
    };
    console.log("values", formValues);

    startTransition(async () => {
      try {
        const data = await updateCard(values, card?.id || "");
        setSuccess("Card Updated");
        if (data.error) {
          throw new Error(data.error); // Handle error response from updateCard
        }
        // Optionally, you can show a success message here
      } catch (error) {
        console.error("Error updating card:", error); // Log the error
      }
    });
  };

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4 bg-gray-100">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading Editor...</h1>
      </div>
    ); // Replace with your spinner component

  return (
    <div className="h-full pt-8 bg-gray-100">
      <EditorHeader
        headerTitle={"Editor:"}
        cardTitle={card?.cardTitle || ""}
        cardID={card?.id || ""}
        icon={<PencilRuler className="text-white" />}
      />
      <div className="flex flex-col md:flex-row w-full justify-center items-center pt-5 gap-x-5 bg-white">
        <div className="w-full h-1/2 border-2 border-gray-300 rounded-[1rem] overflow-hidden">
          <EditorPreview
            formValues={formValues}
            selectedInputs={selectedInputs}
          />
        </div>
        <div className="w-full sm:w-1/2">
          <EditorForm
            formValues={formValues}
            onFormChange={handleFormChange}
            selected={selectedInputs}
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
                  Save Card
                </Button>
              </div>
            </div>
          </EditorForm>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
