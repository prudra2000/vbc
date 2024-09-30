import SocialLinks from "@/components/ui/SocialLinks";
import { CardStyleProvider } from "../CardStyleProvider";
import { MapPin, Mail, Phone, Link } from "lucide-react";
import { Button } from "../ui/button";
import Avatar from "../avatar";
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "",
  {
    variants: {
      text: {
        primary: "text-white",
        secondary: "text-black",
      },
    },
    defaultVariants: {
      text: "primary",
    },
  }
)

interface CardProps extends VariantProps<typeof cardVariants> {
  cardValues?: Record<string, string>;
  urls?: Record<string, string>;
  showUsername: boolean;
  selectedInputs?: string[];
  removeAvatar?: boolean;
  removeSocials?: boolean;
  type: "primary" | "secondary" | "success" | "danger" | "dashboard";
  className?: string;
  text?: "primary" | "secondary";
}

export default function Card({
  urls = {},
  cardValues = {},
  showUsername = true,
  selectedInputs = [],
  type,
  text,
  className,
  removeAvatar = false,
  removeSocials = false,
  
}: CardProps) {
  return (
    <CardStyleProvider type={type}>
      <div className={`card ${type} ${className}`}>
        <div className={`flex flex-col justify-center items-center gap-5 ${cardVariants({text})}`}>
          <div className="flex flex-col justify-center items-center gap-y-10 md:gap-x-10 md:flex-row">
            {!removeAvatar && (
            <div className="flex justify-center items-center">
              <Avatar
                src={cardValues.image}
                alt="Profile"
                variant="secondary"
                size="xxxxl"
                />
              </div>
            )}
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="flex flex-col items-center md:items-start">
                <h1 className="text-3xl font-bold ">{cardValues.name}</h1>
                {cardValues.tagline && (
                  <p className="text-base ">{cardValues.tagline}</p>
                )}
                {cardValues.company && (
                  <p className="text-base ">{cardValues.company}</p>
                )}
              </div>
              <hr />
              <div className="flex flex-col items-center md:items-start gap-2">
                {cardValues.phone && (
                  <div className="flex justify-center items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${cardValues.phone}`} className="text-sm">
                      {cardValues.phone}
                    </a>
                  </div>
                )}
                {cardValues.email && (
                  <div className="flex justify-center items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a
                      href="mailto:rudra@gmail.com"
                      className="p-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="link"
                        size="none"
                        className="p-0"
                      >
                        {cardValues.email}
                      </Button>
                    </a>
                  </div>
                )}
                {cardValues.website && (
                  <div className="flex justify-center items-center gap-2">
                    <Link className="w-4 h-4" />
                    <a
                      href={cardValues.website}
                      className="p-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="link"
                        size="none"
                        className="p-0"
                      >
                        {cardValues.website}
                      </Button>
                    </a>
                  </div>
                )}
                {cardValues.location && (
                  <div className="flex justify-center items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${cardValues.location}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-words"
                    >
                      <p className="break-words underline-offset-4 hover:underline text-sm">
                        {cardValues.location}
                      </p>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!removeSocials && (
          <div className="flex items-center gap-2">
            <SocialLinks
              urls={urls}
              showUsername={showUsername}
              selectedInputs={selectedInputs}
              type={cardValues.cardStyle}
            />
          </div>
          )}
        </div>
      </div>
    </CardStyleProvider>
  );
}
