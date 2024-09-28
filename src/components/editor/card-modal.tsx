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
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

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
      cardTitle: data.title,
      name: data.description,
      cardStyle: data.cardStyle,
    };
    startTransition(async () => {
      const newCard = await addCard(starterValues);
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
      <div
        className={`flex flex-col bg-white rounded-lg shadow-lg p-6 w-96 text-black border border-1 border-gray-300 gap-4 modal-enter`}
      >
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
                name: formData.get("name") as string,
                cardStyle: formData.get("cardStyle") as string,
                description: formData.get("name") as string, // Changed to 'description' for clarity
              };
              await handleAddCard(data); // Call handleAddCard with the form data
            }}
            className="space-y-4"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
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
                name="cardStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Style</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="danger">Danger</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="cardStyle" // Ensure this matches the name used in starterValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Style</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="danger">Danger</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="name" // Ensure this matches the name used in starterValues
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Card Name"
                        required // This should be required
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
                    className="rounded p-2 border border-1 border-blue-800 text-blue-800"
                  >
                    Edit Card
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex justify-end items-end">
                <Button
                  variant="outline"
                  type="submit"
                  className="rounded p-2 border-blue-800 text-blue-800"
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
