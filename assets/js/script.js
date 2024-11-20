// =========================================================================
// Déclaration des variables                                               =
// =========================================================================
const REGEX_CODE_PRODUIT = /(([\d\w]){5}-){2,4}([\d\w]){5}/;
const listeProduits = {
    "Q1JBC-3ZPX8-TVHUH" : "Final Fantasy 1",
    "P3CJN-JNGJM-XYYT4" : "Contra",
    "2RCWA-XPRPX-GJHPR" : "The Legend of Zelda",
    "H4LS8-L1L3T-08D9X" : "Rygar",
    "KBZB7-PQYDY-D5TMZ-MUABS-JNGJM" : "Metroid",
    "VPTU1-9UZXA-X4ED4-F596J-XPRPX" : "Ninja Gaiden",
    "SUY17-21D57-5QYJU-UE6PN-HZ452" : "Kirby's Adventure"
};
const erreurValidation = {
    "terme" : "Vous devez accepter les termes de l’Accord de souscription Vapeur pour finaliser la transaction.",
    "formatInvalide" : "Le code produit que vous avez saisie est invalide, il ne respecte pas le format requis.",
    "produitInexistant" : "Aucun produit n'est associé au code de produit saisie."
};


// Code pour provoquer une animation sur le bouton Activer
const boutonActiver = document.querySelector('.bouton-activation');
boutonActiver.addEventListener('click', (e) => e.target.classList.add('bouton-click'));
boutonActiver.addEventListener('transitionend', (e) =>  e.target.classList.remove('bouton-click'));

/**
 * Recherche dans le tableau listeProduits un produit associé a un code de produit
 * @param {string} codeProduit Le code de produit à valider
 * @returns true si le produit existe dans le tableau
 */
function isProduitExiste(codeProduit) {
    return listeProduits[codeProduit.toString().toUpperCase()] ? true : false;
}

// =========================================================================
// Ajoutez votre code plus bas                                             =
// =========================================================================

//Validation que le code de produit est valide
let inputActivation = document.getElementById("cle-activation");
let monFormulaire = document.getElementById("form-activation");
monFormulaire.addEventListener("submit", validationFormulaire);
let messageErreur = document.getElementById("message-erreur");

function validationFormulaire(e) {
    e.preventDefault();

    let formValid = false;

    //Vérifie que la clé est valide et dans la liste de produit
    let cle_valid = false;
    if (inputActivation.value.match(REGEX_CODE_PRODUIT)) {
        if (isProduitExiste(inputActivation.value)) {
            cle_valid = true;
            console.log("ça marche")
        } else {
            messageErreur.classList.remove("hidden");
            messageErreur.innerText = erreurValidation["produitInexistant"];
        }
    } else {
        messageErreur.classList.remove("hidden");
        messageErreur.innerText = erreurValidation["formatInvalide"];
    }

    //Vérifie que la case des termes est coché
    const terme = document.getElementById("declaration").checked;
    let termeText = document.getElementById("test");

    if (!terme) {
        messageErreur.innerText = erreurValidation["terme"];
        termeText.style.setProperty("color", "var(--couleur-texte-invalide)");
    }

    if (cle_valid && terme) {
        formValid = true;
    }

    if (formValid) {
        monFormulaire.submit();
    }
}

