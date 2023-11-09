// Hier kommt die Spielelogik hin, welche die Elemente in index.html beeinflusst

function show() {
    document.getElementById("gamebutton1").style.border = "3px solid rgba(185, 185, 185, 0.7)";

}

function hide() {
    document.getElementById("gamebutton1").style.border = "3px solid rgba(185, 185, 185, 0)";
}

function playaudio(audiofilename, volume) {
    const audio = new Audio(audiofilename);
    audio.volume = 0.2;
    audio.play();
}

function returnToMap() {
    // zur Karte zurückkehren

}

function restartGame() {
    const confirmed = confirm("Sind Sie sicher, dass Sie das Spiel neu starten wollen? Dadurch geht jeder Fortschritt verloren!");
    if (confirmed) {
        location.reload();
    }
}

function gameAction(viewID) {

switch (viewID) {

        case 1:

            // Ändern der Texte und Infos und des Bildes
            document.getElementById("schluesselText").innerHTML = "A";
            document.getElementById("levelText").innerHTML = "Die DHL Insel";
            document.getElementById("gameimage").src = "Island_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der Insel der Paketboten";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "235px";
            document.getElementById("gamebutton1").style.left = "320px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');
            
            break;

        case 2:
            document.getElementById("schluesselText").innerHTML = "AB";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Level_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Postoffice";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "235px";
            document.getElementById("gamebutton1").style.left = "320px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');

            break;

        case 3:

            break;

        case 4: 

            break;

        default:
            break;
    }

}

/*
* Codeschnipsel, die wir benötigen werden:
*
* Bild ändern:
* document.getElementById("gameimage").src = "neuesBild.jpg";
*
* Texte in der GameInfo ändern: // den Gleichen Code können wir auch bei den Tipps verwenden, oder wir nutzen einen kompletten neuen Tag
* document.getElementById("schluesselText").innerText = "Neuer Schlüssel";
* document.getElementById("levelText").innerText = "Aktuelles Level";
*
*/
