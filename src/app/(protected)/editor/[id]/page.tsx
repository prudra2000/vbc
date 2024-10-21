"use client";
import React, { useEffect, useState, startTransition } from "react";
import EditorForm from "../../../../components/editor/editor-card";
import { Card as PCard } from "@prisma/client";
import { useParams } from "next/navigation";
import * as z from "zod";
import { DigimedCardSchema } from "@/schemas";
import { useSession } from "next-auth/react";
import { updateCard } from "@/actions/update-card";
import { Button } from "../../../../components/ui/button";
import { Save, PencilRuler } from "lucide-react";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import EditorHeader from "@/components/editor/editorHeader";
import { EditorPreview } from "@/components/editor/editor-preview";
import { GridLoader } from "react-spinners";
import { CardConfig } from "@/types/cardTypes";

type FormValues = {
  userId: string;
  cardTitle: string;
  cardStyle: string;
  cardConfig: CardConfig;
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
  const [formValues, setFormValues] = useState<FormValues>({
    userId: "",
    cardTitle: "",
    cardStyle: "",
    cardConfig: {
      showSocialUsername: true,
    },
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
    },
  });

  const handleFormChange = (newValues: { cardData: FormValues['cardData']; cardConfig: FormValues['cardConfig'] }) => {
    setFormValues((prevValues) => ({
        ...prevValues,
        ...newValues,
    }));
};

  useEffect(() => {
    const fetchCard = async () => {
      setLoading(true);
      if (id) {
        try {
          const response = await fetch(`/api/editor/${id}`);
          if (response.ok) {
            const { card: digiMeCard } = await response.json();
            setCard(digiMeCard);
            setFormValues({
              userId: digiMeCard.userId || "",
              cardTitle: digiMeCard.cardTitle || "",
              cardStyle: digiMeCard.cardStyle || "",
              cardConfig: digiMeCard.cardConfig || {
                showSocialUsername: true,
              },
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
              urls: {
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
            const filteredData = Object.entries(digiMeCard.cardData.socialMedia)
              .filter(([key, value]) => keysToRetain.includes(key) && value)
              .map(([key]) => key);
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
    formValues1: z.infer<typeof DigimedCardSchema>,
    cardID: string,
    e: React.SyntheticEvent
  ) => {
    e.preventDefault();
    const values = {
      userId: session?.user?.id || "",
      cardTitle: formValues.cardTitle || "",
      cardStyle: formValues.cardStyle || "",
      cardConfig: {
        showSocialUsername: formValues.cardConfig?.showSocialUsername ?? true,
      },
      cardData: {
        name: formValues.cardData.name || "",
        image: formValues.cardData.image || "",
        tagline: formValues.cardData.tagline || "",
        company: formValues.cardData.company || "",
        email: formValues.cardData.email || "",
        phone: formValues.cardData.phone || "",
        location: formValues.cardData.location || "",
        website: formValues.cardData.website || "",
        socialMedia: {
          linkedin: formValues.cardData.socialMedia.linkedin || "",
          github: formValues.cardData.socialMedia.github || "",
          twitter: formValues.cardData.socialMedia.twitter || "",
          instagram: formValues.cardData.socialMedia.instagram || "",
          facebook: formValues.cardData.socialMedia.facebook || "",
          tiktok: formValues.cardData.socialMedia.tiktok || "",
          youtube: formValues.cardData.socialMedia.youtube || "",
          twitch: formValues.cardData.socialMedia.twitch || "",
          discord: formValues.cardData.socialMedia.discord || "",
        },
      },
    };

    startTransition(async () => {
      try {
        const data = await updateCard(values, card?.id || "");
        setSuccess("Card Updated");
        if (data.error) {
          throw new Error(data.error);
        }
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
    <div className="h-full  bg-gray-100">
      <EditorHeader
        headerTitle={"Editor:"}
        cardTitle={card?.cardTitle || ""}
        cardID={card?.id || ""}
        icon={<PencilRuler className="text-black w-5 h-5" />}
        isPublished={card?.isPublished || false}
      />
      <div className="flex flex-col md:flex-row w-full justify-center items-center">
        <div className="w-full px-5 py-5 sm:py-0">
          <div className="h-1/2 rounded-[1rem] overflow-hidden">
            <EditorPreview
              formValues={formValues}
              selectedInputs={selectedInputs}
            />
          </div>
        </div>
        <div className="w-full sm:w-1/2 border-t-2 sm:border-t-0 sm:border-l-2 sm:border-neutral-200 bg-white">
          <EditorForm
            formValues={formValues}
            onFormChange={handleFormChange}
            selected={selectedInputs}
            onSelectChange={setSelectedInputs}
          >
            <div className="flex flex-col gap-2">
              <FormSuccess message={success || ""} />
              <FormError message={error || ""} />
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
