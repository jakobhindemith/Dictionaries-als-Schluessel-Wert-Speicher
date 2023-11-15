// Hier kommt die Spielelogik hin, welche die Elemente in index.html beeinflusst

function show() {
    document.getElementById("gamebutton1").style.border = "3px solid rgba(255, 255, 255, 0.7)"; // alte Farbe: 185, 185, 185

}

function hide() {
    document.getElementById("gamebutton1").style.border = "3px solid rgba(255, 255, 255, 0)";
}

function zurueck() {
    if (historyArray.length > 1) {
        historyArray.pop();
        gameAction(historyArray[historyArray.length - 1]);
    }
}

const audioArray = []; // globally accessible array to store audio objects
const historyArray = []; // globally accessible array to store history

function playaudio(audiofilename, volume) {

    const audio = new Audio(audiofilename);
    audio.volume = volume;
    audio.loop = true;
    audioArray.push(audio); // push the audio object to the array
    audio.play();
}

function stopAllAudio() {
    // Stop all audio from the array
     audioArray.forEach(audio => {
        audio.pause();
    });
}

function returnToMap() {
    gameAction(1);
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
            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Die Inseln";
            document.getElementById("gameimage").src = "Island.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der Insel";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "400px";
            document.getElementById("gamebutton1").style.left = "98px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');

            stopAllAudio();
            playaudio("waves.mp3", 0.2);
            
            historyArray.push(1);
            break;

        case 2:
            // Ändern der Texte und Infos und des Bildes
            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Die DHL Insel";
            document.getElementById("gameimage").src = "Island_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der Insel der Paketboten";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "235px";
            document.getElementById("gamebutton1").style.left = "320px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(3)');

            historyArray.push(2);

            break;

        case 3:
            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Level_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Postoffice";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "390px";
            document.getElementById("gamebutton1").style.left = "498px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(4)');

            stopAllAudio();
            playaudio("8-bit-arcade.mp3", 0.02);
            
            historyArray.push(3);

            break;

        case 4: 

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "SchliessfachRaetsel.png";
            document.getElementById("levelTipps").innerHTML = "Lösen Sie das Rätsel";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "465px";
            document.getElementById("gamebutton1").style.left = "699px";
            document.getElementById("gamebutton1").style.width = "70px";
            document.getElementById("gamebutton1").style.height = "70px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(5)');
           
            historyArray.push(4);

            break;

        case 5:

            alert("Sie haben das Rätsel gelöst!");

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
