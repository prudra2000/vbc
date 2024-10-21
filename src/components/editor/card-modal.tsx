"use client";
import { startTransition, useState } from "react";
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
import { IdCard } from "lucide-react";
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
}

const CardModal: React.FC<CardModalProps> = ({ isOpen, onClose}) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm();
  const handleAddCard = async (data: any) => {
    setError("");
    setSuccess("");
    const starterValues = {
      userId: session?.user?.id || "",
      cardTitle: data.cardTitle || "",
      cardStyle: data.cardStyle || "",
      isPublished: false,
      cardData: {
        name: data.name || "",
        image: data.image || "",
        tagline: data.tagline || "",
        company: data.company || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        website: data.website || "",
        socialMedia: data.socialMedia || {},
      },
    };
    startTransition(async () => {
      const newCard = await addCard(starterValues);
      setError(newCard?.error || "");
      if (newCard) {
        setSuccess(newCard?.success || "");
        onClose();
        window.location.reload();
      }
    });
  };

  return (
    <>
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
              Start by creating a card title and selecting a style.
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
                };
                await handleAddCard(data); // Call handleAddCard with the form data
              }}
              className="space-y-4"
            >
              <div className="space-y-4 text-black">
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
                            <SelectItem value="glassDark">
                              Glass Dark
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error || ""} />
              <FormSuccess message={success || ""} />

              <div className="">
                <Button variant="default" type="submit" className="w-full">
                  Create Card
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CardModal;
