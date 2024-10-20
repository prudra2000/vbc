// /pages/api/github/callback.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }
  let codeVerifier: string | null = null;
  try {
    const decodedState = Buffer.from(state!, "base64").toString("utf-8");
    const stateObj = JSON.parse(decodedState);
    codeVerifier = stateObj.codeVerifier;
  } catch (error) {
    console.error("Error decoding state parameter:", error);
    return NextResponse.json(
      { error: "Invalid state parameter" },
      { status: 400 }
    );
  }

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "Code verifier missing in state" },
      { status: 400 }
    );
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
    const redirectUri =
      "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/spotify/callback";

    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirectUri,
          client_id: clientId,
          code_verifier: codeVerifier,
        }),
      }
    );

    if (!tokenResponse.ok) {
      console.error("Token response error:", await tokenResponse.text());
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 500 }
      );
    }
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 500 }
      );
    }

    const profileResponse = await fetch(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!profileResponse.ok) {
      console.error("Profile response error:", await profileResponse.text());
      return NextResponse.json(
        { error: "Failed to retrieve profile data" },
        { status: 500 }
      );
    }

    const profileData = await profileResponse.json();


    if (!profileData) {
      return NextResponse.json(
        { error: "Failed to retrieve profile data" },
        { status: 500 }
      );
    } else {
      const spotifyUserId = profileData.id;
      const existingUser = await db.user.findUnique({
        where: { id: session?.user?.id },
      });


      const updatedAuthenticatedSocials = {
        ...((existingUser?.authenticatedSocials as object) || {}),
        spotify: {
          spotifyId: spotifyUserId,
          spotifyUsername: profileData.display_name,
        },
      };

      await db.user.update({
        where: { id: session?.user?.id },
        data: { authenticatedSocials: updatedAuthenticatedSocials },
      });
      return NextResponse.redirect(new URL("/settings", req.url));
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred during GitHub OAuth" },
      { status: 500 }
    );
  }
}
