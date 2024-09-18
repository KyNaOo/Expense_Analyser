"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import LoadingSpinner from "../../components/loading";
import { chart } from "../../processing/chart";

ChartJS.register(ArcElement, Tooltip, Legend);

interface FormData {
  income: string;
  currency: string;
  age: string;
  vitals: string;
  hobbies: string;
  taxes: string;
  other: string;
  [key: string]: unknown;
}

interface ChartData {
  vitalsCost: number;
  taxesCost: number;
  hobbiesCost: number;
  otherCost: number;
  saved: number;
}

const ResultPage: React.FC = () => {
  const [data, setData] = useState<FormData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const parsedData: FormData = JSON.parse(storedData);
        setData(parsedData);

        const calculatedChartData = chart(
          parseInt(parsedData.income),
          parseInt(parsedData.vitals),
          parseInt(parsedData.taxes),
          parseInt(parsedData.hobbies),
          parseInt(parsedData.other)
        );
        setChartData(calculatedChartData);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const pieChartData = chartData
    ? (() => {
        const labels = ["Vitals", "Taxes", "Hobbies", "Other", "Saved"];
        const values = [
          chartData.vitalsCost,
          chartData.taxesCost,
          chartData.hobbiesCost,
          chartData.otherCost,
          chartData.saved,
        ];
        const colors = [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ];
        const borderColors = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ];

        const filteredData = values
          .map((value, index) => ({
            value,
            label: labels[index],
            color: colors[index],
            borderColor: borderColors[index],
          }))
          .filter((item) => item.value > 0);

        return {
          labels: filteredData.map((item) => item.label),
          datasets: [
            {
              data: filteredData.map((item) => item.value),
              backgroundColor: filteredData.map((item) => item.color),
              borderColor: filteredData.map((item) => item.borderColor),
              borderWidth: 1,
            },
          ],
        };
      })()
    : null;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data || !chartData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">No data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex gap-6">
        {/* Left column - Chart and Basic Info */}
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 h-[calc(100vh-3rem)] overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Financial Overview
            </h2>
            {/* Pie Chart */}
            {pieChartData && (
              <div className="mb-6">
                <Pie data={pieChartData} />
              </div>
            )}
            {/* Basic Info */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Basic Information
              </h3>
              <p className="text-sm text-gray-600">Age: {data.age}</p>
              <p className="text-sm text-gray-600">Currency: {data.currency}</p>
            </div>
          </div>
        </div>
        {/* Right column - Split into two parts */}
        <div className="w-2/3 flex flex-col gap-6">
          {/* Top part - Empty for now */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-1/2 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4"></h2>
            {/* This space is intentionally left empty for future content */}
          </div>
          {/* Bottom part - Random text */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-1/2 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What can you do ?
            </h2>
            <p className="text-gray-700">
              This is where you can put your random text or any additional
              content. You have plenty of space here to add more components,
              text, or any other elements you need.
            </p>
            {/* Add more content here as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
