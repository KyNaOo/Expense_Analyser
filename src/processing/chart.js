function chart(income, vitals, taxes, hobbies, other) {
  const vitalsCost = pourcentage(vitals, income);
  const taxesCost = pourcentage(taxes, income);
  const hobbiesCost = pourcentage(hobbies, income);
  const otherCost = pourcentage(other, income);
  const saved = 100 - vitalsCost - taxesCost - hobbiesCost - otherCost;

  return {
    vitalsCost: vitalsCost,
    taxesCost: taxesCost,
    hobbiesCost: hobbiesCost,
    otherCost: otherCost,
    saved: saved,
  };
}

function pourcentage(first, second) {
  const percent = first * 100;
  return percent / second;
}
