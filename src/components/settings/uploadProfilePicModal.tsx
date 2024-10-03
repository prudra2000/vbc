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

interface UploadProfilePicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  cardID: string;
}

const UploadProfilePicModal: React.FC<UploadProfilePicModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cardID,
}) => {
  const { data: session } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm();

  const handleUploadImage = async (data: any) => {
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
    <div className="w-1/2">
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black flex items-center justify-between w-full">
              <div className="flex items-center w-full">
                <IdCard className="mr-2" />
                Upload Profile Picture
              </div>
            </DialogTitle>
            <DialogDescription>Please upload a jpg, jpeg, or png image. Under 5mb.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  image: formData.get("image") as File, // Ensure you get the file
                };
                await handleUploadImage(data);
              }}
              className="space-y-4"
            >
              <div className="space-y-4 text-black">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Image"
                          type="file"
                          id="image"
                          required
                          accept="image/*"
                          multiple={false} // Ensure only one file can be selected
                          onChange={(e) => {
                            // Handle file selection
                            if (e.target?.files && e.target.files.length > 0) {
                              field.onChange(e.target.files[0]); // Set the file to the field
                            }
                          }}
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

export default UploadProfilePicModal;
