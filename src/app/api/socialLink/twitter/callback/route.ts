// /pages/api/twitter/callback.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json(
      { error: "Authorization code or state parameter missing" },
      { status: 400 }
    );
  }

  // Decode and parse the state parameter to retrieve the code_verifier
  let codeVerifier: string | null = null;
  try {
    const decodedState = Buffer.from(state, "base64").toString("utf-8");
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
    const clientId = process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID!;
    const clientSecret = process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET!;
    const twitterRedirectUri = "https://python-enjoyed-mallard.ngrok-free.app/api/socialLink/twitter/callback";

    const tokenResponse = await fetch("https://api.x.com/2/oauth2/token", {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        code: code,
        grant_type: "authorization_code",
        client_id: clientId,
        redirect_uri: twitterRedirectUri,
        code_verifier: codeVerifier,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      console.error('Error fetching token:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch token', details: errorData },
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

    // Fetch Twitter user profile data
    const profileResponse = await fetch("https://api.x.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });


    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      console.error('Error fetching profile:', errorData);
      return NextResponse.json(
        { error: "Failed to retrieve user profile" },
        { status: 500 }
      );
    }

    const profileData = await profileResponse.json();

    const twitterUserId = profileData.data?.id;
    const twitterUserName = profileData.data?.username;
    const session = await auth();

    const existingUser = await db.user.findUnique({
      where: { id: session?.user?.id },
    });

    const updatedAuthenticatedSocials = {
      ...((existingUser?.authenticatedSocials as object) || {}),
      twitter: {
        twitterId: twitterUserId,
        twitterUsername: twitterUserName,
      },
    };

    await db.user.update({
      where: { id: session?.user?.id },
      data: { authenticatedSocials: updatedAuthenticatedSocials },
    });

    // Redirect the user after successful linking
    return NextResponse.redirect(new URL("/settings", req.url));
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json(
      { error: "An error occurred during Twitter OAuth" },
      { status: 500 }
    );
  }
}
