console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});

function money(montant){
  return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(montant);
}

// recuperer et injecter les données dans le HTML
function template(operation){
  const debitOrCredit = operation.credit ? 'credit' : 'debit';
  const img = operation.credit ? './assets/images/sac-dargent.png' : './assets/images/depenses.png';

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
          <small>${operation.description}</small>
        </div>
      </div>
      <div class="cell small-3 text-right">
        <div>
          <p class="count">${money(operation.total)}</p>
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
    operationsList.innerHTML = '<center>aucune operation</center>';
  } else {operationsList.innerHTML = '';
    operationsData.forEach((calcul) => {
        // calcul ratio
        const total = calcul.credit ? totalCredit(operationsData) : totalDebit(operationsData);
        calcul.ratio = ((calcul.total * 100) / total).toFixed(2);
        operationsList.innerHTML += template(calcul);
      });
  }
}

// ---- GRAPH -----
function allGraph(operationsData){
  let solde = 0;
  config.data.labels = [];
  config.data.datasets[0].data = [];
  chart.update();
  operationsData.forEach((calcul) => { 
    const label = `${calcul.title} (${calcul.credit ? '+' : '-'} ${calcul.total})`; 
    solde = calcul.credit ? solde + calcul.total : solde - calcul.total;
    addTemperature(label, solde);
    });
}

// fonction pour creer l'operation -- & -- recuperation des valeurs du template
function operationsCreate(operator, title, description, total){
  return {
    title: title,
    description: description,
    total: Number(total), 
    credit: operator === 'credit',
    ratio: 0,
  };
}

// recuperer et injecter les données ds le header pour definir l'entete
function setHeader(calculs){
  const solde = totalCredit(calculs) - totalDebit(calculs);
  document.getElementById('solde').innerHTML = money(solde);

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
  const creditOperator = operationsData.filter((calcul) => calcul.credit);
  return creditOperator.reduce((sum, montant) => sum + Number(montant.total), 0);
}

function totalDebit(operationsData){
  const debitOperator = operationsData.filter((calcul) => !calcul.credit);
  return debitOperator.reduce((sum, montant) => sum + Number(montant.total), 0);
}

// fonction pour menu actif "boutton" du form (action au click) debit/credit
function menu(eltMenu){
  all.removeAttribute('class', 'active');
  credit.removeAttribute('class', 'active');
  debit.removeAttribute('class', 'active');
  eltMenu.setAttribute('class', 'active');
}

// fonction afficher btSubmit formulaire ds le main
function submitForm(operationForm) {
  operationForm.operator.value = '--';
  operationForm.titre.value = '';
  operationForm.desc.value = '';
  operationForm.montant.value = null; 
}

// fonction pour la nav barre ---interraction GRAPH  ----
// 
const all = document.querySelector('.navHeader a');
all.addEventListener('click', (e) => {
  menu(all);
  operationsLengthData(operationsData);
  allGraph(operationsData);
});

// page credit
const credit = document.querySelector('.navHeader a:nth-child(2)');
credit.addEventListener('click', (e) => {
  menu(credit);
  operationsLengthData(operationsData.filter((calcul) => calcul.credit));
  allGraph(operationsData);
});

// page debit
const debit = document.querySelector('.navHeader a:nth-child(3)');
debit.addEventListener('click', (e) => {
  menu(debit);
  operationsLengthData(operationsData.filter((calcul) => !calcul.credit));
  allGraph(operationsData);
});

// formulaire nouvelle operation
const subForm = document.querySelector('#operationForm button[type=submit]');
subForm.setAttribute('data-close','');
subForm.addEventListener('click', (e) => {
  e.preventDefault();
  const operationForm = document.getElementById('operationForm');

  //------------- test des données ----------
  const operator = operationForm.operator.value;
  const titre = operationForm.titre.value;
  const desc = operationForm.desc.value;
  const montant = operationForm.montant.value;
  
  const calcul = operationsCreate(operator, titre, desc, montant);
  operationsData.push(calcul);
  localStorage.setItem('datas', JSON.stringify(operationsData));

  submitForm(operationsData);
  setHeader(operationsData);
  allGraph(operationsData);
  operationsLengthData(operationsData);
});

// Affichage de la page
// data test :
let operationsData = [];
if (localStorage.getItem('datas')) {
  operationsData = JSON.parse(localStorage.getItem('datas'));
}

//----- Affichage principal ------------- 
const operationsList = document.querySelector('main .grid-container');
setHeader(operationsData);
operationsLengthData(operationsData);
allGraph(operationsData);
