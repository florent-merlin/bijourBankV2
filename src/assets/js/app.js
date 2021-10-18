console.log("Bijour Bank !");
/**
 * init foundation
 */
$(document).ready(function () {
  $(document).foundation();
});


/** traitement du formulaire **/
// *le formulaire envoi les données et les enregistre dans "#operationform" 
// *si formulaire envoyer ne pas faire de redirection
// *recuperer les données stoker dans #operationForm puis les afficher
// dans le 'main'=> class="grid-container"

let form = document.getElementById('operationForm');
let formdata = document.getElementById('exampleModal1');

addEventListener('operation credit');




// let btSubmit = document.querySelector('btSubmit');
// let desc = document.querySelector('desc');
// document.createElement('form');
console.log(form);
console.log(formdata);

// form.addEventListener
// FormDataEvent = document.getElementById('operationForm');

// function (eventLisner) {
//   return eventoneclic;
// }

// Event.preventDefault(); /**pour recuperer form;*/
// form.addEventListener("submit", listener [options]);


/////////////-- traitement du solde --////////////////////
let credit = 0 ;
let debit = 0 ;

const solde = credit - debit;
montant = solde;


if (montant > 0) {
  console.log(`vous etes dans le positif : ${montant} euros`);
} else if (montant < 0) {
  console.log(`vous etes a decouvert : ${montant}  euros`);
} else {
  console.log(`votre solde est de : ${montant}  euros`);
}

console.log();

// id="operationForm"
// id="operator"
      // value="credit"
      // value="debit"
// id="titre" name="titre"
// id="desc" name="desc"
// id="montant" name="montant"
// 
// class="btSubmit"


//  add.;

//  filtre. (conditions " if{}/else{}/else if() ")
      // Afficher (section credit) & (section debit)
      // Afficher le solde

    
// Rendre le graphique dynamique.
      // navigation section ("general" , "credit", "debit")
  
  
      // main
  //     class ="grid-container"
  //         class ="operation credit"
  //             class ="grid-x grid-padding-x align-middle"
  //                 class ="cell shrink"
  //                     class ="picto"
  //                       <img src="./assets/images/sac-dargent.png" alt="credit">
  //                 class="cell auto"

  //                 class="cell small-3 text-right"
  //                     class="count"

  //         class = "operation credit"
