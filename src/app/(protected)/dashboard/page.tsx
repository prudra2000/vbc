import Header from "@/components/header";
import ClientDashboard from "@/components/page-components/client-dashboard";
import { LayoutDashboard } from "lucide-react";
const DashboardPage = () => {
  return (
    <div className="flex flex-col py-8 px-3 gap-4 min-h-screen bg-gray-100 ">
      <Header headerTitle={"Dashbaord"}  icon={<LayoutDashboard className="stroke-white"/>} />
      <ClientDashboard /> 
    </div>
  );
};

export default DashboardPage;
