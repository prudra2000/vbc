"use client";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import React from "react";
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
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialInputs: React.FC<{
  selectedInputs: string[];
  urls: Record<string, string>;
  setUrls: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setSelectedInputs: React.Dispatch<React.SetStateAction<string[]>>;
  removeInput: (social: string) => void;
}> = ({ selectedInputs, urls, setUrls, setSelectedInputs, removeInput  }) => {
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

  return (
    <div>
      {selectedInputs.map((social) => (
        <div key={social} className="flex flex-row gap-2 group">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={socialIcons[social as keyof typeof socialIcons]} // Ensure social is a key of socialIcons
              className="w-4 h-4"
            />
          </div>
          <Input
            placeholder={social.charAt(0).toUpperCase() + social.slice(1)}
            value={urls?.[social] || ""} // Use optional chaining
            onChange={(e) => {
              setUrls((prev) => ({
                ...prev,
                [social]: e.target.value,
              }));
            }}
          />
          <button
            type="button"
            onClick={() => removeInput(social)} // Call removeInput on click
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SocialInputs;
