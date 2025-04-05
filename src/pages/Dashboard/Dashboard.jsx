import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import AttendaceChart from "../../components/ecommerce/AttendaceChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import AttendanceCard from "../../components/ecommerce/AttendanceCard";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="AI Attendance System"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 xl:col-span-5">
          <AttendanceCard />
        </div>
        <div className="col-span-12">
          <AttendaceChart />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
