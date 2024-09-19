// Define the percentage function
function percentage(value, total) {
  return (value / total) * 100;
}

function results(income, vitals, taxes, hobbies, other) {
  const vitalsCost = percentage(vitals, income);
  const taxesCost = percentage(taxes, income);
  const hobbiesCost = percentage(hobbies, income);
  const otherCost = percentage(other, income);
  const saved = 100 - vitalsCost - taxesCost - hobbiesCost - otherCost;

  let message = "";
  let problem = [];
  let solution = [];
  let top1 = "";

  if (saved < -10) {
    message = "You will be broke at this rate";
    solution.push(
      "Find some help because it's critical, either you find a better job or lower your expense"
    );
  } else if (saved < 0) {
    message = "You are in the negative";
    solution.push(
      "Check your expenses one by one and try to find a way to reduce them"
    );
  } else if (saved === 0) {
    message = "It's too risky";
    solution.push("Try to save a little bit more next month");
  } else if (saved < 20) {
    message = "That's great, you are saving some money";
    solution.push("Try to invest that saved money");
    solution.push(
      "Or try to expense a little more but for your health, for example food quality"
    );
  } else {
    message = "You are saving a good amount";
    solution.push("Try to invest that saved money");
    solution.push(
      "Or try to expense a little more but for your health, for example food quality"
    );
  }

  if (vitalsCost > 60) {
    problem.push("Your essential expenses are too high");
    solution.push(
      "Reconsider what is really essential to you. If you smoke or drink, try to stop—it's for your health and your wallet."
    );
  }

  if (hobbiesCost > 10) {
    problem.push("Your hobbies expenses are too high");
    solution.push(
      "Reduce your hobby expenses by doing something cheaper, like drawing, watching videos/TV, or sports. Nightclubs and restaurants every day aren't good for your wallet."
    );
  }

  if (otherCost > 10) {
    problem.push("Your miscellaneous expenses are too high");
    solution.push(
      "Your miscellaneous expenses are questionable; try to reduce them."
    );
  }

  // Determine the main expense(s)
  const maxCost = Math.max(vitalsCost, hobbiesCost, otherCost);
  let topExpenses = [];

  if (vitalsCost === maxCost) topExpenses.push("essentials");
  if (hobbiesCost === maxCost) topExpenses.push("hobbies");
  if (otherCost === maxCost) topExpenses.push("miscellaneous");

  top1 = `${topExpenses.join(", ")}`;

  return {
    message: message,
    problem: problem,
    solution: solution,
    top1: top1,
  };
}

// Export the function using CommonJS syntax
module.exports = { results };
