import Avatar from "../avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, Linkedin, Mail, Phone } from "lucide-react";
import SocialLinks from "../ui/SocialLinks";


interface CardProps {
  cardValues?: Record<string, string>;
  urls?: Record<string, string>;
  showUsername: boolean;
  selectedInputs?: string[];
  removeAvatar?: boolean;
  removeSocials?: boolean;
  type: "primary" | "secondary" | "success" | "danger" | "dashboard";
  className?: string;
}

export default function BasicCard({
  urls = {},
  cardValues = {},
  showUsername = true,
  selectedInputs = [],
  type,
  className,
  removeAvatar = false,
  removeSocials = false,
}: CardProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#7dd3fc]">
      <Card className="w-full max-w-md mx-auto rounded-3xl overflow-hidden">
        <CardHeader className="p-6 pb-0">
          <div className="flex flex-col items-center text-center">

            <Avatar
              src={cardValues.image}
              alt="Profile"
              variant="secondary"
              size="xxxxl"
            />
            <h2 className="mt-4 text-2xl font-bold flex items-center gap-2">
              {cardValues.name}
            </h2>
            {cardValues.tagline && (
              <p className="text-base text-muted-foreground">
                {cardValues.tagline}
              </p>
            )}
            {cardValues.company && (
              <p className="text-base text-muted-foreground">
                {cardValues.company}
              </p>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Phone className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs">
                  {cardValues.phone}
                </span>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start">
                <span className="text-xs">
                  {cardValues.email}
                </span>
              </div>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Linkedin className="mr-2 h-4 w-4" />
              <div className="flex flex-col items-start">
                <span>Let's Connect</span>
                <span className="text-xs text-muted-foreground">
                  Connect with me on LinkedIn
                </span>
              </div>
            </Button>
            <SocialLinks
              urls={urls}
              showUsername={showUsername}
              selectedInputs={selectedInputs}
              type={cardValues.cardStyle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
