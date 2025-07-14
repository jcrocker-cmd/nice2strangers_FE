import DashboardCards from "../common/DashboardCards";
import DashboardChart from "../chart/chart";

const DashboardContent = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-6 justify-between mb-4">
          <DashboardCards
            data={45}
            cardName="Sales"
            className="bg-[#5b6eff]"
          ></DashboardCards>
          <DashboardCards
            data={13}
            cardName="Orders"
            className="bg-[#1abe50]"
          ></DashboardCards>
          <DashboardCards
            data={32}
            cardName="Products"
            className="bg-[#ffc85b]"
          ></DashboardCards>
          <DashboardCards
            data={23}
            cardName="Stocks"
            className="bg-[#ff5b5b]"
          ></DashboardCards>
        </div>
        <div className="w-full flex gap-2">
          <DashboardChart
            w="w-1/2"
            h="h-[500px]"
            defaultType="bar"
            label="Sales"
            chartName="Graphical Reports"
          />
          <DashboardChart
            w="w-1/2"
            h="h-[500px]"
            defaultType="line"
            label="Total Sales"
            chartName="Sales Reports"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
