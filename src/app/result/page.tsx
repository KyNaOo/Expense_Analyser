"use client";

import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../components/loading";

interface FormData {
  [key: string]: unknown;
}

const ResultPage: React.FC = () => {
  const [data, setData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const storedData = localStorage.getItem("formData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderValue = (value: unknown): React.ReactNode => {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return String(value);
    }
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (value === null || value === undefined) {
      return "N/A";
    }
    return JSON.stringify(value);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-semibold text-red-500">No data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Result Page</h1>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            {Object.entries(data).map(([key, value]) => (
              <div
                key={key}
                className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 odd:bg-gray-50"
              >
                <dt className="text-sm font-medium text-gray-500 capitalize">
                  {key}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {renderValue(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
