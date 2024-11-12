import { CardStyleProvider } from "../CardStyleProvider";
import { MapPin, Mail, Phone, Link } from "lucide-react";
import { Button } from "../ui/button";

import { CardData, defaultCardData } from "@/types/cardTypes";

interface PreviewCardProps {
  cardValues?: {cardData: CardData};
  type: "primary" | "secondary" | "success" | "danger" | "dashboard";
}

export default function PreviewCard({

  cardValues = {cardData: defaultCardData},
  type,
}: PreviewCardProps) {
  return (
    <CardStyleProvider type={type}>
      <div className={`previewCard ${type}`}>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-y-10 md:gap-x-10 md:flex-row">
            {cardValues.cardData?.name !== "" && cardValues.cardData?.tagline !== "" ? (
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex flex-col items-center md:items-start">
                  <h1 className="text-3xl font-bold ">{cardValues.cardData?.name}</h1>
                  {cardValues.cardData?.tagline && (
                    <p className="text-base text-gray-500">
                      {cardValues.cardData?.tagline}
                    </p>
                  )}
                  {cardValues.cardData?.company && (
                    <p className="text-base text-gray-500">
                      {cardValues.cardData?.company}
                    </p>
                  )}
                </div>
                <hr />
                <div className="flex flex-col items-center md:items-start gap-2">
                  {cardValues.cardData?.phone && (
                    <div className="flex justify-center items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${cardValues.cardData?.phone}`} className="text-sm">
                        {cardValues.cardData?.phone}
                      </a>
                    </div>
                  )}
                  {cardValues.cardData?.email && (
                    <div className="flex justify-center items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <a
                        href={`mailto:${cardValues.cardData?.email}`}
                        className="p-0 text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="link"
                          size="none"
                          className="p-0 text-white"
                        >
                          {cardValues.cardData?.email}
                        </Button>
                      </a>
                    </div>
                  )}
                  {cardValues.cardData?.website && (
                    <div className="flex justify-center items-center gap-2">
                      <Link className="w-4 h-4" />
                      <a
                        href={cardValues.cardData?.website}
                        className="p-0 text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="link"
                          size="none"
                          className="p-0 text-white "
                        >
                          {cardValues.cardData?.website}
                        </Button>
                      </a>
                    </div>
                  )}
                  {cardValues.cardData?.location && (
                    <div className="flex justify-center items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${cardValues.cardData?.location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-words"
                      >
                        <p className="break-words underline-offset-4 hover:underline text-sm">
                          {cardValues.cardData?.location}
                        </p>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <svg
                  viewBox="0 0 216 128"
                  width="50%"
                  height="50%"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="6"
                    y="6"
                    width="204"
                    height="116"
                    rx="18"
                    stroke="#6b7280"
                    strokeWidth="11"
                  />
                  <circle
                    cx="62.5"
                    cy="50.5"
                    r="17"
                    stroke="#6b7280"
                    strokeWidth="11"
                  />
                  <path
                    d="M34 100V96C34 80.536 46.536 68 62 68V68V68C77.464 68 90 80.536 90 96V100"
                    stroke="#6b7280"
                    strokeWidth="11"
                  />
                  <rect
                    x="116"
                    y="41"
                    width="75"
                    height="12"
                    rx="6"
                    fill="#6b7280"
                  />
                  <rect
                    x="116"
                    y="58"
                    width="58"
                    height="12"
                    rx="6"
                    fill="#6b7280"
                  />
                  <rect
                    x="116"
                    y="75"
                    width="41"
                    height="12"
                    rx="6"
                    fill="#6b7280"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardStyleProvider>
  );
}
