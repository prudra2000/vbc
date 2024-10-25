// /pages/api/github/callback.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  try {
    const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET;

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://id.twitch.tv/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
          redirect_uri: "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/twitch/callback",
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to retrieve access token" },
        { status: 500 }
      );
    }

    // Fetch GitHub user profile data
    const profileResponse = await fetch("https://api.twitch.tv/helix/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Client-Id": process.env.TWITCH_CLIENT_ID!,
        },
      });

    const profileData = await profileResponse.json();

    if (!profileData) {
      return NextResponse.json(
        { error: "Failed to retrieve user profile" },
        { status: 500 }
      );
    } else {
      const twitchUserId = profileData.data[0].id;
      const twitchUserName = profileData.data[0].login;
      const existingUser = await db.user.findUnique({
        where: { id: session?.user?.id },
      });

      const updatedAuthenticatedSocials = {
        ...((existingUser?.authenticatedSocials as object) || {}), // Ensure it's an object
        twitch: {
          twitchId: twitchUserId,
          twitchUsername: twitchUserName,
        },
      };

      await db.user.update({
        where: { id: session?.user?.id },
        data: { authenticatedSocials: updatedAuthenticatedSocials },
      });
      // Optionally, redirect the user after successful linking
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
