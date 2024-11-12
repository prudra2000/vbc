import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: NextRequest, { params }: { params: { provider: string } }) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: {
        authenticatedSocials: {
          ...session.user.authenticatedSocials,
          [params.provider]: null,
        },
      },
    });

    return NextResponse.json({ success: `${params.provider} account unlinked successfully` });
  } catch (error) {
    console.error(`Error unlinking ${params.provider} account:`, error);
    return NextResponse.json({ error: `Failed to unlink ${params.provider} account` }, { status: 500 });
  }
}

