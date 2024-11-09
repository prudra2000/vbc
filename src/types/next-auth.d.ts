import NextAuth from "next-auth";

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
        linkedinUsername: string;
      };
      github?: {
        githubId: string;
        githubUsername: string;
      };
      twitter?: {
        twitterId: string;
        twitterUsername: string;
      };
      spotify?: {
        spotifyId: string;
        spotifyUsername: string;
      };
      twitch?: {
        twitchId: string;
        twitchUsername: string;
      };
      gitlab?: {
        gitlabId: string;
        gitlabUsername: string;
      };
    };
    hasAccess?: boolean;
  }

  interface Session {
    user?: User
  }
}

