"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
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

const regexPatterns = {
  linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/([^\/]+)\/?/,
  github: /^(https?:\/\/)?(www\.)?github\.com\/([^\/]+)(\/.*)?\/?$/,
  twitter: /^(https?:\/\/)?(www\.)?x\.com\/([^\/]+)\/?/,
  instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/([^\/]+)\/?/,
  facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/([^\/]+)\/?/,
  tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/@([^\/]+)\/?/,
  youtube: /^(https?:\/\/)?(www\.)?youtube\.com\/@([^\/]+)\/?/,
  twitch: /^(https?:\/\/)?(www\.)?twitch\.tv\/([^\/]+)\/?/,
  discord: /^(https?:\/\/)?(www\.)?discord\.gg\/([^\/]+)\/?/,
  snapchat: /^(https?:\/\/)?(www\.)?snapchat\.com\/add\/([^\/]+)\/?/,
  whatsapp: /^(https?:\/\/)?(api\.)?whatsapp\.com\/send\?phone=([^\/]+)\/?/,
  telegram: /^(https?:\/\/)?t\.me\/([^\/]+)\/?/,
  reddit: /^(https?:\/\/)?(www\.)?reddit\.com\/user\/([^\/]+)\/?/,
  pinterest: /^(https?:\/\/)?(www\.)?pinterest\.com\/([^\/]+)\/?/,
};

const SocialInputs: React.FC<{
  selectedInputs: string[];
  urls: Record<string, string>;
  setUrls: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  removeInput: (social: string) => void;
}> = ({ selectedInputs, urls, setUrls, removeInput }) => {
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (social: string, value: string) => {
    setUrls((prev) => ({
      ...prev,
      [social]: value,
    }));

    const regex = regexPatterns[social as keyof typeof regexPatterns];
    if (regex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        [social]: "",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [social]: "Invalid URL format.",
      }));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {selectedInputs.map((social) => (
        <div key={social} className="flex flex-row gap-2 group">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={socialIcons[social as keyof typeof socialIcons]}
              className="w-4 h-4"
            />
          </div>
          <div className="flex flex-col w-full">
            <Input
              placeholder={social.charAt(0).toUpperCase() + social.slice(1)}
              value={urls[social] || ""}
              onChange={(e) => handleChange(social, e.target.value)}
              className={errors[social] ? "border-red-500" : ""}
            />
            {errors[social] && (
              <span className="text-red-500 text-xs">{errors[social]}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => removeInput(social)}
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