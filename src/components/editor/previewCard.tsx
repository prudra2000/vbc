"use client";
import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addCard } from "@/actions/add-card";
import { useSession } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { IdCard, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { updateCard } from "@/actions/update-card";

interface PreviewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  cardID: string;
}

const PreviewCardModal: React.FC<PreviewCardModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cardID,
}) => {
  const { data: session } = useSession();
  const [CardCreated, setCardCreated] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm();
  const [newCard, setNewCard] = useState<any>(null); // Add state for newCard

  const handleAddCard = async (data: any) => {
    setError("");
    setSuccess("");
    const starterValues = {
      userId: session?.user?.id || "",
      cardTitle: data.cardTitle,
    };
    startTransition(async () => {
      const result = await updateCard(starterValues, cardID);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(result.success);
        onClose();
        window.location.reload();
      }
    });
  };

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black flex items-center justify-between w-full">
              <div className="flex items-center w-full">
                <IdCard className="mr-2" />
                Preview Card
              </div>
            </DialogTitle>
            <DialogDescription>
              Preview your card before publishing.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full h-full">
            <iframe
              src={`http://localhost:3000/card/${cardID}`}
              width="100%"
              height="100%"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewCardModal;
