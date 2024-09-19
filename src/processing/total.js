export function calculateSavings(income, expense, age) {
  const lifeExpectancy = 82;
  const monthsInYear = 12;
  const yearsInDecade = 10;

  // Calculate the number of years left until life expectancy
  const yearsRemaining = lifeExpectancy - age;

  // Calculate total savings per month
  const monthlySavings = income - expense;

  // Calculate total savings for remaining years
  const totalMonthsRemaining = yearsRemaining * monthsInYear;
  const totalSavings = totalMonthsRemaining * monthlySavings;

  // Calculate savings by decade, year, and month
  const savingsPerDecade = monthlySavings * monthsInYear * yearsInDecade;
  const savingsPerYear = monthlySavings * monthsInYear;
  const savingsPerMonth = monthlySavings;

  return {
    totalSavings: totalSavings.toFixed(2),
    savingsPerDecade: savingsPerDecade.toFixed(2),
    savingsPerYear: savingsPerYear.toFixed(2),
    savingsPerMonth: savingsPerMonth.toFixed(2),
  };
}

