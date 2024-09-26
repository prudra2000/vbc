import React from "react";
import PreviewCard from "../card/preview-card";

interface EditorPreviewProps {
  formValues: {
    cardTitle: string;
    cardStyle: string;
    name: string;
    image: string;
    tagline: string;
    company: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    socialMedia: {
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
  selectedInputs: string[];
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  formValues,
  selectedInputs,
}) => {
  const showUsername = true;
  const urls = {
    linkedin: formValues.socialMedia.linkedin,
    github: formValues.socialMedia.github,
    twitter: formValues.socialMedia.twitter,
    instagram: formValues.socialMedia.instagram,
    facebook: formValues.socialMedia.facebook,
    tiktok: formValues.socialMedia.tiktok,
    youtube: formValues.socialMedia.youtube,
    twitch: formValues.socialMedia.twitch,
    discord: formValues.socialMedia.discord,
    snapchat: formValues.socialMedia.snapchat,
    whatsapp: formValues.socialMedia.whatsapp,
    telegram: formValues.socialMedia.telegram,
    reddit: formValues.socialMedia.reddit,
    pinterest: formValues.socialMedia.pinterest,
  };
  return (
    <div className="">
      <PreviewCard
        cardValues={{ ...formValues, socialMedia: JSON.stringify(formValues.socialMedia) }}
        name={formValues?.cardTitle || ""}
        email={formValues?.email || ""}
        image={formValues?.image || ""}
        urls={urls}
        showUsername={false}
        selectedInputs={selectedInputs}
        type="primary"
        className="outline outline-1 outline-white/10"
      />
    </div>
  );
};
