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

            if (LevelAction == -1) {
                document.getElementById("levelbuttonTextfeld").innerHTML = "";
            } else if (LevelAction == -2) {
                if (document.getElementById("levelbuttonTextfeld").innerHTML == "10502") {
                    document.getElementById("levelbuttonTextfeld").innerHTML = "vvvvv";
                } else {
                    document.getElementById("levelbuttonTextfeld").innerHTML = "xxxxx";
                }
            } else {
                document.getElementById("levelbuttonTextfeld").innerHTML += LevelAction;
            }
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

            // Button-Eigenschaften: (ID) - Top - Left - Width - Height - Level - onclick

            buttonDetailsArray.push([359, 547, 26, 10, 1, 1]);
            buttonDetailsArray.push([359, 579, 26, 10, 1, 2]);
            buttonDetailsArray.push([359, 613, 26, 10, 1, 3]);
            buttonDetailsArray.push([373, 547, 26, 10, 1, 4]);
            buttonDetailsArray.push([373, 579, 26, 10, 1, 5]);
            buttonDetailsArray.push([373, 613, 26, 10, 1, 6]);
            buttonDetailsArray.push([389, 547, 26, 10, 1, 7]);
            buttonDetailsArray.push([389, 579, 26, 10, 1, 8]);
            buttonDetailsArray.push([389, 613, 26, 10, 1, 9]);
            buttonDetailsArray.push([403, 547, 26, 10, 1, -1]); // löschen
            buttonDetailsArray.push([403, 579, 26, 10, 1, 0]);
            buttonDetailsArray.push([403, 613, 26, 10, 1, -2]); // enter


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

            // Textfeld kreieren
            const newTextField = document.createElement("div");
            newTextField.id = "levelbuttonTextfeld";
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.style.top = "334px";
            newTextField.style.left = "557px";
            newTextField.style.width = "74px";
            newTextField.style.height = "20px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "6px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            document.getElementById("game").appendChild(newTextField);
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

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Die Inseln";
            document.getElementById("gameimage").src = "Island.gif";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der Insel";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "400px";
            document.getElementById("gamebutton1").style.left = "98px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');

            stopAllAudio();
            playaudio("waves.mp3", 0.2);
            
            if (historyArray[historyArray.length - 1] != 1) {
                historyArray.push(1);
            }

            break;

        case 2:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

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
            playaudio("waves.mp3", 0.2);
            removeButtons();


            if (historyArray[historyArray.length - 1] != 2) {
                historyArray.push(2);
            }
            break;

        case 3:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";


            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Level_Postoffice.gif";
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

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "SchliessfachRaetsel.png";
            document.getElementById("levelTipps").innerHTML = "Der Modulo-Operator, oft durch das Prozentzeichen (%) dargestellt, ist ein mathematischer Operator, der den Rest einer Division zweier Zahlen berechnet. Wenn du beispielsweise a % b berechnest, gibt der Modulo-Operator den Rest der Division von a durch b zurück.<br><br>" +
            "Beispiel:<br>" + "10 % 3 ergibt 1, weil 10 durch 3 geteilt 3 mal geht und ein Rest von 1 bleibt.<br><br>" +
            "Der Modulo-Operator ist in vielen Anwendungen nützlich, insbesondere wenn es um Zyklen oder Wiederholungen geht. Zum Beispiel kann er verwendet werden, um festzustellen, ob eine Zahl gerade oder ungerade ist (wenn a % 2 gleich 0 ist, ist die Zahl gerade).<br><br>" +
            "1.Aufgabe: 3 % 2 = ?<br>" + // = 1
            "2.Aufgabe: 4 % 4 = ?<br>" + // = 0
            "3.Aufgabe: 5 % 8 = ?<br>" + // = 5
            "4.Aufgabe: 21 % 3 = ?<br>" + // = 0
            "5.Aufgabe: 44 % 14 = ?<br>"; + // = 2
            
        
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
* document.getElementById("insel2").style.display = "block"; //zum Freischalten der Inseln
*
*/
