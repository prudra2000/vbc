"use client";
import { startTransition, useEffect, useState } from "react";
import { addCard } from "@/actions/add-card";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { IdCard, X, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ElementDisplay from "./elementDisplay";
import { Button } from "../ui/button";

interface AddElementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  formValues: any;
}

const AddElementsModal: React.FC<AddElementsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formValues,
}) => {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  const handleElementClick = (key: string) => {
    setSelectedElements((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedElements);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="text-black flex items-center justify-between w-full">
            <div className="flex items-center w-full">
              <IdCard className="mr-2" />
              Add Elements
            </div>
          </DialogTitle>
          <DialogDescription>Add elements to your card.</DialogDescription>
        </DialogHeader>
        <section>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-black">
              Personal Information
            </h2>
            {formValues &&
              Object.entries(formValues).map(([key, value]) => (
                <Button
                  key={key}
                  variant="outline"
                  className={`flex items-center gap-2 px-0 w-full ${
                    selectedElements.includes(key) ? "bg-gray-200" : ""
                  }`}
                  onClick={() => handleElementClick(key)}
                >
                  <ElementDisplay key={key} title={key} icon={<User />} />
                </Button>
              ))}
          </div>
          <Button onClick={handleSubmit} className="mt-4">
            Add Selected Elements
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default AddElementsModal;
