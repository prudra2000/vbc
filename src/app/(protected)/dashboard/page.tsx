import Header from "@/components/header";
import ClientDashboard from "@/components/page-components/client-dashboard";
import { LayoutDashboard } from "lucide-react";
const DashboardPage = () => {
  return (
    <div className="min-h-screen p-10 bg-gray-100 ">
      <Header headerTitle={"Dashbaord"}  icon={<LayoutDashboard className="stroke-white"/>} />
      <ClientDashboard /> 
    </div>
  );
};

export default DashboardPage;
