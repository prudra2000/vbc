import { auth } from "@/auth";
import Header from "@/components/header";
import ClientSettings from "@/components/page-components/client-settings";
import { Settings } from "lucide-react";
const SettingsPage = async () => {
  return (
    <div>
      <div className="pt-8 px-10 bg-gray-100 min-h-screen">
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
