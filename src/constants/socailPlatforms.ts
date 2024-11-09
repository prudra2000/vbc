import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGithub, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";


interface SocialPlatformConfig {
  key: keyof typeof authenticatedSocials;
  name: string;
  icon: IconDefinition;
  urlPrefix: string;
}

export const socialPlatforms: SocialPlatformConfig[] = [
  {
    key: "github",
    name: "GitHub",
    icon: faGithub,
    urlPrefix: "https://github.com/",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    icon: faLinkedin,
    urlPrefix: "https://linkedin.com/in/",
  },
  {
    key: "twitter",
    name: "Twitter",
    icon: faTwitter,
    urlPrefix: "https://twitter.com/",
  },
  // Add more platforms as needed
];