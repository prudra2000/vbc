export interface AddCardFormValues {
    cardTitle: string;
    cardStyle: string;
    name?: string;
    image?: string;
    tagline?: string;
    company?: string;
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    socialMedia?: Record<string, string>;
  }