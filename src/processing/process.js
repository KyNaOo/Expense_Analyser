function estimerRetraiteAvecPensionEtEsperanceDeVie(
  revenuMensuelEpargne,
  ageActuel,
  salaireMensuel,
  esperanceDeVie = 82
) {
  const revenuAnnuelEpargne = revenuMensuelEpargne * 12;
  const ageRetraiteCible = 65; // Âge cible pour la retraite
  const pourcentagePension = 0.5; // Supposons que la pension représente 60% du salaire mensuel moyen

  // Estimation de la pension annuelle basée sur le salaire mensuel
  const pensionAnnuelle = salaireMensuel * 12 * pourcentagePension;

  // Calcul de la durée de la retraite en fonction de l'espérance de vie
  const dureeRetraite = Math.max(esperanceDeVie - ageRetraiteCible, 0); // Assurez-vous que la durée n'est pas négative

  // Montant requis par an pour vivre pendant la retraite
  const montantRequisParAn = 25000;

  // Montant que l'épargne doit couvrir chaque année après la pension
  const montantRequisApresPension = montantRequisParAn - pensionAnnuelle;

  // Montant total nécessaire pour financer la retraite (en tenant compte de la pension)
  const montantTotalRequis = montantRequisApresPension * dureeRetraite;

  let sommeAccumulee = 0;
  let anneesNecessaires = 0;
  let age = ageActuel;

  // Simulation des économies jusqu'à ce que le montant requis soit atteint
  while (sommeAccumulee < montantTotalRequis && age < ageRetraiteCible) {
    sommeAccumulee += revenuAnnuelEpargne; // Ajout des économies annuelles
    anneesNecessaires++;
    age++;
  }

  if (sommeAccumulee >= montantTotalRequis) {
    return `Vous pourrez prendre votre retraite à ${age} ans avec une somme d'environ ${Math.round(
      sommeAccumulee
    )} €, et recevrez une pension annuelle d'environ ${Math.round(
      pensionAnnuelle
    )} €. Vous devez prévoir une retraite de ${dureeRetraite} ans, jusqu'à ${esperanceDeVie} ans.`;
  } else {
    return `Il sera difficile de prendre votre retraite à 65 ans avec un revenu mensuel de ${revenuMensuelEpargne} €. Vous aurez environ ${Math.round(
      sommeAccumulee
    )} € à 65 ans, avec une pension annuelle de ${Math.round(
      pensionAnnuelle
    )} €.`;
  }
}

// Exemple d'utilisation
console.log(estimerRetraiteAvecPensionEtEsperanceDeVie(500, 21, 2000));
