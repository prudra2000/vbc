import SocialLinks from "@/components/ui/SocialLinks";
import { CardStyleProvider } from "../CardStyleProvider";
import Image from "next/image";

interface CardProps {
  name: string;
  email: string;
  image?: string;
  urls?: Record<string, string>;
  showUsername: boolean;
  selectedInputs?: string[];
  type: "primary" | "secondary" | "success" | "danger"; // Add type prop
  className?: string
}

export default function Card({
  name = "",
  email = "",
  image = "",
  urls = {},
  showUsername = true,
  selectedInputs = [],
  type,
  className
  
}: CardProps) {
  console.log("image:", image); // Check the contents of urls
  console.log("Selected Inputs:", selectedInputs);
  return (
    <CardStyleProvider type={type}>
      <div className={`card ${type} ${className}`}>
        <div className="flex flex-col justify-center items-center gap-5">
        <div></div>
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold ">{name}</h1>
            <div className="flex items-center gap-2">
              <p className="">{email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <SocialLinks
              urls={urls}
              showUsername={showUsername}
              selectedInputs={selectedInputs}
              type="primary"
            />
          </div>
        </div>
      </div>
    </CardStyleProvider>
  );
}
