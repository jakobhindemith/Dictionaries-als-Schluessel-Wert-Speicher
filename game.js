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

function gameAction() {
    const levelTippsCollection = [];
    levelTippsCollection.push("Hallo. <p>Das ist ein Absatz</p><p>Und das ist auch ein Absatz</p>");

    const levels = {levelNumber: 1, levelName: "Der Levelname", levelSchluessel: "ZZ", levelImage: 1, levelTipps: ""}; // Neues Levelobjekt, die am Ende in ein Array gespeichert werden könnten
    levels.levelTipps = levelTippsCollection[levels.levelNumber - 1];
    
    // Ändern der Texte und Infos und des Bildes
    document.getElementById("schluesselText").innerHTML = levels.levelSchluessel;
    document.getElementById("levelText").innerHTML = levels.levelNumber + " - " + levels.levelName;
    document.getElementById("gameimage").src = "Level" + levels.levelImage + ".png"; // Wenn Levelimages als "Level1.jpg" ... gespeichert werden, können sie so duch automatisches Hochzählen aufgerufen werden
    document.getElementById("levelTipps").innerHTML = levels.levelTipps;

    // Ändern des Buttons
    document.getElementById("gamebutton1").style.top = "235px";
    document.getElementById("gamebutton1").style.left = "320px";
    document.getElementById("gamebutton1").style.width = "100px";
    document.getElementById("gamebutton1").style.height = "100px";
    document.getElementById("gamebutton1").setAttribute('onclick', 'clickedAction()');
}

function clickedAction() {
    alert("Hello young travler");
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
