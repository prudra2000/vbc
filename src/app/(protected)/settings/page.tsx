import { auth, signOut } from "@/auth";
import Link from "next/link";


const SettingsPage = async () => {
  const session = await auth();
  return <div>

    {JSON.stringify(session)}
    <form action={async () => {
      "use server"
      await signOut({redirectTo: "/auth/login"})
    }}>
      <button type="submit">Logout</button>
    </form>
    <nav>
      <Link href="/editor">Editor</Link>
    </nav>
    <h1 className="text-2xl font-bold">Welcom Back, {session?.user?.name}.</h1>

    </div>
};

export default SettingsPage;
