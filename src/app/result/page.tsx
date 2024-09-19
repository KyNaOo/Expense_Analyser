"use client";

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import LoadingSpinner from "../../components/loading";
import { chart } from "../../processing/chart";

// Import the functions from the two files you provided earlier
import { calculateSavings } from "../../processing/total";
import { results } from "../../processing/results";

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

interface SavingsData {
  totalSavings: string;
  savingsPerDecade: string;
  savingsPerYear: string;
  savingsPerMonth: string;
}

interface ResultsData {
  message: string;
  problem: string[];
  solution: string[];
  top1: string;
}

const ResultPage: React.FC = () => {
  const [data, setData] = useState<FormData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const storedData = localStorage.getItem("formData");
      if (storedData) {
        const parsedData: FormData = JSON.parse(storedData);
        setData(parsedData);

        const income = parseInt(parsedData.income);
        const vitals = parseInt(parsedData.vitals);
        const taxes = parseInt(parsedData.taxes);
        const hobbies = parseInt(parsedData.hobbies);
        const other = parseInt(parsedData.other);
        const age = parseInt(parsedData.age);

        const calculatedChartData = chart(
          income,
          vitals,
          taxes,
          hobbies,
          other
        );
        setChartData(calculatedChartData);

        const calculatedSavings = calculateSavings(
          income,
          vitals + taxes + hobbies + other,
          age
        );
        setSavingsData(calculatedSavings);

        const calculatedResults = results(
          income,
          vitals,
          taxes,
          hobbies,
          other
        );
        setResultsData(calculatedResults);
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
          {/* Top part - Results */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-1/2 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
            {resultsData && (
              <div>
                <p className="text-lg font-semibold mb-2">
                  {resultsData.message}
                </p>
                <p className="mb-2">Main expense: {resultsData.top1}</p>
                {resultsData.problem.length > 0 && (
                  <div>
                    <h3 className="text-md font-semibold mt-4 mb-2">
                      Problems:
                    </h3>
                    <ul className="list-disc list-inside">
                      {resultsData.problem.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {savingsData && (
                  <div className="mt-4">
                    <h3 className="text-md font-semibold mb-2">
                      Savings Projection:
                    </h3>
                    <p>Total Savings: {savingsData.totalSavings}</p>
                    <p>Savings per Decade: {savingsData.savingsPerDecade}</p>
                    <p>Savings per Year: {savingsData.savingsPerYear}</p>
                    <p>Savings per Month: {savingsData.savingsPerMonth}</p>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Bottom part - What can you do? */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-1/2 overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What can you do?
            </h2>
            {resultsData && resultsData.solution.length > 0 && (
              <ul className="list-disc list-inside">
                {resultsData.solution.map((item, index) => (
                  <li key={index} className="text-gray-700 mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
