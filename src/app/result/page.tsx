"use client";

import { useEffect, useState } from "react";

const ResultPage = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Retrieve form data from localStorage
    const storedData = localStorage.getItem("formData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (!data) {
    return <p>No data found</p>;
  }

  return (
    <div>
      <h1>Result Page</h1>
      <p>Income: {data.income}</p>
      <p>Currency: {data.currency}</p>
      <p>Age: {data.age}</p>
      <p>Vitals: {data.vitals}</p>
      <p>Hobbies: {data.hobbies}</p>
      <p>Taxes: {data.taxes}</p>
      <p>Other: {data.other}</p>
    </div>
  );
};

export default ResultPage;
