import React, { useState } from "react";
import { Button } from "../ui/button";
import EditCardNameModal from "./editCardNameModal";
import { Pencil, Send, Share2, Eye } from "lucide-react";
import PublishCardModal from "./publishCard";
import Link from "next/link";
import ShareModal from "../card/card-qr-modal";
interface EditorHeaderProps {
  headerTitle: string;
  cardTitle: string;
  cardID: string;
  icon?: React.ReactNode;
  isPublished: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  headerTitle,
  cardTitle,
  cardID,
  icon,
  isPublished,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <EditCardNameModal
          cardID={cardID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {isPublishModalOpen && (
        <PublishCardModal
          cardID={cardID}
          isOpen={isPublishModalOpen}
          onClose={() => setIsPublishModalOpen(false)}
          isPublished={isPublished}
        />
      )}
      {isShareModalOpen && (
        <ShareModal
          cardId={cardID}
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}
      <div className="flex flex-row justify-between items-center bg-white py-2 px-5 border-b-2 border-neutral-200">
        <div className="flex items-center gap-2 justify-center text-black">
          <div>{icon}</div>
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-sm font-[600] hidden sm:block">{headerTitle}</h1>

            <div
              className="relative group bg-neutral-100 hover:bg-neutral-200 transition-colors rounded-md px-2 ml-1 py-1"
              onClick={() => setIsModalOpen(true)}
            >
              <h1 className="text-sm font-[600] text-black underline decoration underline-offset-[2px] ">
                {cardTitle}
              </h1>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md p-1">
                {/* Replace with your edit icon component */}
                <Pencil className=" w-3 h-3 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/preview/${cardID}`}>
            <Button className="flex items-center gap-2 text-black" variant="header" size="sm">
              <Eye className="w-4 h-4" />
              <p className="text-xs hidden md:block">Preview</p>
            </Button>
          </Link>
          {isPublished && (
            <Button
              className="flex items-center gap-2 text-black"
              variant="header"
              onClick={() => setIsPublishModalOpen(true)}
              size="sm"
            >
              <Send className="w-4 h-4 text-destructive" />
              <p className="text-xs hidden md:block">
                Unpublish
              </p>
            </Button>
          )}
          {isPublished && (
            <Button
              className="flex items-center gap-2  text-black"
              variant="header"
              onClick={() => setIsShareModalOpen(true)}
              size="sm"
            >
              <Share2 className="w-4 h-4" />
              <p className="text-xs hidden md:block">Share</p>
            </Button>
          )}
          {!isPublished && (
            <Button
              className="flex items-center gap-2 text-black"
              variant="header"
              onClick={() => setIsPublishModalOpen(true)}
              size="sm"
            >
              <Send className="w-4 h-4 text-green-600" />
              <p className="text-xs hidden md:block text-green-600">Publish</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default EditorHeader;
