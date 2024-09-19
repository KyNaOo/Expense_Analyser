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
  } else if (saved < 0) {
    message = "You are in the negative";
  } else if (saved === 0) {
    message = "It's too risky";
  } else if (saved < 20) {
    message = "That's great, you are saving some money";
  } else {
    message = "You are saving a good amount";
  }

  if (vitalsCost > 60) {
    problem.push("Your essential expenses are too high");
    solution.push(
      "Reconsider what is really essential to you. If you smoke or drink, try to stop—it, your health and wallet are very important !"
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

  if (vitalsCost > hobbiesCost && vitalsCost > otherCost) {
    top1 = "The main expense is essentials";
  } else if (hobbiesCost > vitalsCost && hobbiesCost > otherCost) {
    top1 = "The main expense is hobbies";
  } else if (otherCost > vitalsCost && otherCost > hobbiesCost) {
    top1 = "The main expense is miscellaneous";
  }

  return {
    message: message,
    problem: problem,
    solution: solution,
    top1: top1,
  };
}

// Export the function using CommonJS syntax
module.exports = { results };

// Test the function
console.log(results(1000, 1000, 1, 1800, 101));
