import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface SocialMediaLinkProps {
  platform: string;
  username: string;
  icon: IconDefinition;
  urlPrefix: string;
  formControlName: string;
}

const SocialMediaLink: React.FC<SocialMediaLinkProps> = ({
  platform,
  username,
  icon,
  urlPrefix,
  formControlName,
}) => {
  if (!username) return null;

  return (
    <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
      <div className="flex items-center justify-center gap-2">
        <Link href={`${urlPrefix}${username}`} target="_blank">
          <Button variant="link" className="p-0 gap-2">
            <FontAwesomeIcon icon={icon} className="w-6 h-6" />
            <p>{username}</p>
          </Button>
        </Link>
      </div>
      <div className="flex items-center">

      </div>
    </div>
  );
};

export default SocialMediaLink;