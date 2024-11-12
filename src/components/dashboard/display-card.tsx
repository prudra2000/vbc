import React from "react";
import PreviewCard from "../card/preview-card";
import Link from "next/link";
import { Eye } from "lucide-react";
import { CardData } from "@/types/cardTypes";
interface DisplayCardProps {
  dateUpdated?: string;
  cardID: string;
  cardTitle: string;
  children: React.ReactNode;
  formValues?: {cardData: CardData};
  isPublished: boolean;
}

const DisplayCard: React.FC<DisplayCardProps> = ({
  dateUpdated,
  cardID,
  cardTitle,
  children,
  formValues,
  isPublished,
}) => {
  return (
    <div
      className={`bg-white w-full shadow-md border border-1 border-gray-300 rounded-lg overflow-hidden text-black p-4`}
    >
      <div className="relative group">
        <Link href={`${isPublished ? `/card/${cardID}` : `/preview/${cardID}`}`}>
          <PreviewCard
            type="dashboard"
            cardValues={formValues ? { cardData: formValues.cardData } : undefined}
          />
          
          <div className="absolute bottom-0 left-1/2 w-full transform -translate-x-1/2 opacity-0 bg-white/10 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex justify-center items-center gap-2 p-3">
              <p className="text-white text-sm">{isPublished ? "View Public Link" : "Preview"}</p>
              <Eye className="w-4 h-4 stroke-white" />
            </div>
          </div>
        </Link>
      </div>

      <div className="flex justify-between text-black">
        <div className="flex flex-col gap-1 mt-2">
          <h1 className="text-xl font-bold">{cardTitle}</h1>
          <div className="flex flex-row w-max px-3 py-1 justify-start items-end rounded-lg text-sm bg-gray-100 text-black">
            <p className="text-xs text-gray-500 truncate ">
              Date Updated: {dateUpdated}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-2">{children}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
