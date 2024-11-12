import Header from "@/components/header";
import ClientSettings from "@/components/page-components/client-settings";
import { Settings } from "lucide-react";
const SettingsPage = async () => {
  return (
    <div>
      <div className="flex flex-col py-8 px-3 gap-4 min-h-screen bg-gray-100">
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
