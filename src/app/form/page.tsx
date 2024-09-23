"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "../../components/animatedBackground";

interface FormData {
  income: string;
  currency: string;
  age: string;
  vitals: string;
  hobbies: string;
  taxes: string;
  other: string;
}

const currencies = ["USD", "EUR"];

const SimpleForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    income: "",
    currency: "",
    age: "",
    vitals: "",
    hobbies: "",
    taxes: "",
    other: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    router.push("/result");
  };

  const handleCancel = () => {
    setFormData({
      income: "",
      currency: "",
      age: "",
      vitals: "",
      hobbies: "",
      taxes: "",
      other: "",
    });
    setCurrentStep(1);
    router.push("/");
  };

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  const renderStep1 = () => (
    <>
      <div className="mb-4">
        <label
          htmlFor="income"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Income
        </label>
        <input
          type="number"
          id="income"
          name="income"
          value={formData.income}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <label
          htmlFor="age"
          className="py-2 block text-gray-700 text-sm font-bold mb-2"
        >
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="currency"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Currency
        </label>
        <select
          id="currency"
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a currency</option>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      {["vitals", "hobbies", "taxes", "other"].map((field) => (
        <div key={field} className="mb-4">
          <label
            htmlFor={field}
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label>
          <input
            type="number"
            id={field}
            name={field}
            value={formData[field as keyof FormData]}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </>
  );

  return (
    <AnimatedBackground>
      <div className="flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            {currentStep === 1 ? "Information about you :)" : "Expenses"}
          </h2>
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </form>
      </div>
    </AnimatedBackground>
  );
};

export default SimpleForm;
