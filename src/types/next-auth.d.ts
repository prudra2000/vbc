import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
    accounts?: Account[]
    authenticatedSocials?: {
      linkedin?: {
        linkedinId: string;
      };
      github?: {
        githubId: string;
        githubUsername: string;
      };
      twitter?: {
        twitterId: string;
        twitterUsername: string;
      };
      linkedin?: {
        linkedinId: string;
        linkedinUsername: string;
      };
    };
  }

  interface Session {
    user?: User
  }
}

