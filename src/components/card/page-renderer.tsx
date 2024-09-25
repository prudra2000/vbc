import React from "react";
import Card from "./card";

interface PageProps {
  formValues: {
    title: string;
    description: string;
    image: string;
    urls: {
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
  };
  style?: string;
  selectedInputs: string[];
}

export const Page: React.FC<PageProps> = ({
  style,
  formValues,
  selectedInputs,
}) => {
  const showUsername = true;
  const urls = {
    linkedin: formValues.urls.linkedin,
    github: formValues.urls.github,
    twitter: formValues.urls.twitter,
    instagram: formValues.urls.instagram,
    facebook: formValues.urls.facebook,
    tiktok: formValues.urls.tiktok,
    youtube: formValues.urls.youtube,
    twitch: formValues.urls.twitch,
    discord: formValues.urls.discord,
    snapchat: formValues.urls.snapchat,
    whatsapp: formValues.urls.whatsapp,
    telegram: formValues.urls.telegram,
    reddit: formValues.urls.reddit,
    pinterest: formValues.urls.pinterest,
  };
  return (
    <div className="w-full h-full">
      <Card
        name={formValues?.title || ""}
        email={formValues?.description || ""}
        image={formValues?.image || ""}
        urls={urls} // Fix: use the correct state variable
        showUsername={false}
        selectedInputs={selectedInputs}
        type="primary"
        className="outline outline-1 outline-white/10"
      />
    </div>
  );
};
