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
import { X } from "lucide-react";
import Link from "next/link";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose, onSubmit }) => {
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
      title: data.title,
      description: data.description,
      style: "primary",
    };
    startTransition(async () => {
      const newCard = await addCard(starterValues); // Await the addCard call
      setNewCard(newCard);
      setError(newCard?.error || "");
      setSuccess(newCard?.success || "");
      if (newCard) {
        setCardCreated(true);
        onClose();
        window.location.reload();
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-96 text-black border border-1 border-gray-300 gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Add Card</h2>
          <span
            className="close text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </span>
        </div>
        <hr />
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault(); // Prevent default form submission
              const formData = new FormData(e.currentTarget); // Get form data
              const data = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
              };
              await handleAddCard(data); // Call handleAddCard with the form data
            }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Card Name"
                        type="title"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Description"
                        type="description"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || ""} />
            <FormSuccess message={success || ""} />
            {CardCreated ? (
              <div className="flex text-green-500 justify-end item-end">
                <Link href={`/editor/${newCard?.card?.id}`}>
                  <Button
                    type="button" // Change type to "button" to prevent form submission
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                  >
                    Edit Card
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex text-green-500 justify-end items-end">
                <Button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
                >
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CardModal;
