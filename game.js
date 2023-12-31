/*
This is the game.js file. It contains all the functions that are needed to play the game.

The game is divided into different views. Each view has its own ID. The views are managed by the gameAction() function.

The gameAction() function is called by the buttons in the buttonbar. The buttons are managed by the levelAction() function.

The levelAction() function is called by the buttons in the game. The buttons are managed by the makeButtons() function.

The makeButtons() function is called by the gameAction() function.

The gameAction() function is called by the levelAction() function.

*/


/*
The function show() and hide() are used to show and hide the button which the player is can click to navigate through the game
*/

function show(elementID) {
    document.getElementById(elementID).style.border = "3px solid rgba(255, 255, 255, 0.7)"; // alte Farbe: 185, 185, 185
}

function hide(elementID) {
    document.getElementById(elementID).style.border = "3px solid rgba(255, 255, 255, 0)";
}


/*
The function showAll() and hideAll() are used to show and hide all the buttons which the player is can click to navigate through the game
*/

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


/*
The function zurueck() is used to go back to the previous view
*/

function zurueck() {
    if (historyArray.length > 1) {
        historyArray.pop();
        gameAction(historyArray[historyArray.length - 1]);
    }
}

const audioArray = [];              // globally accessible array to store audio objects
const speakeraudioArray = [];       // globally accessible array to store audio objects
const historyArray = [];            // globally accessible array to store history


// Manage Island Interactions
var insel2ON = false;
var insel3ON = false;
var insel4ON = false;

// Manage Quiz Interactions
var Raetsel1Geloest = false; // TRESOR
var parkplatzGeloest = true; // PARKPLATZ -> deaktiviert
var Raetsel2Geloest = false; // GYM PC
var Raetsel3Geloest = false; // POSTREGAL
var Raetsel4Geloest = false; // LAGERHAUS
var Raetsel5Geloest = false; // TOR

// Speaker-Audio
var speakerAudioPlayed = [];        // Keep track of played speaker audio

// Variables for Levels
var pressedcount = 0;               // Numers of times the button was pressed for Level Postregal
var fragencount = 0;                // Number of questions asked for Level Lagerhaus
var fragencountTor = 0;             // Number of questions asked for Level Tor


/*
The function playaudio() and playspeakeraudio() are used to play an audio file

The function stopAllAudio() and stopAllSpeakerAudio() are used to stop all audio files and remove them from the audioArray to free up memory
*/

function playaudio(audiofilename, volume, looped) {
    const audio = new Audio(audiofilename);
    audio.volume = volume;
    audio.loop = looped;
    audioArray.push(audio);
    audio.play();
}

function playspeakeraudio(audiofilename, volume, looped) {
    const audio = new Audio(audiofilename);
    audio.volume = volume;
    audio.loop = looped;
    speakeraudioArray.push(audio);
    audio.play();
}

function stopAllAudio() {
     audioArray.forEach(audio => {
        audio.pause();
        audio.remove();
    });
}

function stopAllSpeakerAudio() {
     speakeraudioArray.forEach(audio => {
        audio.pause();
        audio.remove();
    });
}


/*
The function returnToMap() and restartGame() are used to return to the map or restart the game
*/

function returnToMap() {
    gameAction(1);
}

function restartGame() {
    const confirmed = confirm("Sind Sie sicher, dass Sie das Spiel neu starten wollen? Dadurch geht jeder Fortschritt verloren!");
    if (confirmed) {
        location.reload();
    }
}


/*
The function levelAction() is used to manage the Quiz-Interactions
*/

function levelAction(levelID, LevelAction) {

    switch (levelID) {

        case 1: // Level: Tresor

            if (LevelAction == -1) {
                playspeakeraudio("button.mp3", 0.05, false);
                document.getElementById("levelbuttonTextfeld").innerHTML = "";

            } else if (LevelAction == -2) {

                if (document.getElementById("levelbuttonTextfeld").innerHTML == "1625") {
                    document.getElementById("levelbuttonTextfeld").innerHTML = "vvvv";

                    playspeakeraudio("key-twist-in-lock.mp3", 1, false);
                    playspeakeraudio("post_ende.wav", 1, false);

                    removeButtons();

                    insel2ON = true;
                    Raetsel1Geloest = true;

                    document.getElementById("schluesselText").innerHTML = "1 / 4";
                    document.getElementById("gameimage").src = "SchliessfachRaetselOpen.png";

                    setTimeout(function() {
                        gameAction(2);
                    }, 3000);

                } else {

                    document.getElementById("levelbuttonTextfeld").innerHTML = "xxxx";

                    stopAllSpeakerAudio();
                    playspeakeraudio("invalid-selection.mp3", 0.2, false);
                    playspeakeraudio("post_falsch_1.wav", 0.8, false);   
                }
            } else {

                playspeakeraudio("button.mp3", 0.05, false);

                document.getElementById("levelbuttonTextfeld").innerHTML += LevelAction;
            }

            break;

        case 2: // Level: PC im Fittnessstudio

            if (LevelAction == 1) {

                if (document.getElementById("levelbuttonTextfeldPCInput1").value == "335") {

                    document.getElementById("levelbuttonTextfeldPCInput1").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInput2").disabled = false;
                    document.getElementById("levelbuttonTextfeldPCInput2").focus();
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").setAttribute('onclick', 'levelAction(2, 2)');
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.top = "304px";

                    stopAllSpeakerAudio();
                    playspeakeraudio("ID_zu_groß.wav", 0.8, false);

                } else {

                    document.getElementById("levelbuttonTextfeldPCInput1").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput1").focus();

                    stopAllSpeakerAudio();
                    playspeakeraudio("Erstes_Raetsel_falsch.wav", 0.8, false);
                }
            } else if (LevelAction == 2) {

                if (document.getElementById("levelbuttonTextfeldPCInput2").value == "5") {

                    document.getElementById("levelbuttonTextfeldPCInput2").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInput3").disabled = false;
                    document.getElementById("levelbuttonTextfeldPCInput3").focus();
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").setAttribute('onclick', 'levelAction(2, 3)');
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.top = "378px";

                    stopAllSpeakerAudio();
                    playspeakeraudio("erklaerung_lineares_sondieren.wav", 0.8, false);

                } else {

                    document.getElementById("levelbuttonTextfeldPCInput2").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput2").focus();

                    stopAllSpeakerAudio();
                    playspeakeraudio("Zweites_Raetsel_falsch.wav", 0.8, false);
                }            
            } else if (LevelAction == 3) {

                if (document.getElementById("levelbuttonTextfeldPCInput3").value == "21") {

                    document.getElementById("levelbuttonTextfeldPCInput3").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.display = "none";
                    Raetsel2Geloest = true;
                    insel3ON = true;
                    document.getElementById("schluesselText").innerHTML = "2 / 4";

                    stopAllSpeakerAudio();
                    playspeakeraudio("Outro_zweite_Insel.wav", 0.8, false);

                    setTimeout(function() {
                        gameAction(5);
                    }, 7000);

                } else {

                    document.getElementById("levelbuttonTextfeldPCInput3").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput3").focus();

                    stopAllSpeakerAudio();
                    playspeakeraudio("Zweites_Raetsel_falsch.wav", 0.8, false);
                }  
            }

            break;

        case 3: // Level: Postregal

            if (LevelAction == 1 && pressedcount == 0) {

                stopAllSpeakerAudio();
                playspeakeraudio("letter.mp3", 1, false);
                document.getElementById("gameimage").src = "Level_PostofficeB.gif";
                pressedcount++;

            } else if (LevelAction == 2 && pressedcount == 1) {

                stopAllSpeakerAudio();
                pressedcount++;
                playspeakeraudio("post_2.mp3", 1, false);
                document.getElementById("gameimage").src = "Level_PostofficeC.gif";

            } else if (LevelAction == 3 && pressedcount == 2) {

                stopAllSpeakerAudio();
                pressedcount++;
                document.getElementById("gameimage").src = "Level_Postoffice.gif";
                Raetsel3Geloest = true;

                playspeakeraudio("letter.mp3", 1, false);
                playspeakeraudio("post_3.mp3", 1, false);

                setTimeout(function() {
                    gameAction(3);
                }, 18000);

            } else {

                stopAllSpeakerAudio();
                playspeakeraudio("falsche_antwort.wav", 1, false);
            }

            break;

        case 4: // Level: Lagerhaus

            if (fragencount == 0) { // Frage 1
                   
                if (LevelAction == 1) {

                    stopAllSpeakerAudio();
                    playspeakeraudio("möbel_3 (1).wav", 0.8, false);

                    fragencount++;

                    document.getElementById("levelbuttonTextfeld").innerHTML = "Warum sollte die Arraygröße in einer HashMap immer eine Primzahl sein?";
                    document.getElementById("levelbutton0").innerHTML = "A) Um einen schnelleren Zugriff zu garantieren";
                    document.getElementById("levelbutton1").innerHTML = "B) Um Kollisionen zu vermeiden";
                    document.getElementById("levelbutton2").innerHTML = "C) Weil es bei der Überprüfung der Datenintegrität hilft";

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("falsche_antwort.wav", 0.8, false);
                }

            } else if (fragencount == 1) { // Frage 2
               
                if (LevelAction == 2) {

                    stopAllSpeakerAudio();
                    playspeakeraudio("möbel_4.wav", 0.8, false);

                    fragencount++;

                    removeButtons();
                    Raetsel4Geloest = true;
                    insel4ON = true;
                    document.getElementById("schluesselText").innerHTML = "3 / 4";
                    gameAction(11);

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("falsche_antwort.wav", 0.8, false);
                }

            }

            break;

        case 5: // Level: Tor

            if (fragencountTor == 0) { // Frage 1
                    
                if (LevelAction == 2) {

                    stopAllSpeakerAudio();

                    fragencountTor++;

                    document.getElementById("levelbuttonTextfeld").innerHTML = "Was muss man beachten, wenn man beim &quot;Linearen Sondieren&quot; einen Eintrag löscht?";
                    document.getElementById("levelbutton0").innerHTML = "A) Die HashWerte der anderen Einträge ändern sich";
                    document.getElementById("levelbutton1").innerHTML = "B) Die gesamte Tabelle muss gerehasht werden";
                    document.getElementById("levelbutton2").innerHTML = "C) Die entstehende Lücke macht das Suchen nach Elementen nach ihr unmöglich";

                    playspeakeraudio("8-bit-powerup-6768.mp3", 0.1, false);

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("letztes_Quiz_falsche_Antwort.wav", 0.8, false);
                }

            } else if (fragencountTor == 1) { // Frage 2
            
                if (LevelAction == 3) {

                    stopAllSpeakerAudio();

                    fragencountTor++;

                    document.getElementById("levelbuttonTextfeld").innerHTML = "Wie kann man diese Fehler beheben?";
                    document.getElementById("levelbutton0").innerHTML = "A) Die Lücke wird mit dem letzten ebenfalls mit diesem HashWert kollidierten Eintrag gefüllt";
                    document.getElementById("levelbutton1").innerHTML = "B) Es wird ein Platzhalter eingefügt";
                    document.getElementById("levelbutton2").innerHTML = "C) Er muss nicht behoben werden";

                    playspeakeraudio("8-bit-powerup-6768.mp3", 0.1, false);

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("letztes_Quiz_falsche_Antwort.wav", 0.8, false);
                }

            } else if (fragencountTor == 2) { // Frage 2
            
                if (LevelAction == 1) {

                    stopAllSpeakerAudio();

                    fragencountTor++;

                    document.getElementById("levelbuttonTextfeld").innerHTML = "Wann muss eine HashTabelle gerehasht werden?";
                    document.getElementById("levelbutton0").innerHTML = "A) Wenn sich die Hashfunktion ändert";
                    document.getElementById("levelbutton1").innerHTML = "B) Wenn ein neues Element hinzugefügt wird";
                    document.getElementById("levelbutton2").innerHTML = "C) Wenn ein Element gelöscht wird";

                    playspeakeraudio("8-bit-powerup-6768.mp3", 0.1, false);

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("letztes_Quiz_falsche_Antwort.wav", 0.8, false);
                }

            } else if (fragencountTor == 3) { // Frage 2
            
                if (LevelAction == 1) {

                    stopAllSpeakerAudio();

                    fragencountTor++;

                    removeButtons();
                    Raetsel5Geloest = true;
                    document.getElementById("schluesselText").innerHTML = "4 / 4";

                    if (!speakerAudioPlayed[7]){
                        playspeakeraudio("Outro_Final.wav", 1, false);
                        speakerAudioPlayed[7] = true;
                    }

                    gameAction(15);

                } else {

                    stopAllSpeakerAudio();
                    playspeakeraudio("letztes_Quiz_falsche_Antwort.wav", 0.8, false);
                }

            }

            break;

        case 6: // Acttion: Urkunde

            if (LevelAction == 1) {
                var printContent = document.getElementById("levelbuttonTextfeldName");
                window.location.href = "show.html?name=" + printContent.value;
            }

            break;
    
        default: // None
            break;
    }
}


/*
The function makeButtons() is used to create the buttons for the quizzes
*/

function makeButtons(raetselID) {

    switch (raetselID) {

        case 1: // Level: Tresor
            
            var buttonDetailsArray = [];

            // Button-Properties: (ID) - Top - Left - Width - Height - Level - onclick

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

            var newTextField = document.createElement("div");
            newTextField.id = "levelbuttonTextfeld";
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.style.top = "334px";
            newTextField.style.left = "560px";
            newTextField.style.width = "74px";
            newTextField.style.height = "20px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "12px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";

            document.getElementById("game").appendChild(newTextField);

            break;

        case 2: // Level: PC im Fittnessstudio

            var newTextField = document.createElement("input");
            newTextField.id = "levelbuttonTextfeldPCInput1";
            newTextField.setAttribute('type', 'text');
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.autofocus = true;
            newTextField.style.top = "230px";
            newTextField.style.left = "230px";
            newTextField.style.width = "112px";
            newTextField.style.height = "40px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "12px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            document.getElementById("game").appendChild(newTextField);

            var newTextField = document.createElement("input");
            newTextField.id = "levelbuttonTextfeldPCInput2";
            newTextField.setAttribute('type', 'text');
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.disabled = true;
            newTextField.style.top = "304px";
            newTextField.style.left = "230px";
            newTextField.style.width = "112px";
            newTextField.style.height = "40px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "12px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            document.getElementById("game").appendChild(newTextField);

            var newTextField = document.createElement("input");
            newTextField.id = "levelbuttonTextfeldPCInput3";
            newTextField.setAttribute('type', 'text');
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.disabled = true;
            newTextField.style.top = "378px";
            newTextField.style.left = "230px";
            newTextField.style.width = "112px";
            newTextField.style.height = "40px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "12px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            document.getElementById("game").appendChild(newTextField);

            var newTextField = document.createElement("button");
            newTextField.id = "levelbuttonTextfeldPCInputSubmit";
            newTextField.setAttribute('onclick', 'levelAction(2, 1)');
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.innerHTML = "🆗";
            newTextField.style.top = "230px";
            newTextField.style.left = "380px";
            newTextField.style.width = "22px";
            newTextField.style.height = "40px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "12px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            document.getElementById("game").appendChild(newTextField);

            break;
    
        case 3: // LeveL: Postregal

            document.getElementById("gameimage").src = "Level_PostofficeA.gif";

            var buttonDetailsArray = [];

            // Button-Eigenschaften: (ID) - Top - Left - Width - Height - Level - onclick

            buttonDetailsArray.push([368, 275, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 275, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 275, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 275, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 275, 25, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 303, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 303, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 303, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 303, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 303, 25, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 331, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 331, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 331, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 331, 25, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 331, 25, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 359, 49, 29, 3, 1]); // Richtig 1
            buttonDetailsArray.push([494, 359, 49, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 410, 43, 29, 3, 1]); // Falsch
            buttonDetailsArray.push([431, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 410, 43, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 455, 43, 29, 3, 3]); // Richtig 3
            buttonDetailsArray.push([431, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 455, 43, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 497, 36, 40, 3, 2]); // Richtig 2

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

        case 4: // Level: Lagerhaus

            var buttonDetailsArray = [];

            var newTextField = document.createElement("div");
            newTextField.id = "levelbuttonTextfeld";
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.innerHTML = "Wann sollte dieser Umbau am besten stattfinden?";
            newTextField.style.top = "490px";
            newTextField.style.left = "150px";
            newTextField.style.width = "500px";
            newTextField.style.height = "50px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "3px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            newTextField.style.borderRadius = "0px";
            newTextField.style.color = "black";
            newTextField.style.cursor = "default";
            document.getElementById("game").appendChild(newTextField);

            buttonDetailsArray.push([550, 150, 200, 40, 4, 1]);
            buttonDetailsArray.push([550, 380, 170, 40, 4, 2]);
            buttonDetailsArray.push([550, 560, 220, 40, 4, 3]);

            for (let index = 0; index < buttonDetailsArray.length; index++) {

                const newButton = document.createElement("div");
                newButton.id = "levelbutton" + index;
                newButton.setAttribute('class', 'invisible-button');
                newButton.style.textAlign = "left";
                newButton.style.fontSize = "14px";
                newButton.style.color = "black";
                newButton.style.fontFamily = "Pixelify Sans";
                newButton.style.top = buttonDetailsArray[index][0] + "px";
                newButton.style.left = buttonDetailsArray[index][1] + "px";
                newButton.style.width = buttonDetailsArray[index][2] + "px";
                newButton.style.height = buttonDetailsArray[index][3] + "px";
                newButton.setAttribute('onclick', 'levelAction(' + buttonDetailsArray[index][4] + ', ' +  buttonDetailsArray[index][5] + ')');

                document.getElementById("game").appendChild(newButton);
            }

            document.getElementById("levelbutton0").innerHTML = "A) Übers Wochenende";
            document.getElementById("levelbutton1").innerHTML = "B) In der Woche";
            document.getElementById("levelbutton2").innerHTML = "C) vor einem Feiertag";

            break;

        case 5: // Level: Tor

            var buttonDetailsArray = [];

            var newTextField = document.createElement("div");
            newTextField.id = "levelbuttonTextfeld";
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.innerHTML = "Woran sind kollidierte Werte innerhalb eines Buckets beim &quot;Seperate Chaining&quot; zu unterscheiden?";
            newTextField.style.top = "490px";
            newTextField.style.left = "150px";
            newTextField.style.width = "600px";
            newTextField.style.height = "50px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "3px";
            newTextField.style.textAlign = "left";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";
            newTextField.style.borderRadius = "0px";
            newTextField.style.color = "white";
            newTextField.style.cursor = "default";
            document.getElementById("game").appendChild(newTextField);

            buttonDetailsArray.push([550, 100, 260, 70, 5, 1]);
            buttonDetailsArray.push([550, 370, 180, 70, 5, 2]);
            buttonDetailsArray.push([550, 560, 250, 70, 5, 3]);


            for (let index = 0; index < buttonDetailsArray.length; index++) {

                const newButton = document.createElement("div");
                newButton.id = "levelbutton" + index;
                newButton.setAttribute('class', 'invisible-button');
                newButton.style.textAlign = "left";
                newButton.style.fontSize = "13px";
                newButton.style.color = "white";
                newButton.style.fontFamily = "Pixelify Sans";
                newButton.style.top = buttonDetailsArray[index][0] + "px";
                newButton.style.left = buttonDetailsArray[index][1] + "px";
                newButton.style.width = buttonDetailsArray[index][2] + "px";
                newButton.style.height = buttonDetailsArray[index][3] + "px";
                newButton.setAttribute('onclick', 'levelAction(' + buttonDetailsArray[index][4] + ', ' +  buttonDetailsArray[index][5] + ')');

                document.getElementById("game").appendChild(newButton);
            }

            document.getElementById("levelbutton0").innerHTML = "A) An ihren gehashten Schlüsseln";
            document.getElementById("levelbutton1").innerHTML = "B) An ihren ungehashten Schlüsseln";
            document.getElementById("levelbutton2").innerHTML = "C) An ihrem Inhalt";

            break;

        case 6: // Action: Urkunde

            var newTextField = document.createElement("input");
            newTextField.id = "levelbuttonTextfeldName";
            newTextField.setAttribute('type', 'text');
            newTextField.setAttribute('class', 'invisible-button');
            newTextField.autofocus = true;
            newTextField.style.top = "400px";
            newTextField.style.left = "320px";
            newTextField.style.width = "230px";
            newTextField.style.height = "40px";
            newTextField.style.fontSize = "16px";
            newTextField.style.letterSpacing = "3px";
            newTextField.style.textAlign = "center";
            newTextField.style.fontFamily = "Pixelify Sans";
            newTextField.style.overflow = "hidden";

            var newTextField2 = document.createElement("div");
            newTextField2.id = "levelbuttonTextfeld";
            newTextField2.setAttribute('class', 'invisible-button');
            newTextField2.innerHTML = "HERZLICHEN<br>GLÜCKWUNSCH!<br><br><br>Du hast das Tutorial<br><b>Dictionaries als<br>Schlüssel-Wert-Speicher</b><br>erfolgreich beendet!";
            newTextField2.style.top = "355px";
            newTextField2.style.left = "188px";
            newTextField2.style.width = "500px";
            newTextField2.style.height = "200px";
            newTextField2.style.fontSize = "14px";
            newTextField2.style.letterSpacing = "2px";
            newTextField2.style.textAlign = "center";
            newTextField2.style.fontFamily = "Pixelify Sans";
            newTextField2.style.overflow = "hidden";
            newTextField2.style.borderRadius = "0px";
            newTextField2.style.color = "black";
            newTextField2.style.cursor = "default";

            var newTextField3 = document.createElement("button");
            newTextField3.id = "levelbuttonTextfeldPrint";
            newTextField3.setAttribute('onclick', 'levelAction(6, 1)');
            newTextField3.setAttribute('class', 'invisible-button');
            newTextField3.innerHTML = "Drucken";
            newTextField3.style.top = "540px";
            newTextField3.style.left = "380px";
            newTextField3.style.width = "150px";
            newTextField3.style.height = "40px";
            newTextField3.style.fontSize = "16px";
            newTextField3.style.letterSpacing = "4px";
            newTextField3.style.textAlign = "left";
            newTextField3.style.fontFamily = "Pixelify Sans";
            newTextField3.style.overflow = "hidden";

            setTimeout(function() {
                document.getElementById("game").appendChild(newTextField2);
                document.getElementById("game").appendChild(newTextField3);
                document.getElementById("game").appendChild(newTextField);
            }, 4000);

            break;
        
        
        default: // None
            break;
    }
}


/*
The function removeButtons() is used to remove the buttons for the quizzes
*/

function removeButtons() {
    const levelButtons = document.querySelectorAll("[id^='levelbutton']");
    levelButtons.forEach(button => button.remove());
}


/*
The function gameAction() is used to change the game view, to play the audio files and to change the text and images
*/

function gameAction(viewID) {

    switch (viewID) {

        case 1: // MAP

            removeButtons();
                        
            // Activate Menu and Levelinfo
            document.getElementById("buttonbar").style.display = "block";
            document.getElementById("gameinfotext").style.color = "white";

            document.getElementById("gamebutton1").style.display = "block";
           
            // Islands will be activated, if they are unlocked in the Quiz
            if (insel2ON) {
                document.getElementById("insel2").style.display = "block";
            }
            if (insel3ON) {
                document.getElementById("insel3").style.display = "block";
            }
            if (insel4ON) {
                document.getElementById("insel4").style.display = "block";
            }
            
            document.getElementById("levelText").innerHTML = "Die Inseln";
            document.getElementById("gameimage").src = "Island.gif";
            document.getElementById("levelTipps").innerHTML = "<p>Sei willkommen, wissbegieriger Teilnehmer. "
            + "Du, der du dich den Herausforderungen dieser Inseln stellst und mehr über HashMaps lernen möchtest, "
            + "höre zu, denn ich werde dir erklären, was du zu tun hast. Dieser Ort steckt voller Rätsel und Orte, "
            + "an denen du dich beweisen und dein Wissen anwenden musst. Für jede beendete Insel wird dir ein Kristall anvertraut. "
            + "Diese musst du sammeln, damit du am Ende das Tor öffnen kannst. Strenge dich an, "
            + "und es wird sich für dich auszahlen.</p>";

            
            document.getElementById("gamebutton1").style.top = "400px";
            document.getElementById("gamebutton1").style.left = "98px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');

            stopAllAudio();
            stopAllSpeakerAudio();

            playaudio("waves.mp3", 0.2, true);
            
            if (historyArray[historyArray.length - 1] != 1) {
                historyArray.push(1);
            }

            if (!speakerAudioPlayed[0]){
                playspeakeraudio("Erste_Insel_Teil_eins.wav", 0.8, false); // Id 0
                speakerAudioPlayed[0] = true;
            }

            break;

        case 2: // INSEL 1 NAH

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Die Postamt - Insel";
            document.getElementById("gameimage").src = "Island_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "<p>Jetzt, wo du weißt, was dich erwarten wird, werde ich dich ein wenig in das Thema der HashMaps einführen. "
            + "</br><br></p><p>Eine Map in der Programmierung ist eine Datenstruktur, welche es ermöglicht, Werte nach einem bestimmten Muster abzulegen und effizient "
            + "wiederzubeschaffen. Die Grundlage einer solchen Map ist ein, dir sicherlich bekanntes, Array. Also eine Tabelle, "
            + "in der Werte gespeichert werden und eindeutig einem Index zugeordnet werden.</p><p>Eine Map baut insofern darauf auf, "
            + "dass sie die Werte mit einer besonderen Indexstruktur speichert, indem sie die Indizes mithilfe eines Schlüssels berechnet und in der Lage ist, "
            + "die Werte anhand dieses Schlüssels wiederzubeschaffen. Aber ich denke, du schaust es dir einfach selbst an, anstatt mir hier zuzuhören, oder?"
            + "<p>Hinter mir siehst du die Postfiliale dieser Insel. Diese hat die Briefe bis vor kurzem noch sortiert, "
            + "indem der Mitarbeiter immer das gesamte Regal systematisch absuchen musste, bis das richtige Fach gefunden wurde. Allerdings kannst du dir vorstellen, "
            + "dass diese Methode sehr lange dauern kann, oder? Darum wurde das System überarbeitet. Sie arbeitet jetzt wie eine HashMap. "
            + "Am besten gehst du einfach mal rein und lässt es dir durch den Mitarbeiter erklären.</p>";

            document.getElementById("gamebutton1").style.top = "190px";
            document.getElementById("gamebutton1").style.left = "288px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "150px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(3)');

            stopAllAudio();
            stopAllSpeakerAudio();
            playaudio("waves.mp3", 0.2, true);
            removeButtons();

            if (!speakerAudioPlayed[1]){
                playspeakeraudio("HashMap_erklaerung.wav", 0.8, false); // Id 1
                speakerAudioPlayed[1] = true;
            }

            if (historyArray[historyArray.length - 1] != 2) {
                historyArray.push(2);
            }
            break;

        case 3: // INSEL 1 - Postoffice

            removeButtons();

            (Raetsel3Geloest) ? document.getElementById("gamebutton1").style.display = "block" : document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Das Postamt";
            document.getElementById("gameimage").src = "Level_Postoffice.gif";
            document.getElementById("levelTipps").innerHTML = "Unser neues System arbeitet wie eine HashMap und verwendet eine HashFunktion. "
            + "Eine HashFunktion im Allgemeinen ist eine Zuordnung, welche Schlüsselwerten einen sogenannten HashWert zuordnet. Wie sicher bzw. verwendbar die Ergebnisse dabei sind, "
            + "hängt von der Qualität der HashFunktion ab. Je mehr verschiedene HashWerte die Funktion in einem bestimmten Schlüsselraum erzeugen kann, desto besser ist sie. "
            + "</p>Eine HashMap wiederum verwendet diese HashFunktion, um Schlüssel-Wert-Paare in einem Array zu speichern und später wieder auszulesen. Dabei wird aus dem Schlüssel ein Hash-Wert berechnet, "
            + "welcher dann als Index in einem Array, in welchem die Daten gespeichert werden, fungiert. Somit können schnell und unabhängig vom Umfang der Datenmenge Datensätze wiedergefunden werden. "
            + "</p>In unserer Postfiliale kannst du dir das Briefregal neben dir wie ein großes Array vorstellen. </p> <p>Die Empfängeradressen sind die Schlüssel, und die Briefe selbst sind die Werte. "
            + "Unsere HashFunktion berechnet aus den Adressen eine Zahl, die einer Fachnummer entspricht. In dieses Fach legen wir dann unsere Briefe.<br><br>"
            + "<p>Hier ist unsere aktuelle HashFunktion: <br><code>(Straße als Zahl + Hausnummer) % Anzahl der Fächer (50) = Fach Index</code> <br><br>"
            + "<img src='blog.png' alt='Blog Image' style='width: 350px;'>";
        
            document.getElementById("gamebutton1").style.top = "390px";
            document.getElementById("gamebutton1").style.left = "531px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(4)');

            stopAllAudio();
            stopAllSpeakerAudio();
            playaudio("8-bit-arcade.mp3", 0.01, true);

            if (!speakerAudioPlayed[8]){
                playspeakeraudio("post_1.mp3", 1, false);
                speakerAudioPlayed[8] = true;
            }

            (Raetsel3Geloest) ? "" : makeButtons(3);

            if (historyArray[historyArray.length - 1] != 3) {
                historyArray.push(3);
            }
            break;

        case 4: // INSEL 1 - Postoffice - Rätsel

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Das Postamt - Tresor";
            (Raetsel1Geloest) ? document.getElementById("gameimage").src = "SchliessfachRaetselOpen.png" : document.getElementById("gameimage").src = "SchliessfachRaetsel.png";
            document.getElementById("levelTipps").innerHTML = "Der Modulo-Operator, oft durch das Prozentzeichen (%) dargestellt, ist ein mathematischer Operator,"
            + "der den Rest einer Division zweier Zahlen berechnet. Wenn du beispielsweise a % b berechnest, gibt der Modulo-Operator den Rest der Division von a durch b zurück.<br><br>" +
            + "Beispiel:<br> 10 % 3 ergibt 1, weil 10 durch 3 geteilt dreimal geht und ein Rest von 1 bleibt.<br><br>"
            + "Der Modulo-Operator ist in vielen Anwendungen nützlich, insbesondere wenn es um Zyklen oder Wiederholungen geht. Zum Beispiel kann er verwendet werden, um festzustellen,"
            + "ob eine Zahl gerade oder ungerade ist (wenn a % 2 gleich 0 ist, ist die Zahl gerade).<br><br><i>Tipp: Ich glaube, es war eine größere Zahl, die gefehlt hat,"
            + "um auf den vierstelligen Code zu kommen.<br>Achso, und zähl erste die Buchstabenwerte zusammen und multipliziere erst dann...</i><br><img src='blog.png' style='width: 350px;'>";
        
            (Raetsel1Geloest) ? "" : makeButtons(1);

            if (historyArray[historyArray.length - 1] != 4) {
                historyArray.push(4);
            }

            break;

        case 5: // INSEL 2 NAH

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
        
            document.getElementById("levelText").innerHTML = "Die Fitness - Insel";
            document.getElementById("gameimage").src = "Insel_Gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der zweiten Insel.<br>Wie ich sehe, hast du die Rätsel der ersten Insel hinter dich gebracht." 
            + "Gut gemacht. Du hast gelernt, was eine HashMap im Allgemeinen ist und wurdest mit der HashFunktion vertraut gemacht.<br>"
            + "Für die Rätsel dieser Insel musst du dein bisheriges Wissen anwenden und dir neues aneignen. Auf dieser Insel steht das Fitness-Studio unseres Bootcamps."
            + "Hier kannst du zu deinen kognitiven Fähigkeiten auch deine Muskeln trainieren. Geh doch einfach mal rein. Der Rezeptionist wird dir sicherlich erklären,"
            + "wie es funktioniert.";
        
            if (!parkplatzGeloest) {
                 // Button Parkplatz (--UNUSED--)
                document.getElementById("gamebutton1").style.top = "390px";
                document.getElementById("gamebutton1").style.left = "340px";
                document.getElementById("gamebutton1").style.width = "205px";
                document.getElementById("gamebutton1").style.height = "70px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(6)');

            } else {

                // Button Gym
                document.getElementById("gamebutton1").style.top = "250px";
                document.getElementById("gamebutton1").style.left = "440px";
                document.getElementById("gamebutton1").style.width = "125px";
                document.getElementById("gamebutton1").style.height = "85px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(7)');
            }
            
            stopAllAudio();
            stopAllSpeakerAudio();
            playaudio("waves.mp3", 0.2, true);
            
            if (historyArray[historyArray.length - 1] != 5) {
                historyArray.push(5);
            }

            if (!speakerAudioPlayed[3]){
                playspeakeraudio("zweite_Insel_Intro.wav", 0.8, false); // Id 3
                speakerAudioPlayed[3] = true;
            }

            break;

        case 6:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Der Parkplatz";
            document.getElementById("gameimage").src = "parkplatz.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf dem Parkplatz";
        
            stopAllAudio();
                
            if (historyArray[historyArray.length - 1] != 6) {
                historyArray.push(6);
            }

            break;

        case 7:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            (Raetsel2Geloest) ? document.getElementById("gamebutton1").style.display = "none" : document.getElementById("gamebutton1").style.display = "block";;

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Das Gym";
            document.getElementById("gameimage").src = "gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Fitnessstudio Hashpump. Du bist das erste Mal hier, oder? Dann lass mich einen neuen Mitgliedseintrag für dich machen."
            + "Wie ist dein Name? Aha, Noah der Wizard also… Gut. nun zu deiner Mitglieds ID. Diese wird bei uns aus deinem Namen mithilfe einer HashFunktion berechnet."
            + "Deine ID ist auch gleichzeitig deine Schließfachnummer. Deine Nummer kannst du also ganz einfach mit dieser Formel berechnen:"
            + "<br><code>&sum;(NAME) = Schließfachnummer</code><br><i>Hinweis: Das Minus (die Nummer 13) ist ein Leerzeichen, Noah der Wizard</i>";
             
            document.getElementById("gamebutton1").style.top = "452px";
            document.getElementById("gamebutton1").style.left = "533px";
            document.getElementById("gamebutton1").style.width = "105px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(10)');
             
            stopAllAudio();
            stopAllSpeakerAudio();
            playaudio("gym.mp3", 0.1, true);

            if (!speakerAudioPlayed[4]){
                playspeakeraudio("Gym_willkommen.wav", 0.8, false); // ID 4
                speakerAudioPlayed[4] = true;
            }

            if (historyArray[historyArray.length - 1] != 7) {
                historyArray.push(7);
            }

            break;
        
        case 10: // Level: Gym - PC

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
                
            document.getElementById("levelText").innerHTML = "Das Gym - PC";
            document.getElementById("gameimage").src = "pc.png";
            document.getElementById("levelTipps").innerHTML = "Deine Nummer kannst du also ganz einfach mit dieser Formel berechnen:"
            + "<br><code>&sum;(NAME) = Schließfachnummer</code><br><i>Hinweis: Das Minus (die Nummer 13) ist ein Leerzeichen,"
            + "Noah der Wizard</i><br><br><img src='blog.png' style='width: 350px;'>";

            document.getElementById("gamebutton1").style.top = "300px";
            document.getElementById("gamebutton1").style.left = "340px";
            document.getElementById("gamebutton1").style.width = "205px";
            document.getElementById("gamebutton1").style.height = "70px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(11)');

            stopAllAudio();
            playaudio("gym.mp3", 0.2, true);

            (Raetsel2Geloest) ? "" : makeButtons(2); 
            
            break;

        case 11: // IKEA-INSEL NAH
            
            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            
            document.getElementById("levelText").innerHTML = "Die Möbelhaus - Insel";
            document.getElementById("gameimage").src = "Insel_IKEA.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf der Möbelhaus-Insel, komme doch gerne herein!";

            document.getElementById("gamebutton1").style.top = "211px";
            document.getElementById("gamebutton1").style.left = "288px";
            document.getElementById("gamebutton1").style.width = "190px";
            document.getElementById("gamebutton1").style.height = "120px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(12)');

            stopAllAudio();
            playaudio("waves.mp3", 0.2, true);

            if (historyArray[historyArray.length - 1] != 11) {
                historyArray.push(11);
            }

            break;

        case 12: // Level: Loading-Ramp

            removeButtons();

            (!Raetsel4Geloest) ? document.getElementById("gamebutton1").style.display = "block" : document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            
            document.getElementById("levelText").innerHTML = "Das Möbelhaus - Wareneingang";
            document.getElementById("gameimage").src = "lkw.png";
            document.getElementById("levelTipps").innerHTML = "Das hier ist der Wareneingang. Hier werden die Möbel angeliefert. Öffne die Tür einfach über das Bedienfeld rechts und komme herein.";

            document.getElementById("gamebutton1").style.top = "366px";
            document.getElementById("gamebutton1").style.left = "774px";
            document.getElementById("gamebutton1").style.width = "18px";
            document.getElementById("gamebutton1").style.height = "55px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(13)');

            stopAllAudio();
            playaudio("truck.mp3", 0.2, true);

            if (historyArray[historyArray.length - 1] != 12) {
                historyArray.push(12);
            }

            break;

        case 13: // Level: Storage

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Das Möbelhaus - Lager";
            document.getElementById("gameimage").src = "lager.png";
            document.getElementById("levelTipps").innerHTML = "<p>Ach! du kommst ja wie gerufen.</p>" +
            "<p>Ich bin der Besitzer dieses kleinen Möbelladens hier.</p>" +
            "<p>Ich habe mich bei der letzten Bestellung etwas mitreißen lassen.</p>" +
            "<p>Ich erwarte morgen meine Bestellung von 150 einzigartigen Möbelstücken.</p> <br>" +
            "<p>Aber mein Lager und Ausstellungsfläche hat nur rund 50 Plätze.</p>" +
            "<p>Könntest du heute und morgen einspringen, damit wir den Umbau und die Einlagerung der Möbel so schnell wie möglich hinter uns bringen können?</p>";
             
            document.getElementById("gamebutton1").style.top = "366px";
            document.getElementById("gamebutton1").style.left = "774px";
            document.getElementById("gamebutton1").style.width = "18px";
            document.getElementById("gamebutton1").style.height = "55px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(14)');

            (Raetsel4Geloest) ? "" : makeButtons(4);

            stopAllAudio();
            playaudio("neon.mp3", 0.2, true);

            if (!speakerAudioPlayed[5]){
                playspeakeraudio("möbel_1.wav", 0.8, false); // ID 4
                speakerAudioPlayed[5] = true;
            }

            break;

        case 14: // Level: Tor

            removeButtons();
 
            document.getElementById("gamebutton1").style.display = "block";
 
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
             
            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "13.Insel4Nah.png";
            document.getElementById("levelTipps").innerHTML = "Meinen ausdrücklichen Glückwunsch, Teilnehmer,"
            + "dass du es bis auf die letzte Insel geschafft hast. Du hast dich auf jeder Insel bewiesen und dein Wissen erweitert."
            + "Du hast gelernt, was eine HashMap ist und wie man mit ihr umgehen kann. Du hast gelernt, was eine Kollision ist und wie man sie beheben kann."
            + "Um zu testen, ob du wirklich bereit bist, habe ich noch ein letztes Quiz für dich. Bist du bereit? Dann los.";
  
            document.getElementById("gamebutton1").style.top = "275px";
            document.getElementById("gamebutton1").style.left = "295px";
            document.getElementById("gamebutton1").style.width = "18px";
            document.getElementById("gamebutton1").style.height = "55px";
             
            (Raetsel5Geloest) ? document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(13)') : document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(20)');;

            stopAllSpeakerAudio();
            stopAllAudio();
            if (!speakerAudioPlayed[6]){
                playspeakeraudio("vierte_Insel_Intro.wav", 0.8, false);
                speakerAudioPlayed[6] = true;
            }

            playaudio("something-strange-160387long.mp3", 0.05, true);
 
            if (historyArray[historyArray.length - 1] != 14) {
                 historyArray.push(14);
             }
 
             break;

        case 15: // Level: Tor - Empty

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "Tor_Insel_4_Leer.png";
            document.getElementById("levelTipps").innerHTML = "Da du dir meine ausdrückliche Anerkennung verdient hast, möchte ich dir als Zeichen diesen Kristall überreichen. Er ist einer der Schlüssel für das letzte Tor. Nun hast du alle vier. Schreite voran und öffne das Tor.";
    
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(16)'); 

            if (!speakerAudioPlayed[7]){
                playspeakeraudio("Outro.wav", 0.8, false);
                speakerAudioPlayed[7] = true;
            }

            if (historyArray[historyArray.length - 1] != 15) {
                historyArray.push(15);
            }

            break;

        case 16: // Level: Tor Gem 1

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "Tor_Insel_4_1_Gem.png";
            document.getElementById("levelTipps").innerHTML = "Da du dir meine ausdrückliche Anerkennung verdient hast, möchte ich dir als Zeichen diesen Kristall überreichen. Er ist einer der Schlüssel für das letzte Tor. Nun hast du alle vier. Schreite voran und öffne das Tor.";
    
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(17)'); 

            stopAllSpeakerAudio();
            playspeakeraudio("click-151673.mp3", 0.6, false);

            if (historyArray[historyArray.length - 1] != 16) {
                historyArray.push(16);
            }

            break;

        case 17: // Level: Tor Gem 2
                
            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
                
            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "Tor_Insel_4_2_Gem.png";
            document.getElementById("levelTipps").innerHTML = "Da du dir meine ausdrückliche Anerkennung verdient hast, möchte ich dir als Zeichen diesen Kristall überreichen. Er ist einer der Schlüssel für das letzte Tor. Nun hast du alle vier. Schreite voran und öffne das Tor.";
    
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(18)'); 

            playspeakeraudio("click-151673.mp3", 0.6, false);

            if (historyArray[historyArray.length - 1] != 17) {
                historyArray.push(17);
            }

            break;
       
        case 18: // Level: Tor Gem 3

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
                
            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "Tor_Insel_4_3_Gem.png";
            document.getElementById("levelTipps").innerHTML = "Da du dir meine ausdrückliche Anerkennung verdient hast, möchte ich dir als Zeichen diesen Kristall überreichen. Er ist einer der Schlüssel für das letzte Tor. Nun hast du alle vier. Schreite voran und öffne das Tor.";
    
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(19)'); 

            playspeakeraudio("click-151673.mp3", 0.6, false);

            if (historyArray[historyArray.length - 1] != 18) {
                 historyArray.push(18);
            }

            break;

        case 19: // Level: Tor Gem 4

            removeButtons();
    
            document.getElementById("gamebutton1").style.display = "none";
    
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
    
            document.getElementById("levelText").innerHTML = "Die Gruselinsel";
            document.getElementById("gameimage").src = "Tor_Insel_4_Oeffnung.gif";
            document.getElementById("levelTipps").innerHTML = "Da du dir meine ausdrückliche Anerkennung verdient hast, möchte ich dir als Zeichen diesen Kristall überreichen. Er ist einer der Schlüssel für das letzte Tor. Nun hast du alle vier. Schreite voran und öffne das Tor.";
     
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(20)'); 

            stopAllAudio();
            playspeakeraudio("interface-124464.mp3", 0.2, false);
                
            makeButtons(6);

            if (historyArray[historyArray.length - 1] != 19) {
                historyArray.push(19);
            }
    
            break;

        case 20: // Level: Tor - Quiz
                
            removeButtons();
    
            document.getElementById("gamebutton1").style.display = "none";
    
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
    
            document.getElementById("levelText").innerHTML = "Die finale Insel";
            document.getElementById("gameimage").src = "lagermitraetsel.png";
            document.getElementById("levelTipps").innerHTML = "Meinen ausdrücklichen Glückwunsch, Teilnehmer, dass du es bis auf die letzte Insel geschafft hast. Du hast dich auf jeder Insel bewiesen und dein Wissen erweitert. Du hast gelernt, was eine HashMap ist und wie man mit ihr umgehen kann. Du hast gelernt, was eine Kollision ist und wie man sie beheben kann. Um zu testen, ob du wirklich bereit bist, habe ich noch ein letztes Quiz für dich. Bist du bereit? Dann los.";
     
            document.getElementById("gamebutton1").style.top = "445px";
            document.getElementById("gamebutton1").style.left = "406px";
            document.getElementById("gamebutton1").style.width = "60px";
            document.getElementById("gamebutton1").style.height = "60px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(20)'); 
    
            stopAllSpeakerAudio();

            (Raetsel5Geloest) ? "" : makeButtons(5);

            if (historyArray[historyArray.length - 1] != 20) {
                historyArray.push(20);
            }
    
            break;

        default: // None
            break

        }

}