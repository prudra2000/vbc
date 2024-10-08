import React, { useState } from "react";
import { Button } from "../ui/button";
import { Pencil, Fullscreen, Send, PencilRuler, Share, Share2 } from "lucide-react";

import Link from "next/link";
import EditCardNameModal from "../editor/editCardNameModal";
import PreviewCardModal from "../editor/previewCard";
import PublishCardModal from "../editor/publishCard";
import ShareModal from "../card/card-qr-modal";

interface PreviewHeaderProps {
  headerTitle: string;
  cardTitle: string;
  cardID: string;
  icon?: React.ReactNode;
  isPublished: boolean;
}

const PreviewHeader: React.FC<PreviewHeaderProps> = ({
  headerTitle,
  cardTitle,
  cardID,
  icon,
  isPublished,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <EditCardNameModal
          cardID={cardID}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => Promise.resolve()}
        />
      )}
      {isPreviewModalOpen && (
        <PreviewCardModal
          cardID={cardID}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
          onSubmit={() => Promise.resolve()}
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
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          cardId={cardID}
        />
      )}
      <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-5 rounded-md shadow-md">
        <div className="flex items-center gap-2 text-white justify-center ">
          <div>{icon}</div>
          <div className="flex flex-row justify-center items-center">
            <h1 className="text-lg sm:text-2xl font-semibold">{headerTitle}</h1>

            <div
              className="relative group bg-white/10 hover:bg-white/20 rounded-md px-2 ml-1 py-1"
              onClick={() => setIsModalOpen(true)}
            >
              <h1 className="text-xs sm:text-2xl font-semibold text-white underline decoration-2 underline-offset-[3px] ">
                {cardTitle}
              </h1>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md p-1">
                {/* Replace with your edit icon component */}
                <Pencil className=" w-4 h-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/editor/${cardID}`}>
            <Button
              className="flex items-center gap-2 text-black"
              variant="header"
          >
            <PencilRuler className="w-4 h-4" />
              <p className="text-sm hidden md:block">Edit</p>
            </Button>
          </Link>
          {isPublished && (
          <Button
            className="flex items-center gap-2 text-black"
            onClick={() => setIsPublishModalOpen(true)}
            variant="header"
          >
            <Send className="w-4 h-4 text-destructive" />
            <p className="text-sm hidden md:block">Unpublish</p>
          </Button>
          
          )}
          {isPublished && (
          <Button
            className="flex items-center gap-2 text-black"
            onClick={() => setIsShareModalOpen(true)}
            variant="header"
          >
            <Share2 className="w-4 h-4" />
            <p className="text-sm hidden md:block">Share</p>
          </Button>
          
          )}
          {!isPublished && (
            <Button
              className="flex items-center gap-2 text-black"
              onClick={() => setIsPublishModalOpen(true)}
              variant="header"
            >
              <Send className="w-4 h-4 text-green-500" />
              <p className="text-sm hidden md:block">Publish</p>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewHeader;
