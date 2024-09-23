import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
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

const SocialSelect: React.FC<{
  selectedInputs: string[];
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ selectedInputs, handleSelectChange }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(socialIcons).map((value) => (
        <Button
          variant="outline"
          key={value}
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            handleSelectChange({
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>);
          }}
          className={`flex items-center gap-2 p-2 border rounded ${
            selectedInputs.includes(value) ? "border-red-500" : "border-white"
          }`}
        >
          {selectedInputs.includes(value) ? (
            <FontAwesomeIcon icon={faX} className="text-red-500" />
          ) : (
            <FontAwesomeIcon icon={faPlus} className="text-green-500" />
          )}
          <span className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={socialIcons[value as keyof typeof socialIcons]}
            />{" "}
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default SocialSelect;
