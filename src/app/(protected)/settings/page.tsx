import { auth, signOut } from "@/auth";
import Header from "@/components/header";
import ClientSettings from "@/components/page-components/client-settings";
import { Settings } from "lucide-react";
import Link from "next/link";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <div className=" h-screen pt-8 px-10 bg-gray-100">
        <Header
          headerTitle={"Settings"}
          icon={<Settings className="stroke-white" />}
        />
        <ClientSettings />
      </div>
    </div>
  );
};

export default SettingsPage;
