// components/BarChart.tsx
import { Bar, Line } from "react-chartjs-2";
import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type chartType =  "bar" | "line";

interface ChartProps{
    h: string;
    w: string;
    chartName?: string;
    defaultType: chartType;
    dataLabel?: string;
}

const Chart = ({h, w, chartName, defaultType, dataLabel}: ChartProps) => {
  const [chartType, setchartType] = useState<chartType>(defaultType);

    const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: dataLabel,
        data: [65, 59, 80, 81],
        backgroundColor: "#5b6eff",
        borderColor: "#5b6eff",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: chartName },
    },
  };
  return (
    <>
      <div className={`flex flex-col bg-white rounded-lg p-6 ${w}`}>
        {/* <div className="mb-4">
          <h5 className="text-xl font-semibold text-gray-800">
            {chartName}
          </h5>
        </div> */}
        <div className={`relative w-full ${h}`}>
            {chartType === "bar" ? (
              <Bar options={options} data={data} />
            ) : (
              <Line options={options} data={data} />
            )}
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <select
            className="border border-gray-300 rounded px-4 py-2 text-sm"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>    
            <option value="month">Monthly</option>
            <option value="year">Year</option>
          </select>
          <select
            className="border border-gray-300 rounded px-4 py-2 text-sm"
            value={chartType}
            onChange={(e) => setchartType(e.target.value as chartType)}
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Chart;
