// Hier kommt die Spielelogik hin, welche die Elemente in index.html beeinflusst

/*
* Die Logik für die "Menü"-Buttons kann hier implementiert werden
*/

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
            document.getElementById("levelText").innerHTML = "Level 1";
            document.getElementById("gameimage").src = "Level1.png";
            document.getElementById("levelTipps").innerHTML = "Tipps für Level 1";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "235px";
            document.getElementById("gamebutton1").style.left = "320px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');
            
            break;

        case 2:
            alert("Hello young travler");

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
* Für andere Buttons, welche Aktionen innerhalb des Spiels auslösen sollen, kann hier Code stehen
*/

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
