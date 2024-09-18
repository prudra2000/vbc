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
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/([^\/]+)/,
    github: /^(https?:\/\/)?(www\.)?github\.com\/([^\/]+)(\/.*)?$/,
    twitter: /^(https?:\/\/)?(www\.)?x\.com\/([^\/]+)/,
    instagram: /^(https?:\/\/)?(www\.)?instagram\.com\/([^\/]+)/,
    facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/([^\/]+)/,
    tiktok: /^(https?:\/\/)?(www\.)?tiktok\.com\/@([^\/]+)/,
    youtube: /^(https?:\/\/)?(www\.)?youtube\.com\/@([^\/]+)/,
    twitch: /^(https?:\/\/)?(www\.)?twitch\.tv\/([^\/]+)/,
    discord: /^(https?:\/\/)?(www\.)?discord\.gg\/([^\/]+)/,
    snapchat: /^(https?:\/\/)?(www\.)?snapchat\.com\/add\/([^\/]+)/,
    whatsapp: /^(https?:\/\/)?(api\.)?whatsapp\.com\/send\?phone=([^\/]+)/,
    telegram: /^(https?:\/\/)?t\.me\/([^\/]+)/,
    reddit: /^(https?:\/\/)?(www\.)?reddit\.com\/user\/([^\/]+)/,
    pinterest: /^(https?:\/\/)?(www\.)?pinterest\.com\/([^\/]+)/,
  };
  return regexMap[platform].exec(url)?.[3] || null;
};

type SocialLinksProps = {
  showUsername: boolean;
  selectedInputs: string[];
  urls: Record<string, string | undefined>;
};

const SocialLinks = ({
  showUsername,
  urls,
  selectedInputs,
}: SocialLinksProps) => {
  const renderSocialLink = (
    platform: keyof typeof socialIcons,
    url: string | undefined
  ) => {
    if (url && url.startsWith("http")) {
      const username = platformRegex(url, platform);
      const icon = socialIcons[platform];
      return username ? (
        <>
          {showUsername ? (
            <div className="flex flex-row gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={platform}
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />

                  <p className=" underline hover:text-blue-500">{username}</p>
                </div>
              </a>
            </div>
          ) : (
            <div className="flex flex-col gap-2 w-min">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                key={platform}
              >
                <div className="flex items-center gap-2 p-2 outline outline-1 outline-gray-300 rounded-md">
                  <FontAwesomeIcon icon={icon} className="w-4 h-4" />
                </div>
              </a>
            </div>
          )}
        </>
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
