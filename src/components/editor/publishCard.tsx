"use client";
import { startTransition, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Copy, IdCard, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { publishCard } from "@/actions/publishCard";
import { unpublishCard } from "@/actions/unpublishCard";

interface PublishCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardID: string;
  isPublished: boolean;
}

const PublishCardModal: React.FC<PublishCardModalProps> = ({
  isOpen,
  onClose,
  cardID,
  isPublished,
}) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  

  const handlePublishCard = async () => {
    setError("");
    setSuccess("");
    const publishValues = {
      userId: session?.user?.id || "",
    };
    startTransition(async () => {
      const result = await publishCard(publishValues.userId, cardID);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        onClose();
        window.location.reload();
      }
    });
  };

  const handleUnpublishCard = async () => {
    setError("");
    setSuccess("");
    const unpublishValues = {
      userId: session?.user?.id || "",
    };
    startTransition(async () => {
      const result = await unpublishCard(unpublishValues.userId, cardID);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        onClose();
        window.location.reload();
      }
    }); 
  };
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  };
  const cardId = cardID; // Ensure cardId is defined or use cardID directly
  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black flex items-center justify-between w-full">
              <div className="flex items-center w-full">
                <IdCard className="mr-2" />
                {isPublished ? "Unpublish Card" : "Publish Card"}
              </div>
            </DialogTitle>
            <DialogDescription>
              {isPublished ? "Your card is currently published. Click to unpublish." : "Your card is currently unpublished. Click to publish."}
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full flex flex-col gap-2">
            {isPublished ? (
              <Button onClick={handleUnpublishCard} className="w-full">Unpublish Card</Button>
            ) : (
              <Button onClick={handlePublishCard} className="w-full">Publish Card</Button>
            )}
            {isPublished && (
            <div className="flex gap-2 justify-center items-center">
              <Input
                value={`http://localhost:3000/card/${cardId}`} // Use cardId or cardID as needed
                readOnly
                ref={inputRef}
                className="text-black border-gray-800 border"
              />
              <Button onClick={handleCopy}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PublishCardModal;