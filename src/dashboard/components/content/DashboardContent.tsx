import DashboardCards from "../common/DashboardCards";
import DashboardChart from "../chart/chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ApiRoutes } from "../../../constants/constants";
interface StripeBalance {
  available: number;
  pending: number;
  currency: string;
}

const DashboardContent = () => {
  const [stripeBalance, setStripeBalance] = useState<StripeBalance | null>(
    null
  );

  useEffect(() => {
    const fetchStripeBalance = async () => {
      try {
        const res = await axios.get<StripeBalance>(
          ApiRoutes.Payments.getStripeBalance
        );
        setStripeBalance(res.data);
      } catch (error) {
        console.error("Error fetching Stripe balance", error);
      }
    };
    fetchStripeBalance();
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
            prefix="$"
            data={stripeBalance?.available ?? 0}
            cardName="Available"
            className="bg-primary"
          ></DashboardCards>
          <DashboardCards
            prefix="$"
            data={stripeBalance?.pending ?? 0}
            cardName="Pending"
            className="bg-success"
          ></DashboardCards>
          <DashboardCards
            data={0}
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
