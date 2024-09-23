import { auth, signOut } from "../../../auth";
import Link from "next/link";
import React from "react";
import { db } from "../../../lib/db";

async function getUserCards(userId: string | undefined) {
    const userWithCards = await db.user.findUnique({
      where: { id: userId },
      include: { cards: true },
    });
    return userWithCards;
  }

const SettingsPage = async () => {
  const session = await auth();
  const userWithCards = await getUserCards(session?.user?.id);
  return (
    <div>
      Dashboard
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/auth/login" });
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <nav>
        <Link href="/editor">Editor</Link>
      </nav>
      <h1 className="text-2xl font-bold">
        Welcom Back, {session?.user?.name}.
      </h1>
      <div>
        {userWithCards?.cards?.map((card) => (
          <div key={card.id} className="flex outline outline-1 outline-lime-50 gap-2">
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link href={`http://localhost:3000/card/${card.id}`}>Link</Link>
            <Link href={`http://localhost:3000/editor/${card.id}`}>Edit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
