"use client";
import React, { useState } from "react";
import EditorForm from "../../../components/editor/editor-card";
import { Page } from "@/components/card/page-renderer";
type FormValues = {
  userId: string;
  title: string;
  description: string;
  image: string;
  linkedin: string;
  github: string;
  twitter: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube: string;
  twitch: string;
  discord: string;
  snapchat: string;
  whatsapp: string;
  telegram: string;
  reddit: string;
  pinterest: string;
};
const EditorPage = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    userId: "",
    title: "",
    description: "",
    image: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    discord: "",
    snapchat: "",
    whatsapp: "",
    telegram: "",
    reddit: "",
    pinterest: "",
  });
  const handleFormChange = (newValues: FormValues) => {
    setFormValues(newValues);
  };
  return (
    <div>
      <div className="flex w-full ">
        <div className="w-1/2">
          <Page formValues={formValues} />
        </div>
        <div className="w-1/2">
          <EditorForm formValues={formValues} onFormChange={handleFormChange} />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
