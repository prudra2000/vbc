import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Ensure you import FontAwesomeIcon
import { Input } from "@/components/ui/input"; // Adjust the import path as necessary
import { faGripVertical } from "@fortawesome/free-solid-svg-icons"; // Ensure you import the icon
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
  faTwitch,
  faDiscord,
  faSnapchat,
  faWhatsapp,
  faTelegram,
  faReddit,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
export function SortableItem(props: {
  id: string;
  social: string;
  urls: Record<string, string>;
  setUrls: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const socialIcons = {
    linkedin: faLinkedin,
    github: faGithub,
    twitter: faTwitter,
    instagram: faInstagram,
    facebook: faFacebook,
    tiktok: faTiktok,
    youtube: faYoutube,
    twitch: faTwitch,
    discord: faDiscord,
    snapchat: faSnapchat,
    whatsapp: faWhatsapp,
    telegram: faTelegram,
    reddit: faReddit,
    pinterest: faPinterest,
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    lineHeight: "4",
  };

  return (
    <div ref={setNodeRef}>
      <div className="flex flex-row gap-2 group" style={style}>
        <div
          className="flex items-center gap-2"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
        >
          <FontAwesomeIcon
            icon={faGripVertical}
            className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
          />
          <FontAwesomeIcon
            icon={socialIcons[props.social as keyof typeof socialIcons]} // Ensure props.social is a key of socialIcons
            className="w-4 h-4"
          />
        </div>
        <Input
          placeholder={
            props.social.charAt(0).toUpperCase() + props.social.slice(1)
          }
          value={props.urls?.[props.social] || ""} // Use optional chaining
          onChange={(e) => {
            props.setUrls((prev) => ({
              ...prev,
              [props.social]: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
}
