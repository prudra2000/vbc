import React from "react";
import PreviewCard from "../card/preview-card";
import BasicCard from "../card-components/default-light";
import BasicDarkCard from "../card-components/default-dark";
import GlassLightCard from "../card-components/glass-light";

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
     {formValues.cardStyle === "defaultLight" && (
        <BasicCard
          cardValues={{
            ...formValues,
            socialMedia: JSON.stringify(formValues.socialMedia),
            urls: JSON.stringify(formValues.socialMedia),
          }}
          urls={urls}
          showUsername={true}
          selectedInputs={selectedInputs}
          type={formValues.cardStyle}
        />
      )}
      {formValues.cardStyle === "defaultDark" && (
        <>
          <BasicDarkCard
            cardValues={{
              ...formValues,
              socialMedia: JSON.stringify(formValues.socialMedia),
              urls: JSON.stringify(formValues.socialMedia),
            }}
            urls={urls}
            showUsername={true}
            selectedInputs={selectedInputs}
            type={formValues.cardStyle}
          />
        </>
      )}
      {formValues.cardStyle === "glassLight" && (
        <GlassLightCard
          cardValues={{
            ...formValues,
            socialMedia: JSON.stringify(formValues.socialMedia),
            urls: JSON.stringify(formValues.socialMedia),
          }}
          urls={urls}
          showUsername={true}
          selectedInputs={selectedInputs}
          type={formValues.cardStyle}
        />
      )}
    </div>
  );
};
