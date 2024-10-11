import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import "@/app/CardStyles.css";
import { Button } from "./button";

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

const platformRegex = (url: string, platform: string) => {
  const regexMap: { [key: string]: RegExp } = {
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

  const regex = regexMap[platform];
  if (!regex) {
    throw new Error(`Platform ${platform} is not supported`);
  }

  return regex.exec(url)?.[3] || null;
};

type SocialLinksProps = {
  showUsername: boolean;
  selectedInputs: string[];
  urls: Record<string, string | undefined>;
  type: string;
};

const SocialLinks = ({
  showUsername,
  urls,
  selectedInputs,
  type = "primary",
}: SocialLinksProps) => {
  const renderSocialLink = (
    platform: keyof typeof socialIcons,
    url: string | undefined
  ) => {
    if (url && url.startsWith("http")) {
      const username = platformRegex(url, platform);
      const icon = socialIcons[platform];
      return username ? (
        <div key={platform}> {/* Add a unique key here */}
          {showUsername ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              key={platform}
            >
              <Button variant="outline" className={`w-full justify-start ${type === "defaultDark" ? "border-neutral-700 text-white hover:bg-neutral-700 hover:text-white" : ""} ${type === "glassLight" ? "border-white/15 text-white hover:bg-white/10 hover:text-white" : ""}`}>
                <FontAwesomeIcon icon={icon} className=" mr-2 w-4 h-4" />
                <p className=" underline hover:text-blue-500 text-xs">
                  {username}
                </p>
              </Button>
            </a>
          ) : (
            <div className="flex flex-col gap-2 w-min">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={platform}
              >
                <Button variant="outline" className="w-full justify-start p-0 px-2">
                  {" "}
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                </Button>
              </a>
            </div>
          )}
        </div>
      ) : null;
    }
    return null;
  };

  return (
    <>
      {showUsername ? (
        <div className="flex flex-col gap-2">
          {selectedInputs.map((key) => {
            const url = urls[key];
            return renderSocialLink(key as keyof typeof socialIcons, url);
          })}
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          {selectedInputs.map((key) => {
            const url = urls[key];
            return renderSocialLink(key as keyof typeof socialIcons, url);
          })}
        </div>
      )}
    </>
  );
};

export default SocialLinks;
