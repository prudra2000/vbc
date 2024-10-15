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
    linkedin: `https://www.linkedin.com/in/${formValues.socialMedia.linkedin}`,
    github: `https://www.github.com/${formValues.socialMedia.github}`,
    twitter: `https://x.com/${formValues.socialMedia.twitter}`,
    instagram: `https://www.instagram.com/${formValues.socialMedia.instagram}`,
    facebook: `https://www.facebook.com/${formValues.socialMedia.facebook}`,
    tiktok: `https://www.tiktok.com/@${formValues.socialMedia.tiktok}`,
    youtube: `https://www.youtube.com/@${formValues.socialMedia.youtube}`,
    twitch: `https://www.twitch.tv/${formValues.socialMedia.twitch}`,
    discord: `https://discord.gg/${formValues.socialMedia.discord}`,
    snapchat: `https://www.snapchat.com/add/${formValues.socialMedia.snapchat}`,
    whatsapp: `https://api.whatsapp.com/send?phone=${formValues.socialMedia.whatsapp}`,
    telegram: `https://t.me/${formValues.socialMedia.telegram}`,
    reddit: `https://www.reddit.com/user/${formValues.socialMedia.reddit}`,
    pinterest: `https://www.pinterest.com/${formValues.socialMedia.pinterest}`,
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
