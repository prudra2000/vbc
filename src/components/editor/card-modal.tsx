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
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  const [currentStep, setCurrentStep] = useState(0); // Add state for current step

  const handleAddCard = async (data: any) => {
    console.log("data", data);
    setError("");
    setSuccess("");
    const starterValues = {
      userId: session?.user?.id || "",
      cardTitle: data.cardTitle,
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

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-black flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <IdCard className="mr-2" />
              Add Card
            </div>
          </DialogTitle>
          <DialogDescription>
            {currentStep === 0 && "Start by creating a card title and selecting a style."}
            {currentStep === 1 && "Review your card details."}
            {/* Add more descriptions for additional steps if needed */}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget); // Get form data
              const data = {
                cardTitle: formData.get("cardTitle") as string,
                cardStyle: formData.get("cardStyle") as string,
              };// Call handleAddCard with the form data
            }}
            className="space-y-4"
          >
            {currentStep === 0 && (
              <div className="space-y-4 text-black">
                {/* Step 1: Card Details */}
                <FormField
                  control={form.control}
                  name="cardTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Card Title"
                          type="title"
                          required
                          autoComplete="off"
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
                        <Select {...field} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="defaultLight">
                              Default Light
                            </SelectItem>
                            <SelectItem value="defaultDark">
                              Default Dark
                            </SelectItem>
                            <SelectItem value="glassLight">
                              Glass Light
                            </SelectItem>
                            <SelectItem value="glassDark">Glass Dark</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4 text-black">
                <p>Review your card details here...</p>
                
              </div>
            )}
            {/* Add more steps as needed */}
            <FormError message={error || ""} />
            <FormSuccess message={success || ""} />
            <div className="flex justify-between items-end">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={handlePreviousStep}
                  className="rounded p-2 border-blue-800 text-blue-800"
                >
                  Previous
                </Button>
              )}
              {currentStep < 1 ? ( // Adjust the condition based on the number of steps
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleNextStep}
                  className="rounded p-2 border-blue-800 text-blue-800"
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="outline"
                  type="submit"
                  className="rounded p-2 border-blue-800 text-blue-800"
                  onClick={() => handleAddCard(form.getValues())}
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CardModal;
