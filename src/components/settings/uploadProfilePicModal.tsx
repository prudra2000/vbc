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
import { IdCard, Trash, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { updateCard } from "@/actions/update-card";
import { FileRejection, useDropzone } from "react-dropzone";

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

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type. Please upload a jpg, jpeg, or png image.");
      return;
    }
    if (acceptedFiles.length > 0) {
      setError("");
      const file = acceptedFiles[0];
      form.setValue("image", file); // Set the file to the form
      setFileName(file.name); // Set the file name
      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    form.setValue("image", null); // Reset the form value
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
  });

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
            <DialogDescription>
              Please upload a jpg, jpeg, or png image. Under 5mb.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  image: formData.get("image") as File,
                };
                await handleUploadImage(data);
              }}
              className="space-y-4"
            >
              <div
                {...getRootProps()}
                className={`border-dashed border-2 p-6 rounded-lg transition-colors duration-200 ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-gray-100"
                }`}
              >
                <input {...getInputProps()} />
                <p className="text-center text-gray-600">
                  {isDragActive
                    ? "Drop the files here ..."
                    : "Drag & drop an image here, or click to select one"}
                </p>
              </div>

              {preview && (
                <div className="flex flex-col mt-4 gap-2">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg shadow-md border border-neutral-200"
                  />
                  <div className="flex flex-row justify-between items-center">
                    <p className=" text-neutral-500 text-sm">File Name: {fileName}</p>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleDeleteImage}
                      className="mt-2 text-destructive text-xs py-1 px-3 flex items-center gap-2 border border-destructive"
                    >
                      <Trash className="w-4 h-4" />
                      <p className="hidden md:block">Delete Image</p>
                    </Button>
                  </div>
                </div>
              )}
              <FormError message={error || ""} />
              <FormSuccess message={success || ""} />

              <div className="flex justify-end items-end">
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadProfilePicModal;
