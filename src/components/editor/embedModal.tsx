"use client";
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
import { IdCard, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import EmbedCardCode from "@/components/card/embedCardCode";
interface EmbedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  cardID: string;
}

const EmbedModal: React.FC<EmbedModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cardID,
}) => {

  const form = useForm();


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col justify-start">
          <DialogTitle className="text-black flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <IdCard className="mr-2" />
              Embed Card
            </div>
          </DialogTitle>
          <DialogDescription>Embed your card.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget); // Get form data
              const data = {
                cardTitle: formData.get("cardTitle") as string,
              };// Call handleAddCard with the form data
            }}
            className="space-y-4"
          >
            <div className="space-y-4 text-black w-min">
              <FormField
                control={form.control}
                name="cardTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Title</FormLabel>
                    <FormControl>
                        <div className="w-full">
                            <EmbedCardCode githubFileUrl={""} githubLink={""} />
                        </div>
                     
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
  );
};

export default EmbedModal;
