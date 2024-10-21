"use client";
import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { editCardName } from "@/actions/edit-name";
import { useSession } from "next-auth/react";
interface EditCardNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardID: string;
}

const EditCardNameModal: React.FC<EditCardNameModalProps> = ({
  isOpen,
  onClose,
  cardID,
}) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm();

  const handleUpdateCard = async (data: any) => {
    setError("");
    setSuccess("");
    const starterValues = {
      userId: session?.user?.id || "", // Include userId
      cardTitle: data.cardTitle,
      cardData: {}, // Include cardData (can be empty or existing data)
    };
    startTransition(async () => {
      const result = await editCardName(cardID, starterValues);
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
    <div className="w-1/2">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black flex items-center justify-between w-full">
              <div className="flex items-center w-full">
                <IdCard className="mr-2" />
                Update Card Name
              </div>
            </DialogTitle>
            <DialogDescription>Update the name of your card.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget); // Get form data
                const data = {
                  cardTitle: formData.get("cardTitle") as string,
                };
                await handleUpdateCard(data); // Call handleAddCard with the form data
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
              </div>
              <FormError message={error || ""} />
              <FormSuccess message={success || ""} />

              <div className="flex justify-end items-end">
                <Button
                  variant="outline"
                  type="submit"
                  className="rounded p-2 border-blue-800 text-blue-800"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditCardNameModal;
