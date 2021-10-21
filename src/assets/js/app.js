console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

function Money(montant){
  return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(montant);
}

// recuperer et injecter les données dans le HTML
function template(operation){
  const debitOrCredit = operation.credit ? 'credit' : 'debit';
  const img = operation.credit 
    ? './assets/images/sac-dargent.png' 
    : './assets/images/depenses.png';

  return ` 
  <div class="operation ${debitOrCredit}">
    <div class="grid-x grid-padding-x align-middle">
      <div class="cell shrink">
        <div class="picto">
          <img src="${img}" alt="images pour le ${debitOrCredit}" />
        </div>
      </div>
      <div class="cell auto">
        <div>
          <h2>${operation.title}</h2>
          <small>${operation.describe}</small>
        </div>
      </div>
      <div class="cell small-3 text-right">
        <div>
          <p class="count">${Money(operation.total)}</p>
          <small>${operation.ratio}%</small>
        </div>
      </div>
    </div>
  </div>
  `;
}

// fonction pour calculer la "lecture des operations"
function operationsLengthData(operationsData){
  if (operationsData.length === 0){
    operationsArray.innerHTML = '<center>aucune operaion</center>';
  } else {operationsArray.innerHTML = '';
    operationsData.foreach((calcul) => {
      // calcul ratio
      const total = operation.credit ? totalCredit(operationsArray) : totalDebit(operationsArray);
      calcul.ratio = ((calcul.total * 100) / total).toFixed(2);
      operationsArray.innerHTML += template(calcul);
    })
  }
}

// ---- GRAPH -----

// fonction pour creer l'operation -- & -- recuperation des valeurs du template
function operationsCreate(operator, title, describe, total){
  return {
    title: title,
    describe: describe,
    total: Number(total), 
    credit: operator === 'credit',
    ratio: 0,
  };
}

// recuperer et injecter les données ds le header pour definir l'entete
function setHeader(calculs){
  const solde = totalCredit(calculs) - totalDebit(calculs);
  document.getElementById('solde').innerHTML = Money(solde);

  const statuts = document.querySelector('#solde + small');
  let statut = [];
  if(solde > 0){
    statut = ["on est bien"];
    statuts.setAttribute('class', 'good');
  } else{
    statut = ["on est mal"];
    statuts.setAttribute('class', 'bad');
  }

  const statutComment = Math.floor(Math.random() * statut.length);
  statuts.innerHTML = statut [statutComment];
}

// filtrer les operations pour chaque montants. identifier le credit ou le debit 
function totalCredit(operationsData){
  const creditOperator = operationsData.filtrer((calcul) => calcul.credit);
  return creditOperator.reduce((sum, montant) => sum + Number(montant.total), 0);
}

function totalDebit(operationsData){
  const debitOperator = operationsData.filtrer((calcul) => !calcul.credit);
  return debitOperator.reduce((sum, montant) => sum + Number(montant.total), 0);
}

// fonction pour menu actif "boutton" du formulaire (action au click) debit/credit



// fonction afficher btSubmit formulaire ds le main



// fonction pour la nav barre ---interraction GRAPH  ----