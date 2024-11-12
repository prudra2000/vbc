import Header from "@/components/header";
import PricingTable from "@/components/pricing-table-sub";
import { Settings } from "lucide-react";
const SubscribePage = async () => {
  return (
    <div>
      <div className="pt-8 px-10 bg-gray-100 min-h-screen">
        <Header
          headerTitle={"Subscribe"}
          icon={<Settings className="stroke-white" />}
        />
        <PricingTable />
      </div>
    </div>
  );
};

export default SubscribePage;
