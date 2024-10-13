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
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET;

    // Exchange authorization code for access token
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
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
    const profileResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    const profileData = await profileResponse.json();

    if (!profileData) {
      return NextResponse.json(
        { error: "Failed to retrieve user profile" },
        { status: 500 }
      );
    } else {
      const githubUserId = profileData.id;
      const githubUserName = profileData.login;
      const existingUser = await db.user.findUnique({
        where: { id: session?.user?.id },
      });

      const updatedAuthenticatedSocials = {
        ...((existingUser?.authenticatedSocials as object) || {}), // Ensure it's an object
        github: {
          githubId: githubUserId,
          githubUsername: githubUserName,
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
