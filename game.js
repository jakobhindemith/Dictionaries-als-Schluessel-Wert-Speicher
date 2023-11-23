// Hier kommt die Spielelogik hin, welche die Elemente in index.html beeinflusst

function show(elementID) {
    document.getElementById(elementID).style.border = "3px solid rgba(255, 255, 255, 0.7)"; // alte Farbe: 185, 185, 185
    
}

function hide(elementID) {
    document.getElementById(elementID).style.border = "3px solid rgba(255, 255, 255, 0)";

}

function showAll() {
    const levelButtons1 = document.querySelectorAll("[id^='insel']");
    levelButtons1.forEach(button => button.style.border = "3px solid rgba(255, 255, 255, 0.7)"); // alte Farbe: 185, 185, 185
    const levelButtons2 = document.querySelectorAll("[id^='gamebutton']");
    levelButtons2.forEach(button => button.style.border = "3px solid rgba(255, 255, 255, 0.7)"); // alte Farbe: 185, 185, 185
}

function hideAll() {
    const levelButtons1 = document.querySelectorAll("[id^='insel']");
    levelButtons1.forEach(button => button.style.border = "3px solid rgba(255, 255, 255, 0)"); // alte Farbe: 185, 185, 185
    const levelButtons2 = document.querySelectorAll("[id^='gamebutton']");
    levelButtons2.forEach(button => button.style.border = "3px solid rgba(255, 255, 255, 0)"); // alte Farbe: 185, 185, 185
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


function levelAction(levelID, LevelAction) {
    switch (levelID) {
        case 1:
            alert(LevelAction);
            break;
    
        default:
            break;
    }
}

function makeButtons(raetselID) {
    switch (raetselID) {
        case 1:
            
            // Buttons kreieren

            var buttonDetailsArray = [];

            buttonDetailsArray.push([100, 100, 100, 100, 1, 1]); // Button-Eigenschaften: (ID) - Top - Left - Width - Height - Level - onclick
            buttonDetailsArray.push([200, 500, 100, 100, 1, 2]); // Button-Eigenschaften: (ID) - Top - Left - Width - Height - Level - onclick



            for (let index = 0; index < buttonDetailsArray.length; index++) {
                const newButton = document.createElement("div");
                newButton.id = "levelbutton" + index;
                newButton.setAttribute('class', 'invisible-button');
                newButton.style.top = buttonDetailsArray[index][0] + "px";
                newButton.style.left = buttonDetailsArray[index][1] + "px";
                newButton.style.width = buttonDetailsArray[index][2] + "px";
                newButton.style.height = buttonDetailsArray[index][3] + "px";
                newButton.setAttribute('onclick', 'levelAction(' + buttonDetailsArray[index][4] + ', ' +  buttonDetailsArray[index][5] + ')');

                document.getElementById("game").appendChild(newButton);
            }
            break;
    
        default:
            break;
    }
}

function removeButtons() {
    const levelButtons = document.querySelectorAll("[id^='levelbutton']");
    levelButtons.forEach(button => button.remove());
}

function gameAction(viewID) {

    switch (viewID) {

        case 1:

            document.getElementById("insel2").style.display = "block";

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

            removeButtons();
            
            if (historyArray[historyArray.length - 1] != 1) {
                historyArray.push(1);
            }

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

            stopAllAudio();
            playaudio("waves.mp3", 0.02);
            removeButtons();


            if (historyArray[historyArray.length - 1] != 2) {
                historyArray.push(2);
            }
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
            removeButtons();

            
            if (historyArray[historyArray.length - 1] != 3) {
                historyArray.push(3);
            }
            break;

        case 4:

            removeButtons();

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "SchliessfachRaetsel.png";
            document.getElementById("levelTipps").innerHTML = "Lösen Sie das Rätsel";
        
            makeButtons(1);

            if (historyArray[historyArray.length - 1] != 4) {
                historyArray.push(4);
            }
            break;

        case 5:

            alert("Das ist die zweite Insel");

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
