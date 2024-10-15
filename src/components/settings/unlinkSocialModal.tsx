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
import { IdCard, X } from "lucide-react";
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
  social: string;
  button: React.ReactNode;
}

const UnlinkSocialModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  social,
  button,
}) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle className="text-black flex items-center justify-between w-full">
              <div className="flex items-center w-full">
                <IdCard className="mr-2" />
                Unlink {social}
              </div>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to unlink this social?
            </DialogDescription>
          </DialogHeader>
          {button}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UnlinkSocialModal;
