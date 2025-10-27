import DashboardCards from "../common/DashboardCards";
import DashboardChart from "../chart/chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ApiRoutes } from "../../../constants/constants";
import type { ProductCounts } from "../../types/productCount";

interface StripeBalance {
  available: number;
  pending: number;
  currency: string;
}
interface TotalStocks {
  totalStocks: number;
}

const DashboardContent = () => {
  const [stripeBalance, setStripeBalance] = useState<StripeBalance | null>(
    null
  );
  const [productCount, setProductCount] = useState<ProductCounts | null>(null);
  const [totalStocks, setTotalStocks] = useState<TotalStocks | null>(null);

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

  useEffect(() => {
    const fetchProductsCount = async () => {
      try {
        const res = await axios.get<ProductCounts>(
          ApiRoutes.Product.countActiveProducts
        );
        setProductCount(res.data);
      } catch (error) {
        console.error("Error fetching Products", error);
      }
    };
    fetchProductsCount();
  }, []);

  // useEffect(() => {
  //   const fetchTotalStocks = async () => {
  //     try {
  //       const res = await axios.get<TotalStocks>(ApiRoutes.Product.totalStocks);
  //       setTotalStocks(res.data);
  //     } catch (error) {
  //       console.error("Error fetching Products", error);
  //     }
  //   };
  //   fetchTotalStocks();
  // }, []);

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
            data={productCount?.active ?? 0}
            cardName="Products"
            className="bg-warning"
          ></DashboardCards>
          <DashboardCards
            // data={totalStocks?.totalStocks ?? 0}
            data={0}
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
