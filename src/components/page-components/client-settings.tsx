"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Avatar from "../avatar";
import { GridLoader } from "react-spinners";
import UploadProfilePicModal from "../settings/uploadProfilePicModal";
import { encode as base64encode } from "js-base64";

const ClientSettings = () => {
  const { data: session, status } = useSession();
  console.log(session);
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

  const linkedinClientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
  const linkedinRedirectUri =
    "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/linkedin/callback";
  const linkedinScope = "r_liteprofile r_emailaddress";

  const handleLinkAccount = () => {
    const authorizationUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${encodeURIComponent(
      linkedinRedirectUri
    )}&scope=${encodeURIComponent(linkedinScope)}`;
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

  const handleTwitterLink = async () => {
    try {
      const codeVerifier = generateCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateState(codeVerifier);

      console.log("codeVerifier", codeVerifier);
      console.log("codeChallenge", codeChallenge);
      console.log("state", state);

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
        // Optionally, update the UI to reflect the change
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
    <div className=" h-max pt-8 bg-gray-100">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-black">Your Account:</h1>
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
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Image
            </Button>
            <UploadProfilePicModal
              isOpen={isUploadModalOpen}
              onClose={() => setIsUploadModalOpen(false)}
              onSubmit={async () => {
                // Your submit logic here
                return; // Ensure it returns a Promise
              }}
              cardID={""}
            />
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p>
              <strong>Name:</strong> {session?.user?.name}
            </p>
            <Button variant="outline">Edit</Button>
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p>
              <strong>Email:</strong> {session?.user?.email}
            </p>
            <Button variant="outline">Edit</Button>
          </div>
          <hr />
          <h1 className="text-xl font-bold">Socials:</h1>
          {session?.user?.authenticatedSocials?.linkedin?.linkedinId ? (
            <div className="flex flex-row justify-between items-center">
              <p>LinkedIn: Connected - {session?.user?.authenticatedSocials?.linkedin?.linkedinId}</p>
              <Button variant="outline" onClick={() => handleUnlink("linkedin")}>
                Unlink
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <p>
                <strong>LinkedIn:</strong>
              </p>
              <Button variant="outline" onClick={handleLinkAccount}>
                Link
              </Button>
            </div>
          )}
          {session?.user?.authenticatedSocials?.github?.githubId ? (
            <div className="flex flex-row justify-between items-center">
              <p>GitHub: Connected - {session?.user?.authenticatedSocials?.github?.githubUsername}</p>
              <Button variant="outline" onClick={() => handleUnlink("github")}>
                Unlink
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <p>
                <strong>GitHub:</strong>
              </p>
              <Button variant="outline" onClick={handleGitHubLink}>
                Link
              </Button>
            </div>
          )}
          {session?.user?.authenticatedSocials?.twitter?.twitterId ? (
            <div className="flex flex-row justify-between items-center">
              <p>Twitter: Connected - {session?.user?.authenticatedSocials?.twitter?.twitterUsername}</p>
              <Button variant="outline" onClick={() => handleUnlink("twitter")}>
                Unlink
              </Button>
            </div>
          ) : (
            <div className="flex flex-row justify-between items-center">
              <p>
                <strong>Twitter:</strong>
              </p>
              <Button variant="outline" onClick={handleTwitterLink}>
                Link
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
