"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Avatar from "../avatar";
import { GridLoader } from "react-spinners";
import UploadProfilePicModal from "../settings/uploadProfilePicModal";
import SocialLinkCard from "../settings/socialLinkCard";

const ClientSettings = () => {
  const { data: session, status, update } = useSession();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-max pt-[30vh] gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading....</h1>
      </div>
    );
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  // Generate code challenge from the code verifier
  const generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await crypto.subtle.digest("SHA-256", data);

    // Convert the hash to Base64 URL encoding
    const hashArray = Array.from(new Uint8Array(hash));
    const hashString = String.fromCharCode(...hashArray);
    const base64Url = btoa(hashString)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    return base64Url;
  };

  const generateState = (codeVerifier: string) => {
    const stateObject = {
      codeVerifier,
      randomString: Math.random().toString(36).substring(2, 15),
    };

    const json = JSON.stringify(stateObject);
    return btoa(unescape(encodeURIComponent(json)));
  };

  const linkedinClientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const linkedinRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/linkedin/callback";
  const linkedinScope = "r_basicprofile";
  const generateLinkedInState = () => {
    return Math.random().toString(36).substring(2, 15);
  };

  const handleLinkedInLink = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateState(codeVerifier);
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${encodeURIComponent(
      linkedinRedirectUri
    )}&state=${state}&scope=${encodeURIComponent(linkedinScope)}`;
    window.location.href = authorizationUrl;
  };
  const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const githubRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/github/callback";
  const githubScope = "read:user user:email";

  const handleGitHubLink = () => {
    const githubAuthorizationUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(
      githubRedirectUri
    )}&scope=${encodeURIComponent(githubScope)}`;
    window.location.href = githubAuthorizationUrl;
  };

  const twitterClientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID;
  const twitterRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/twitter/callback";
  const twitterScope = "tweet.read users.read";

  // Generate a random code verifier
  const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  };

  const handleTwitterLink = async () => {
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateState(codeVerifier);

      sessionStorage.setItem(`pkce_code_verifier_${state}`, codeVerifier);

      const twitterAuthUrl = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientId}&redirect_uri=${encodeURIComponent(
        twitterRedirectUri
      )}&scope=${encodeURIComponent(
        twitterScope
      )}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

      window.location.href = twitterAuthUrl;
    } catch (error) {
      console.error("Error during Twitter link process:", error);
      // Optionally, display an error message to the user
    }
  };

  const spotifyClientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const spotifyRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/spotify/callback";
  const spotifyScope = "user-read-private user-read-email";

  const handleSpotifyLink = async () => {
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateState(codeVerifier);

      const spotifyAuthorizationUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${spotifyClientId}&redirect_uri=${encodeURIComponent(
        spotifyRedirectUri
      )}&scope=${encodeURIComponent(
        spotifyScope
      )}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

      window.location.href = spotifyAuthorizationUrl;
    } catch (error) {
      console.error("Error during Spotify link process:", error);
      // Optionally, display an error message to the user
    }
  };

  const twitchClientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
  const twitchRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/twitch/callback";
  const twitchScope = "user:read:email";

  const handleTwitchLink = async () => {
    try {
      const codeVerifier = generateCodeVerifier();
      const state = generateState(codeVerifier);

      sessionStorage.setItem(`pkce_code_verifier_${state}`, codeVerifier);

      const twitchAuthorizationUrl = `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${twitchClientId}&redirect_uri=${encodeURIComponent(
        twitchRedirectUri
      )}&scope=${encodeURIComponent(twitchScope)}&state=${state}`;

      window.location.href = twitchAuthorizationUrl;
    } catch (error) {
      console.error("Error during Twitch link process:", error);
      // Optionally, display an error message to the user
    }
  };

  const handleUnlink = async (provider: string) => {
    try {
      const response = await fetch(`/api/socialUnlink/${provider}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.success);
        window.location.reload();
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error(`Error unlinking ${provider} account:`, error);
      alert(`An error occurred while unlinking the ${provider} account.`);
    }
  };

  return (
    <div className=" pt-8 bg-gray-100">
      <div className="flex flex-col gap-4 rounded-lg">
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
          <h1 className="font-semibold text-black">Your Account:</h1>
          <hr />
          <div className=" flex flex-col gap-4 text-black">
            <div className="flex flex-col justify-between items-center gap-2">
              <Avatar
                alt={session?.user?.name ?? ""}
                src={session?.user?.image ?? ""}
                size="large"
                className="w-24 h-24"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsUploadModalOpen(true)}
              >
                Upload Image
              </Button>
              <UploadProfilePicModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSubmit={async () => {
                  return; // Ensure it returns a Promise
                }}
                cardID={""}
              />
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center text-sm">
              <p>
                <strong className="font-[600]">Name:</strong>{" "}
                {session?.user?.name}
              </p>
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center text-sm">
              <p>
                <strong className="font-[600]">Email:</strong>{" "}
                {session?.user?.email}
              </p>
            </div>
            <hr />
            <div className="flex flex-row justify-between items-center text-sm">
              <p>
                <strong className="font-[600]">Plan:</strong>{" "}
                {session?.user?.hasAccess ? "Pro" : "Free"}
              </p>
              {session?.user?.hasAccess ? (
                <Button variant="outline" size="sm">
                  Manage
                </Button>
              ) : (
                <Button variant="outline" size="sm">
                  Upgrade
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-white p-4 rounded-lg text-black shadow-md">
          <div className="flex flex-col gap-4">
            <h1 className="font-semibold">Socials:</h1>
            {session?.user?.authenticatedSocials?.linkedin?.linkedinId ? (
              <SocialLinkCard
                type="LinkedIn"
                isLinked={true}
                icon="linkedin"
                username={
                  session?.user?.authenticatedSocials?.linkedin
                    ?.linkedinUsername
                }
                unlink={() => handleUnlink("linkedin")}
                link={() => handleLinkedInLink()}
              />
            ) : (
              <SocialLinkCard
                isLinked={false}
                icon="linkedin"
                unlink={() => handleUnlink("linkedin")}
                link={() => handleLinkedInLink()}
              />
            )}
            {session?.user?.authenticatedSocials?.github?.githubId ? (
              <SocialLinkCard
                type="GitHub"
                isLinked={true}
                icon="github"
                username={
                  session?.user?.authenticatedSocials?.github?.githubUsername
                }
                unlink={() => handleUnlink("github")}
                link={() => handleGitHubLink()}
              />
            ) : (
              <SocialLinkCard
                isLinked={false}
                icon="github"
                unlink={() => handleUnlink("github")}
                link={() => handleGitHubLink()}
              />
            )}
            {session?.user?.authenticatedSocials?.twitter?.twitterId ? (
              <SocialLinkCard
                type="Twiiter"
                isLinked={true}
                icon="twitter"
                username={
                  session?.user?.authenticatedSocials?.twitter?.twitterUsername
                }
                unlink={() => handleUnlink("twitter")}
                link={() => handleTwitterLink()}
              />
            ) : (
              <SocialLinkCard
                isLinked={false}
                icon="twitter"
                unlink={() => handleUnlink("twitter")}
                link={() => handleTwitterLink()}
              />
            )}
            {session?.user?.authenticatedSocials?.spotify?.spotifyId ? (
              <SocialLinkCard
                type="Spotify"
                isLinked={true}
                icon="spotify"
                username={
                  session?.user?.authenticatedSocials?.spotify?.spotifyUsername
                }
                unlink={() => handleUnlink("spotify")}
                link={() => handleSpotifyLink()}
                id={session?.user?.authenticatedSocials?.spotify?.spotifyId}
              />
            ) : (
              <SocialLinkCard
                isLinked={false}
                icon="spotify"
                unlink={() => handleUnlink("spotify")}
                link={() => handleSpotifyLink()}
              />
            )}
            {session?.user?.authenticatedSocials?.twitch?.twitchId ? (
              <SocialLinkCard
                type="Twitch"
                isLinked={true}
                icon="twitch"
                username={
                  session?.user?.authenticatedSocials?.twitch?.twitchUsername
                }
                unlink={() => handleUnlink("twitch")}
                link={() => handleTwitchLink()}
                id={session?.user?.authenticatedSocials?.twitch?.twitchId}
              />
            ) : (
              <SocialLinkCard
                isLinked={false}
                icon="twitch"
                unlink={() => handleUnlink("twitch")}
                link={() => handleTwitchLink()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
