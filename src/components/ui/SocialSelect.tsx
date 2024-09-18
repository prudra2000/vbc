import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const SocialSelect: React.FC<{ selectedInputs: string[]; handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ selectedInputs, handleSelectChange }) => {
  return (
    <Select
      onValueChange={(value: string) =>
        handleSelectChange({ target: { value } } as React.ChangeEvent<HTMLSelectElement>)
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Socials" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(socialIcons).map((value) => (
          <SelectItem key={value} value={value}>
            <div className="flex justify-between items-center gap-2">
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
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SocialSelect;
