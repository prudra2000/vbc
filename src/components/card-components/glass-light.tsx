import Avatar from "../avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Link,
  Mail,
  MapPin,
  Phone,
  Contact,
} from "lucide-react";
import SocialLinks from "../ui/SocialLinks";
import { Separator } from "@/components/ui/separator";
import { CardData, defaultCardData } from "@/types/cardTypes";
interface CardProps {
  cardValues?: {cardData: CardData};
  urls?: Record<string, string>;
  showUsername: boolean;
  selectedInputs?: string[];
  removeAvatar?: boolean;
  removeSocials?: boolean;
  type: "glassLight";
  className?: string;
}

export default function GlassLightCard({
  urls = {},
  cardValues = {cardData: defaultCardData},
  showUsername = true,
  selectedInputs = [],
  type,
}: CardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-blue-800 to-blue-950 px-6 sm:px-0">
      <Card className="w-full max-w-md mx-auto rounded-3xl overflow-hidden bg-white/10 backdrop-blur-md border-white/15">
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col items-center text-center">
            <Avatar
              src={cardValues.cardData.image}
              alt={cardValues.cardData.name}
              variant="secondary"
              size="xxxxl"
              className="outline outline-1 outline-white/10"
            />
            <h2 className="mt-4 text-2xl font-bold flex items-center text-white">
              {cardValues.cardData.name}
            </h2>
            <div className="flex flex-col items-center ">
              {cardValues.cardData.tagline && (
                <p className="text-sm text-neutral-200">
                  {cardValues.cardData.tagline}
                </p>
              )}
              {cardValues.cardData.company && (
                <p className="text-sm text-neutral-200">
                  {cardValues.cardData.company}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <Separator className="mb-4 bg-white/15" />
          <div className="flex flex-col space-y-4">
            {cardValues.cardData.phone && (
              <a
                href={`tel:${cardValues.cardData.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words w-full justify-start"
              >
                <Button variant="outline" className="w-full justify-start border-white/15 text-white hover:bg-white/10 hover:text-white">
                  <Phone className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs ">{cardValues.cardData.phone}</span>
                  </div>
                </Button>
              </a>
            )}
            {cardValues.cardData.email && (
              <a
                href={`mailto:${cardValues.cardData.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words w-full justify-start"
              >
                <Button variant="outline" className="w-full justify-start border-white/15 text-white hover:bg-white/10 hover:text-white">
                  <Mail className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">{cardValues.cardData.email}</span>
                  </div>
                </Button>
              </a>
            )}
            {cardValues.cardData.website && (
              <a
                href={cardValues.cardData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words w-full justify-start"
              >
                <Button variant="outline" className="w-full justify-start border-white/15 text-white hover:bg-white/10 hover:text-white">
                  <Link className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">{cardValues.cardData.website}</span>
                  </div>
                </Button>
              </a>
            )}
            {cardValues.cardData.location && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${cardValues.cardData.location}`}
                target="_blank"
                rel="noopener noreferrer"
                className="break-words w-full justify-start"
              >
                <Button variant="outline" className="w-full justify-start border-white/15 text-white hover:bg-white/10 hover:text-white">
                  <MapPin className="mr-2 h-4 w-4" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs">{cardValues.cardData.location}</span>
                  </div>
                </Button>
              </a>
            )}
            {cardValues.cardData.name !== "" && (
            <a
            href={`data:text/vcard;charset=utf-8,BEGIN:VCARD%0AVERSION:3.0%0AN:;${encodeURIComponent(cardValues.cardData.name)};;;%0AFN:${encodeURIComponent(cardValues.cardData.name)}%0AORG:${encodeURIComponent(cardValues.cardData.company)}%0ATEL;TYPE=WORK,VOICE:${encodeURIComponent(cardValues.cardData.phone)}%0AEMAIL:${encodeURIComponent(cardValues.cardData.email)}%0AURL:${encodeURIComponent(cardValues.cardData.website)}%0AIMAGE;VALUE=URI:${encodeURIComponent(cardValues.cardData.image)}%0A%0AEND:VCARD`}
            // Ensure cardValues.image contains a valid URL
            download={`${cardValues.cardData.name}.vcf`}
            className="break-words w-full justify-start"
            >
              <Button className="w-full justify-start bg-white text-black hover:bg-neutral-200 hover:text-black">
                <Contact className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Add to Contacts</span>
                </div>
              </Button>
            </a>
            )}
          </div>
          <div>
            {Object.values(cardValues.cardData.socialMedia).some(value => value) && (
              <div>
                <Separator className="my-4 bg-white/15" />
                <SocialLinks
                  urls={urls}
                  showUsername={showUsername}
                  selectedInputs={selectedInputs}
                  type={type}
                />{" "}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
