// /pages/api/github/callback.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log("code", code);
  console.log("state", state);

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
    const clientId = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_TWITCH_CLIENT_SECRET!;
    const redirectUri =
      "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/twitch/callback";

    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

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

    const profileResponse = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-ID": clientId,
      },
    });

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
      const twitchUserId = profileData.data[0].id;
      const twitchUsername = profileData.data[0].display_name;
      const existingUser = await db.user.findUnique({
        where: { id: session?.user?.id },
      });

      const updatedAuthenticatedSocials = {
        ...((existingUser?.authenticatedSocials as object) || {}),
        twitch: {
          twitchId: twitchUserId,
          twitchUsername: twitchUsername,
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
