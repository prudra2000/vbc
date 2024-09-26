import SocialLinks from "@/components/ui/SocialLinks";
import { CardStyleProvider } from "../CardStyleProvider";
import { MapPin, Mail, Phone, Link } from "lucide-react";
import { Button } from "../ui/button";
import Avatar from "../avatar";
interface PreviewCardProps {
  name: string;
  email: string;
  image?: string;
  cardValues?: Record<string, string>;
  urls?: Record<string, string>;
  showUsername: boolean;
  selectedInputs?: string[];
  type: "primary" | "secondary" | "success" | "danger";
  className?: string;
}

export default function PreviewCard({
  name = "",
  email = "",
  image = "",
  urls = {},
  cardValues = {},
  showUsername = true,
  selectedInputs = [],
  type,
  className,
}: PreviewCardProps) {
  console.log("image:", image);
  console.log("Selected Inputs:", selectedInputs);
  return (
    <CardStyleProvider type={type}>
      <div className={`card ${type} ${className}`}>
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex flex-col justify-center items-center gap-y-10 md:gap-x-10 md:flex-row">
            <div className="flex justify-center items-center">
              <Avatar
                src={cardValues.image}
                alt="Profile"
                variant="secondary"
                size="xxxxl"
              />
            </div>
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold ">{cardValues.name}</h1>
                <p className="text-base text-gray-500">{cardValues.tagline}</p>
              </div>
              <hr />
              <div className="flex flex-col items-center md:items-start gap-2">
                <div className="flex justify-center items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <p className="text-sm">{cardValues.phone}</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:rudra@gmail.com" className="p-0 text-white">
                    <Button
                      variant="link"
                      size="none"
                      className="p-0 text-white"
                    >
                      {cardValues.email}
                    </Button>
                  </a>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <Link className="w-4 h-4" />
                  <a href={cardValues.website} className="p-0 text-white">
                    <Button
                      variant="link"
                      size="none"
                      className="p-0 text-white "
                    >
                      {cardValues.website}
                    </Button>
                  </a>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=27112+Detroit+Rd,+Cleveland,+OH+44145"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-words"
                  >
                    <p className="break-words underline-offset-4 hover:underline text-sm">
                      {cardValues.location}
                    </p>
                  </a>
                </div>
              </div>
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
