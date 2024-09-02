'use strict';

/*
    @author         : Vijayatharan Nivetha 11905642
                    & Vettivelkumaran Arrthy 11909026
                    Groupe 3
	Created         : 30/03/2023
	Last modified   : 13/04/2023
*/

/**************************************************************************************************************************** */ 
/*
Règle de jeu
 Le monstre peut Dormir ou être éveillé.
 Il peut courir ce qui lui fait perdre une energie.
 Il peut se battre ce qui lui fait perdre de la vie(-3) et de l'energie (-1).
 Il peut travailler qui a pour conséquence de diminuer de la vie (-1), de l'energie(-1) et de la joie(-3).
    mais ceci lui rapporte de l'argent(+2).
 Il peut manger ce qui lui apporte de la vie(+2) et lui fait perdre de l'argent(-3).
 Il peut se soigner ce qui lui apporte de la vie(+5) et perdre de l'argent(-5).
 Il peut jouer ce qui lui fait perdre de l'energie(-3) et apporte  de la joie(+5)
 */
/**************************************************************************************************************************** */

// Variable
let name ;
let life ;
let money ;
let awake ;
let happiness ;
let energy ;
let color ;
let renommer ;
let reponse ;

    // Récuperation des objets du DOM
    let run = document.getElementById("run");
    let fight = document.getElementById("fight");
    let work = document.getElementById("work");
    let sleep = document.getElementById("sleep");
    let eat = document.getElementById("eat");
    let show = document.getElementById("show");
    let actionbox = document.getElementById("actionbox");
    let monster = document.getElementById("monster");
    let statut1 = document.getElementById("statut").children[0];
    let statut2= document.getElementById("statut").children[1];
    let statut3 = document.getElementById("statut").children[2];
    let statut4 = document.getElementById("statut").children[3];
    let statut5 = document.getElementById("statut").children[4];
    let kill = document.getElementById("kill");
    let newLife = document.getElementById("new");
    let statut = document.getElementById("statut");
    
    //Partie Créativité.
    let heal = document.getElementById("heal");
    let play = document.getElementById("play");
    let monster1 = document.getElementById("monster1");
    let monster2 = document.getElementById("monster2");
    let monster3 = document.getElementById("monster3");
    let image = document.getElementById("image");
    let bob = "image/Bob.png";
    let scruffy = "image/Scruffy.png";
    let clinton = "image/Clinton.png";
    let vie = "image/vie.png";
    let energie = "image/energie.png";
    let piece = "image/piece.png";
    
    // Fonctions
    
/******************************************************************************* */ 
    // Fonction partie creative

    // Fonction qui créer la barre d'état de vie, d'argent, d'energie et de joie. 
    function miseEnForme(s){
        let bord = "solid black";
        let largeur = "500px";
        let hauteur = "20px";

        s.style.border = bord ;
        s.style.height = hauteur ;
        s.style.width = largeur ;
        s.style.margin = "1em" ;
    }
    // Changer la couleur de la barre selon l'état du monstre.
    function changerEtat(){
        if (!awake){
            color = "grey" ; 
        }
        else {
            color = "white" ;
        }
        statut5.style.background = color ;
    } 
    // Faire le choix du monstre.
    function choixMonstre(src, nom, vie, argent, joie, energie){
        initMonstre(nom, vie, argent, joie, energie);
        renommerMonstre();
        image.setAttribute("src", src);
        activation_boutton(("Vous avez choisi " + name + "."), true, false);
        updateStatus();
    }
    // Demander si l'utilisateur veut renommer le monstre.
    function renommerMonstre(){
        renommer = confirm(' Voulez-vous renommer le monstre ?');
        if (renommer) {
            reponse = prompt(' Comment voulez-vous le renommer ?');
            name = reponse;
        }
    }
/******************************************************************************* */

// Initialisation du montre.
function initMonstre(nom, vie, argent, joie, energie){
    name = nom ;
    life = vie ;
    money = argent;
    happiness = joie;
    energy = energie
    awake = true ;
}

// Affichage des différents attributs du monstre.
function afficheMonstre(){
    logBoite("Salut!!");
    return ('Nom : ' + name + '; Vie : ' + life + '; Argent : ' + money + '; Reveillé : ' + awake) ;
}
// Fonction qui lance l'application
function go(){
    initMonstre("???", 0, 0, 0, 0);
    updateStatus();
    show.addEventListener("click", () => {
        console.log(afficheMonstre());
    } ) ;
    activation_boutton("Faite le choix du monstre", false, true);
    miseEnForme(statut1);
    miseEnForme(statut2);
    miseEnForme(statut3);
    miseEnForme(statut4);
    miseEnForme(statut5);
}

// Affichage des messages dans la boite 
function logBoite(message){
    let node = document.createElement("p");
    let premier = actionbox.firstChild;
    let textMessage = document.createTextNode(message);
    node.appendChild(textMessage);
    actionbox.insertBefore(node, premier);
}
//console.log(logBoite("salut!")); ( test )

// Mettre à jour les attributs du monstre
function  updateStatus(){
    const endormi = document.createTextNode("Endormi");
    const eveille = document.createTextNode("Eveillé");
    const nomMonstre = document.createTextNode(name);
    const pointDeVie = document.createTextNode("Vie : " + life);
    const argentTotal = document.createTextNode("Argent : " + money);
    const nivEnergie = document.createTextNode("Energie : " + energy);
    const nivDeJoie = document.createTextNode("Joie : " + happiness);
    
    monster.replaceChild(nomMonstre, monster.childNodes[0]);
    statut1.replaceChild(pointDeVie, statut1.childNodes[0]);
    statut2.replaceChild(argentTotal, statut2.childNodes[0]);
    statut3.replaceChild(nivEnergie,statut3.childNodes[0]);
    statut4.replaceChild(nivDeJoie,statut4.childNodes[0]);
    if (awake) {
        statut5.replaceChild(eveille, statut5.childNodes[0]);
    }
    else {
        statut5.replaceChild(endormi, statut5.childNodes[0]);
    }
    changerCouleur(statut1,life);
    changerCouleur(statut2, money);
    changerCouleur(statut3, energy);
    changerCouleur(statut4, happiness);
    changerEtat();
    //changerBordure();
}

// Changement de couleur des attributs
function changerCouleur(s,e){
    if (e == 0){
        s.style.background = "red";
    }
    if (0<e && e <= 9){ 
        let pourcentage = e * 10 ;
        color = "linear-gradient(to right, green 0% " + pourcentage +"% , red " + pourcentage +"% 100%)";
        s.style.background = color ;
    }
    if (9<e && e<= 10){
        color = "linear-gradient(to right, red 0%, green 0% 100% )";
        s.style.background = color ; 
    }
    if (10<e && e<= 19){
        let pourcentage2 = (e-10)*10 ;
        color = "linear-gradient(to right, blue 0% "+ pourcentage2 +"%, green "+ pourcentage2 +"% 100%)";
        s.style.background = color ;
    }
    if (19<e){
        color = "linear-gradient(to right, green 0%, blue 0% 100% )";
        s.style.background = color ; 
    }
   
}

// Fonction action de monstre

function courir(){
    if (energy > 1) {
        energy -= 1;
        logBoite("Il faut courir pour être en bonne forme ! ");
    }
    else {
        logBoite("Je suis trop fatigué, je ne peux plus courir.");
    }
    updateStatus();
}

function sebattre() {
    if (life > 3 && energy > 1) {
        life -= 3; 
        energy-- ;  
        logBoite("Je me bas, je suis trop fort ! ;)");
    }
    else {
    logBoite("Je ne pas assez de force pour me battre... ");
    }
    updateStatus();
};

function travailler(){
    if (life > 1 && energy > 1 && happiness > 3) {
        life -= 1;
        energy--;
        happiness -= 3 ;
        money += 2;
        logBoite("Youpi j'ai gagné de l'argent ! :)");
        
    }
    else if (life == 0 || energy <= 1 ) {
        logBoite("Je suis dans l'incapacité de travailler...");
    }
    else {
        logBoite("Je n'ai pas la foi de travailler.")
    }
    updateStatus();  
}

function manger(){
    if(money > 2){
        money -= 3;
        life += 2;
        logBoite("Miam, c'est bon ! ");
    }
    else {
        logBoite("Oups, I'm broke : pas assez d'argent pour manger :( ");
    }
    updateStatus();
};

// fonction annexe
/******************************** */
function activation_boutton(message, state, activation){
    awake = state;
    let auditeurs = [run, eat, fight, work, sleep, heal, play, kill, newLife];
    for(let i in auditeurs){
        auditeurs[i].disabled = activation;
    }
    logBoite(message);
    updateStatus();
};
/******************************** */
function dormir(){
    activation_boutton("Bonne nuit... Zzz...", false, true);
    energy += 2;
    window.setTimeout(activation_boutton, 5000, "Je suis reveillé !!", true, false);
    
};

function actionauhasard(){
    if(life > 0){
        let auditeurs = [courir, sebattre, travailler, manger, dormir, seSoigner,toPLay];
        let action = Math.floor(Math.random() * auditeurs.length);
        let y = auditeurs[action];
        y();
    }
};

function killMonster(){
    activation_boutton("I'm dead :/", false, true);
    initMonstre("Bob is dead", 0, 0);
    updateStatus();
};

function giveNewLife(){
    activation_boutton("I'm alive!! :) ", true, false)
    initMonstre(name, 20, 10, 30, 30);
    updateStatus();
}

// Action partie créative
/*********************************************************************************************** */
function seSoigner(){
    if(money>4){
        life += 5 ;
        money -= 5 ;
        logBoite("Prenons une potion magique pour se soigner.");
    }
    else{
        logBoite("I'm broke, je n'ai plus les moyens d'acheter une potion :/")
    }
    updateStatus();
}

function toPLay(){
    if ( energy >3){
        activation_boutton("Je veux bien jouer avec toi.", false, true); 
        energy -= 3;
        happiness += 5;
        window.setTimeout(activation_boutton, 3000, "C'était une joie de jouer avec toi!!", true, false);
    }
    else{
        logBoite("Nan dédolé je n'est plus d'énergie.");
    }
    updateStatus();
}
/************************************************************************************************ */



//Programme principale 
window.addEventListener("load", () => {
    go();
    run.addEventListener("click", courir);
    fight.addEventListener("click", sebattre);
    work.addEventListener("click", travailler);
    eat.addEventListener("click", manger);
    sleep.addEventListener("click", dormir);
    kill.addEventListener("click", killMonster);
    newLife.addEventListener("click", giveNewLife);
    heal.addEventListener("click", seSoigner) ;
    play.addEventListener("click",toPLay);
    
    /******************************************************************************** */
    // Action : partie créative
    monster1.addEventListener("click", () => {choixMonstre(bob,"Bob", 20, 10, 30, 30)});
    monster2.addEventListener("click", () => {choixMonstre(scruffy,"Scruffy", 20, 30, 30, 10)});
    monster3.addEventListener("click", () => {choixMonstre(clinton, "Clinton", 10, 30, 10, 20)});
    
    /******************************************************************************** */
    setInterval(actionauhasard, 10000);

})