"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { IdCard, Trash, ImageUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileRejection, useDropzone } from "react-dropzone";

interface UploadProfilePicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadProfilePicModal: React.FC<UploadProfilePicModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm();

  const { data: session, update } = useSession();


  const handleSessionRefresh = async (profileImageURL: string) => {
    try {
      const updatedSession = await update({
        ...session,
        user: {
          ...session?.user,
          image: profileImageURL,
        },
      });
  
      if (updatedSession) {
        console.log("Session refreshed");
      } else {
        console.warn("No session data available after refresh.");
      }
    } catch (error) {
      console.error("Error refreshing session:", error);
      alert("Failed to update session.");
    }
  };


  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const onDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      setError("Invalid file type. Please upload a jpg, jpeg, or png image.");
      return;
    }
    if (acceptedFiles.length > 0) {
      setError("");
      const file = acceptedFiles[0];
      form.setValue("image", file);
      setFile(file);
      setFileName(file.name);
      setFileSize(`${(file.size / 1000000).toFixed(2)} mb`);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    setFile(null);
    form.setValue("image", null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/jpg": [] },
    maxFiles: 1,
  });

  const handleUploadImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/s3-upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(`File uploaded successfully: ${result.fileName}`);
        await handleSessionRefresh(result.profileImageURL);
        onClose();
      } else {
        setError(`Error: ${result.error || 'Failed to upload file'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file');
    }
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
            <DialogDescription>
              Please upload a jpg, jpeg, or png image. Under 5mb.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleUploadImage(e);
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
                    <div className="flex flex-col">
                      <p className=" text-neutral-500 text-sm">File Name: {fileName}</p>
                      <p className=" text-neutral-500 text-sm">File Size: {fileSize}</p>
                    </div>
                    
                    <Button
                      variant="outline"
                      type="button"
                      onClick={handleDeleteImage}
                      className="mt-2 text-destructive text-xs py-1 px-3 flex items-center gap-2 border border-destructive hover:text-destructive"
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
                <Button type="submit">
                  <ImageUp className="mr-2 w-5 h-5" />
                  Upload
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
