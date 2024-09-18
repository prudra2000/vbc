import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import SocialLinks from "@/components/ui/SocialLinks";

interface CardProps {
  name: string;
  email: string;
  location: string;
  urls: Record<string, string>;
  showUsername: boolean;
  selectedInputs: string[];
}

export default function Card({
  name = "",
  email = "",
  location = "",
  urls = {},
  showUsername = true,
  selectedInputs = [],
}: CardProps) {
  return (
    <div className="bg-white w-full sm:w-72 md:w-80 lg:w-96 h-auto p-4 rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold ">{name}</h1>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faEnvelope} className="" />
        <p className="">{email}</p>
      </div>
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faLocationDot} className="" />
        <p className="">{location}</p>
      </div>
      <SocialLinks
        urls={urls}
        showUsername={showUsername}
        selectedInputs={selectedInputs}
      />
    </div>
  );
}
