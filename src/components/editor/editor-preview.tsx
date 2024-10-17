import React from "react";
import PreviewCard from "../card/preview-card";
import BasicCard from "../card-components/default-light";
import BasicDarkCard from "../card-components/default-dark";
import GlassLightCard from "../card-components/glass-light";

interface EditorPreviewProps {
  formValues: {
    cardTitle: string;
    cardStyle: string;
    cardData: {
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
      };
    };
  };
  selectedInputs: string[];
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  formValues,
  selectedInputs,
}) => {
  const showUsername = true;
  const links = {
    linkedin: `https://www.linkedin.com/in/${formValues.cardData.socialMedia.linkedin}`,
    github: `https://www.github.com/${formValues.cardData.socialMedia.github}`,
    twitter: `https://x.com/${formValues.cardData.socialMedia.twitter}`,
    instagram: `https://www.instagram.com/${formValues.cardData.socialMedia.instagram}`,
    facebook: `https://www.facebook.com/${formValues.cardData.socialMedia.facebook}`,
    tiktok: `https://www.tiktok.com/@${formValues.cardData.socialMedia.tiktok}`,
    youtube: `https://www.youtube.com/@${formValues.cardData.socialMedia.youtube}`,
    twitch: `https://www.twitch.tv/${formValues.cardData.socialMedia.twitch}`,
    discord: `https://discord.gg/${formValues.cardData.socialMedia.discord}`,
  };
  return (
    <div className="">
      {formValues.cardStyle === "defaultLight" && (
        <BasicCard
          cardValues={{
            ...formValues,
            socialMedia: JSON.stringify(formValues.cardData.socialMedia),
            urls: JSON.stringify(links),
          }}
          urls={links}
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
              socialMedia: JSON.stringify(formValues.cardData.socialMedia),
              urls: JSON.stringify(links),
            }}
            urls={links}
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
            socialMedia: JSON.stringify(formValues.cardData.socialMedia),
            urls: JSON.stringify(links),
          }}
          urls={links}
          showUsername={true}
          selectedInputs={selectedInputs}
          type={formValues.cardStyle}
        />
      )}
    </div>
  );
};
