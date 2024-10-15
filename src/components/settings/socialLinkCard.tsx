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
import { Chip } from "../ui/chip";
import { Button } from "../ui/button";
import {
  EllipsisVertical,
  Link as LinkIcon,
  Unlink,
  SquareArrowOutUpRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link  from "next/link";
import { Badge } from "@/components/ui/badge"


interface SocialLinkCardProps {
  icon: string;
  isLinked: boolean;
  username?: string;
  unlink: () => void;
  link: () => void;
  type?: string;
}

const SocialLinkCard = ({
  type,
  icon,
  isLinked,
  username,
  unlink,
  link,
}: SocialLinkCardProps) => {
  const icons = {
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
  const iconBackground = {
    linkedin: "bg-linkedin",
    github: "bg-[#24292e]",
    twitter: "bg-[#1DA1F2]",
    instagram: "bg-instagram",
    facebook: "bg-facebook",
    tiktok: "bg-tiktok",
    youtube: "bg-youtube",
    twitch: "bg-twitch",
    discord: "bg-discord",
    snapchat: "bg-snapchat",
    whatsapp: "bg-whatsapp",
    telegram: "bg-telegram",
    reddit: "bg-reddit",
    pinterest: "bg-pinterest",
  };
  const url = {
    LinkedIn: `https://www.linkedin.com/in/${username}`,
    GitHub: `https://www.github.com/${username}`,
    Twitter: `https://www.x.com/${username}`,
    Instagram: `https://www.instagram.com/${username}`,
    Facebook: `https://www.facebook.com/${username}`,
    TikTok: `https://www.tiktok.com/@${username}`,
    YouTube: `https://www.youtube.com/${username}`,
    Twitch: `https://www.twitch.com/${username}`,
    Discord: `https://www.discord.com/${username}`,
    Snapchat: `https://www.snapchat.com/${username}`,
    WhatsApp: `https://www.whatsapp.com/${username}`,
    Telegram: `https://www.telegram.com/${username}`,
    Reddit: `https://www.reddit.com/${username}`,
    Pinterest: `https://www.pinterest.com/${username}`,
  };

  const profileUrl = url[type as keyof typeof url] || "#";

  return (
    <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
      <div className="flex flex-row items-center justify-start gap-2">
        <div
          className={`flex flex-col items-center justify-center p-6  rounded-md ${
            isLinked
              ? iconBackground[icon as keyof typeof iconBackground]
              : "bg-neutral-200"
          }`}
        >
          <FontAwesomeIcon
            icon={icons[icon as keyof typeof icons]}
            className={`w-10 h-10 ${isLinked ? "text-white" : "text-black"}`}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>{username}</p>

          <Badge variant={isLinked ? "success" : "secondary"}>
            {isLinked ? "Linked" : "Not Linked"}
          </Badge>
        </div>
      </div>
      <div className="flex items-center">
        {isLinked ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="icon" size="sm">
                  <EllipsisVertical className="w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{type}</DropdownMenuLabel>
                <Link href={profileUrl} target="_blank">
                  <DropdownMenuItem>
                    <span className="">View Profile</span>
                    <DropdownMenuShortcut>
                      <SquareArrowOutUpRight className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={unlink}>
                  <span className="text-destructive">Unlink</span>
                  <DropdownMenuShortcut>
                    <Unlink className="w-4 h-4 stroke-destructive" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={link}
            className="gap-1 text-green-500"
          >
            <LinkIcon className="w-4 h-4" />
            Link
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialLinkCard;
