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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex gap-6">
        {/* Left column - Results */}
        <div className="w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 h-[calc(100vh-3rem)] overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Results
            </h2>
            <dl className="space-y-4">
              {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm font-medium text-gray-500 capitalize">
                    {key}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {renderValue(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Right column - Content area */}
        <div className="w-2/3">
          <div className="bg-white rounded-lg shadow-lg p-6 h-[calc(100vh-3rem)] overflow-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Additional Information
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
