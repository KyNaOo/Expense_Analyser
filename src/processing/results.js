// Define the pourcentage function
function pourcentage(value, total) {
  return (value / total) * 100;
}

export function results(income, vitals, taxes, hobbies, other) {
  const vitalsCost = pourcentage(vitals, income);
  const taxesCost = pourcentage(taxes, income);
  const hobbiesCost = pourcentage(hobbies, income);
  const otherCost = pourcentage(other, income);
  const saved = 100 - vitalsCost - taxesCost - hobbiesCost - otherCost;

  let message = "";
  let problem = [];
  let solution = [];

  if (saved < -10) {
    message = "You will be broke at this rate";
  } else if (saved < 0) {
    message = "You are in negative";
  } else if (saved === 0) {
    message = "It's too risky";
  } else if (saved > 0 && saved < 20) {
    message = "That's great, you are saving some money";
  } else if (saved >= 20) {
    message = "You are saving a good amount";
  }

  if (vitalsCost > 60) {
    problem.push("Your essentials expenses are too high");
  }

  if (hobbiesCost > 10) {
    problem.push("Your hobbies expenses are too high");
  }

  if (otherCost > 10) {
    problem.push("Your miscellaneous expenses are too high");
  }

  return {
    message: message,
    problem: problem,
    solution: solution,
    saved: saved.toFixed(2),
  };
}

// Test the function
console.log(results(1000, 800, 1, 101, 101));
