
export interface CardConfig {
  showSocialUsername: boolean;
}

export interface CardData {
    name: string;
    image: string;
    tagline: string;
    company: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    socialMedia: {
      linkedin: string;
      github: string;
      twitter: string;
      instagram: string;
      facebook: string;
      tiktok: string;
      youtube: string;
      twitch: string;
      discord: string;
      spotify: string;
    };
  }

  export const defaultCardData: CardData = {
    image: '',
    name: '',
    tagline: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    location: '',
    socialMedia: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: '',
      facebook: '',
      tiktok: '',
      youtube: '',
      twitch: '',
      discord: '',
      spotify: '',
    },
  };