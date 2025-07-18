import DashboardCards from "../common/DashboardCards";
import DashboardChart from "../chart/chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

interface DashboardStats {
  emp: number;
  dept: number;
}

const DashboardContent = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get<DashboardStats>(
          "https://localhost:7095/api/Employees/count"
        );
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching employee count", error);
      }
    };
    fetchCount();
  }, []);

  console.log("Dashboard is mounted");
  return (
    <>
      <Helmet>
        <title>Dashboard | My App</title>
        <meta
          name="description"
          content="Dashboard page showing sales, orders, products, and stocks."
        />
        <meta property="og:title" content="Dashboard Overview" />
        <meta
          property="og:description"
          content="Monitor employee stats and graphical reports."
        />
      </Helmet>

      <div className="flex flex-col">
        <div className="flex gap-6 justify-between mb-4 flex-col lg-custom:flex-row w-full">
          <DashboardCards
            data={stats?.emp ?? 0}
            cardName="Sales"
            className="bg-primary"
          ></DashboardCards>
          <DashboardCards
            data={stats?.dept ?? 0}
            cardName="Orders"
            className="bg-success"
          ></DashboardCards>
          <DashboardCards
            data={32}
            cardName="Products"
            className="bg-warning"
          ></DashboardCards>
          <DashboardCards
            data={2376}
            cardName="Stocks"
            className="bg-danger"
          ></DashboardCards>
        </div>
        <div className="w-full flex gap-2 flex-col xl:flex-row">
          <DashboardChart
            w="xl:w-1/2 w-full"
            h="h-[500px]"
            defaultType="bar"
            dataLabel="Sales"
            chartName="Graphical Reports"
          />
          <DashboardChart
            w="xl:w-1/2 w-full"
            h="h-[500px]"
            defaultType="line"
            dataLabel="Total Sales"
            chartName="Sales Reports"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
