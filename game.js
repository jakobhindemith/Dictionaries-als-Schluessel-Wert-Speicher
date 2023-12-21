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


// Inseln an oder aus
var insel2ON = false;
var insel3ON = false;
var insel4ON = false;

// Raetsel geloest
var Raetsel1Geloest = false; // TRESOR
var parkplatzGeloest = true; // Skip den Parkplatz weil doch kein Rätsel???
var Raetsel2Geloest = false; // GYM PC
var Raetsel3Geloest = false; // POSTREGAL

// Speaker-Audio
var speakerAudioPlayed = []; // Wurde das Audio vom Sprecher bereits abgespielt

// Level Variablen
var pressedcount = 0; // Anzahl der Knöpfe, die gedrückt wurden für Level Regal

function playaudio(audiofilename, volume, looped) {

    const audio = new Audio(audiofilename);
    audio.volume = volume;
    audio.loop = looped;
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
                playaudio("button.mp3", 0.3, false);
                document.getElementById("levelbuttonTextfeld").innerHTML = "";
            } else if (LevelAction == -2) {
                if (document.getElementById("levelbuttonTextfeld").innerHTML == "1625") {
                    document.getElementById("levelbuttonTextfeld").innerHTML = "vvvv";
                    playaudio("key-twist-in-lock.mp3", 0.6, false);
                    removeButtons();
                    insel2ON = true;
                    Raetsel1Geloest = true;
                    document.getElementById("schluesselText").innerHTML = "1 / 4";
                    document.getElementById("gameimage").src = "SchliessfachRaetselOpen.png";
                } else {
                    document.getElementById("levelbuttonTextfeld").innerHTML = "xxxx";
                    playaudio("invalid-selection.mp3", 0.2, false);
                }
            } else {
                playaudio("button.mp3", 0.3, false);
                document.getElementById("levelbuttonTextfeld").innerHTML += LevelAction;
            }
            break;

        case 2: // PC im Fittnessstudio

            if (LevelAction == 1) {
                if (document.getElementById("levelbuttonTextfeldPCInput1").value == "335") {
                    document.getElementById("levelbuttonTextfeldPCInput1").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInput2").disabled = false;
                    document.getElementById("levelbuttonTextfeldPCInput2").focus();
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").setAttribute('onclick', 'levelAction(2, 2)');
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.top = "304px";
                    stopAllAudio();
                    playaudio("ID_zu_groß.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                } else {
                    document.getElementById("levelbuttonTextfeldPCInput1").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput1").focus();
                    stopAllAudio();
                    playaudio("Erstes_Raetsel_falsch.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                }
            } else if (LevelAction == 2) {
                if (document.getElementById("levelbuttonTextfeldPCInput2").value == "5") {
                    document.getElementById("levelbuttonTextfeldPCInput2").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInput3").disabled = false;
                    document.getElementById("levelbuttonTextfeldPCInput3").focus();
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").setAttribute('onclick', 'levelAction(2, 3)');
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.top = "378px";
                    stopAllAudio();
                    playaudio("erklaerung_lineares_sondieren.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                } else {
                    document.getElementById("levelbuttonTextfeldPCInput2").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput2").focus();
                    stopAllAudio();
                    playaudio("Zweites_Raetsel_falsch.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                }            
            } else if (LevelAction == 3) {
                if (document.getElementById("levelbuttonTextfeldPCInput3").value == "21") {
                    document.getElementById("levelbuttonTextfeldPCInput3").disabled = true;
                    document.getElementById("levelbuttonTextfeldPCInputSubmit").style.display = "none";
                    Raetsel2Geloest = true;
                    insel3ON = true;
                    stopAllAudio();
                    playaudio("Outro_zweite_Insel.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                } else {
                    document.getElementById("levelbuttonTextfeldPCInput3").value = "";
                    document.getElementById("levelbuttonTextfeldPCInput3").focus();
                    stopAllAudio();
                    playaudio("Zweites_Raetsel_falsch.wav", 0.8, false);
                    playaudio("gym.mp3", 0.2, true);
                }  
            }
                

            break;

        case 3: // Postregal

            if (LevelAction == 1 && pressedcount == 0) {
                alert("richtig1!");
                pressedcount++;
            } else if (LevelAction == 2 && pressedcount == 1) {
                alert("richtig2!");
                pressedcount++;
            } else if (LevelAction == 3 && pressedcount == 2) {
                alert("richtig3!");
                pressedcount++;
                Raetsel3Geloest = true;
                gameAction(3);
            } else {
                alert("falsch!");
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

        case 2: // PC im Fittnessstudio

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


            // OK-Buttons

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
    
        case 3: // Postregal

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
            buttonDetailsArray.push([463, 331, 25, 29, 3, 1]); // Richtig 1
            buttonDetailsArray.push([494, 331, 25, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 359, 49, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 359, 49, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 410, 43, 29, 3, 3]); // Richtig 3
            buttonDetailsArray.push([431, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 410, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 410, 43, 40, 3, 0]); // Falsch

            buttonDetailsArray.push([368, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 455, 43, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 455, 43, 40, 3, 2]); // Richtig 2

            buttonDetailsArray.push([368, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([399, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([431, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([463, 497, 36, 29, 3, 0]); // Falsch
            buttonDetailsArray.push([494, 497, 36, 40, 3, 0]); // Falsch


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

        case 1: // MAP

            removeButtons();
                        
            // Menü und Levelinfo freischalten
            document.getElementById("buttonbar").style.display = "block";
            document.getElementById("gameinfotext").style.color = "white";

            document.getElementById("gamebutton1").style.display = "block";
           
            // Inseln werden auf der Map freigeschaltet, sobald über Rätsel erlaubt
            if (insel2ON) {
                document.getElementById("insel2").style.display = "block";
            }
            if (insel3ON) {
                document.getElementById("insel3").style.display = "block";
            }
            if (insel4ON) {
                document.getElementById("insel4").style.display = "block";
            }
            
            document.getElementById("schluesselText").innerHTML = "0 / 4";
            document.getElementById("levelText").innerHTML = "Die Inseln";
            document.getElementById("gameimage").src = "Island.gif";
            document.getElementById("levelTipps").innerHTML = "<p>Sei willkommen, wissbegieriger Teilnehmer. Du, der du dich den Herausforderungen dieser Inseln stellst und mehr über HashMaps lernen möchtest, höre zu, denn ich werde dir erklären, was du zu tun hast. Dieser Ort steckt voller Rätsel und Orte, an denen du dich beweisen und dein Wissen anwenden musst. Für jedes beendete Rätsel wird dir ein Ticket auf die nächste Insel anvertraut. Außerdem gilt es, alle Teile des Schlüssels zu sammeln, welcher dir die letzte Tür öffnen wird. Strenge dich an, und es wird sich für dich auszahlen.</p>";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "400px";
            document.getElementById("gamebutton1").style.left = "98px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(2)');

            stopAllAudio();

            playaudio("waves.mp3", 0.2, true);
            
            if (historyArray[historyArray.length - 1] != 1) {
                historyArray.push(1);
            }

            // Section: Speaker-Audio
            if (!speakerAudioPlayed[0]){
                playaudio("Erste_Insel_Teil_eins.wav", 0.8, false); // Id 0
                speakerAudioPlayed[0] = true;
            }

            break;

        case 2: // INSEL 1 NAH

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";


            // Ändern der Texte und Infos und des Bildes
            document.getElementById("levelText").innerHTML = "Die DHL Insel";
            document.getElementById("gameimage").src = "Island_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "<p>Jetzt, wo du weißt, was dich erwarten wird, werde ich dich ein wenig in das Thema der HashMaps einführen.</br><br></p><p>Eine Map in der Programmierung ist eine Datenstruktur, welche es ermöglicht, Werte nach einem bestimmten Muster abzulegen und effizient wiederzubeschaffen. Die Grundlage einer solchen Map ist ein, dir sicherlich bekanntes, Array. Also eine Tabelle, in der Werte gespeichert werden und eindeutig einem Index zugeordnet werden.</p><p>Eine Map baut insofern darauf auf, dass sie die Werte mit einer besonderen Indexstruktur speichert, indem sie die Indizes mithilfe eines Schlüssels berechnet und in der Lage ist, die Werte anhand dieses Schlüssels wiederzubeschaffen. Aber ich denke, du schaust es dir einfach selbst an, anstatt mir hier zuzuhören, oder? <p>Hinter mir siehst du die Postfiliale dieser Insel. Diese hat die Briefe bis vor kurzem noch sortiert, indem der Mitarbeiter immer das gesamte Regal systematisch absuchen musste, bis das richtige Fach gefunden wurde. Allerdings kannst du dir vorstellen, dass diese Methode sehr lange dauern kann, oder? Darum wurde das System überarbeitet. Sie arbeitet jetzt wie eine HashMap. Am besten gehst du einfach mal rein und lässt es dir durch den Mitarbeiter erklären.</p>";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "190px";
            document.getElementById("gamebutton1").style.left = "288px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "150px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(3)');

            stopAllAudio();
            playaudio("waves.mp3", 0.2, true);
            removeButtons();

            // Section: Speaker-Audio
            if (!speakerAudioPlayed[1]){
                playaudio("HashMap_erklaerung.wav", 0.8, false); // Id 1
                speakerAudioPlayed[1] = true;
            }
            

            if (historyArray[historyArray.length - 1] != 2) {
                historyArray.push(2);
            }
            break;

        case 3: // INSEL 1 - Postoffice

            removeButtons();

            (Raetsel3Geloest) ? document.getElementById("gamebutton1").style.display = "block" : document.getElementById("gamebutton1").style.display = "none";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";


            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Level_Postoffice.gif";
            document.getElementById("levelTipps").innerHTML = "<p>Der Mitarbeiter in der Postfiliale:</p>Unser neues System arbeitet wie eine HashMap und verwendet eine HashFunktion. Eine HashFunktion im Allgemeinen ist eine Zuordnung, welche Schlüsselwerten einen sogenannten HashWert zuordnet. Wie sicher bzw. verwendbar die Ergebnisse dabei sind, hängt von der Qualität der HashFunktion ab. Je mehr verschiedene HashWerte die Funktion in einem bestimmten Schlüsselraum erzeugen kann, desto besser ist sie.</p>Eine HashMap wiederum verwendet diese HashFunktion, um Schlüssel-Wert-Paare in einem Array zu speichern und später wieder auszulesen. Dabei wird aus dem Schlüssel ein Hash-Wert berechnet, welcher dann als Index in einem Array, in welchem die Daten gespeichert werden, fungiert. Somit können schnell und unabhängig vom Umfang der Datenmenge Datensätze wiedergefunden werden.</p>In unserer Postfiliale kannst du dir das Briefregal neben dir stellen wir uns ein großes Array vor. </p> <p>Die Empfängeradressen sind die Schlüssel, und die Briefe selbst sind die Werte. Unsere HashFunktion berechnet aus den Adressen eine Zahl, die einer Fachnummer entspricht. In dieses Fach legen wir dann unsere Briefe.<p>Hier ist unsere aktuelle HashFunktion: <br><code>(Straße als Zahl + Hausnummer) % Anzahl der Fächer (50) = Fach Index</code> <br> <table><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td></td><td>.</td><td>,</td><td>ß</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td></tr><tr><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr></table>";
            
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "390px";
            document.getElementById("gamebutton1").style.left = "531px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "100px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(4)');

            stopAllAudio();
            playaudio("8-bit-arcade.mp3", 0.02, true);
            (Raetsel3Geloest) ? "" : makeButtons(3);
            if (historyArray[historyArray.length - 1] != 3) {
                historyArray.push(3);
            }
            break;

        case 4: // INSEL 1 - Postoffice - Rätsel

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

            document.getElementById("levelText").innerHTML = "Das Postoffice";
            (Raetsel1Geloest) ? document.getElementById("gameimage").src = "SchliessfachRaetselOpen.png" : document.getElementById("gameimage").src = "SchliessfachRaetsel.png";
            document.getElementById("levelTipps").innerHTML = "Der Modulo-Operator, oft durch das Prozentzeichen (%) dargestellt, ist ein mathematischer Operator, der den Rest einer Division zweier Zahlen berechnet. Wenn du beispielsweise a % b berechnest, gibt der Modulo-Operator den Rest der Division von a durch b zurück.<br><br>" +
            "Beispiel:<br>" + "10 % 3 ergibt 1, weil 10 durch 3 geteilt 3 mal geht und ein Rest von 1 bleibt.<br><br>" +
            "Der Modulo-Operator ist in vielen Anwendungen nützlich, insbesondere wenn es um Zyklen oder Wiederholungen geht. Zum Beispiel kann er verwendet werden, um festzustellen, ob eine Zahl gerade oder ungerade ist (wenn a % 2 gleich 0 ist, ist die Zahl gerade).<br><br>" +
            "1.Aufgabe: 3 % 2 = ?<br>" + // = 1
            "2.Aufgabe: 4 % 4 = ?<br>" + // = 0
            "3.Aufgabe: 5 % 8 = ?<br>" + // = 5
            "4.Aufgabe: 21 % 3 = ?<br>" + // = 0
            "5.Aufgabe: 44 % 14 = ?<br>"; // = 2
            
        
            (Raetsel1Geloest) ? "" : makeButtons(1);

            if (historyArray[historyArray.length - 1] != 4) {
                historyArray.push(4);
            }
            break;

        case 5: // INSEL 2 NAH

            removeButtons();

            //Insel 1 Button verstecken
            document.getElementById("gamebutton1").style.display = "block";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
        

            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Insel_Gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf dem Parkplatz";
        
            if (!parkplatzGeloest) {
                 // Button Parkplatz
                document.getElementById("gamebutton1").style.top = "390px";
                document.getElementById("gamebutton1").style.left = "340px";
                document.getElementById("gamebutton1").style.width = "205px";
                document.getElementById("gamebutton1").style.height = "70px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(6)');
            } else {
                // Button für Gym
                document.getElementById("gamebutton1").style.top = "250px";
                document.getElementById("gamebutton1").style.left = "440px";
                document.getElementById("gamebutton1").style.width = "125px";
                document.getElementById("gamebutton1").style.height = "85px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(7)');
            }
            
           
            stopAllAudio();
            playaudio("waves.mp3", 0.2, true);
           
            
            if (historyArray[historyArray.length - 1] != 5) {
                historyArray.push(5);
            }

            // Section: Speaker-Audio
            if (!speakerAudioPlayed[3]){
                playaudio("zweite_Insel_Intro.wav", 0.8, false); // Id 3
                speakerAudioPlayed[3] = true;
            }
            break;


        case 6:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("levelText").innerHTML = "Der Parkplatz";
            document.getElementById("gameimage").src = "parkplatz.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen beim Parkplatz";
        
            stopAllAudio();
                
            if (historyArray[historyArray.length - 1] != 6) {
                historyArray.push(6);
            }
                break;

        case 7:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("levelText").innerHTML = "Das Gym";
            document.getElementById("gameimage").src = "gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Fitnessstudio";

             // Buttons Bildschirm

             
                document.getElementById("gamebutton1").style.top = "452px";
                document.getElementById("gamebutton1").style.left = "533px";
                document.getElementById("gamebutton1").style.width = "105px";
                document.getElementById("gamebutton1").style.height = "60px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(8)');
             
             

            stopAllAudio();
            playaudio("gym.mp3", 0.1, true);
            if (!speakerAudioPlayed[4]){
                playaudio("Gym_willkommen.wav", 0.8, false); // ID 4
                speakerAudioPlayed[4] = true;
            }

             if (historyArray[historyArray.length - 1] != 7) {
                historyArray.push(7);
            }
            break;
        
            
        case 8:

            removeButtons();

    

                document.getElementById("gamebutton1").style.display = "none";

                // Inseln freischalten
                document.getElementById("insel2").style.display = "none";
                document.getElementById("insel3").style.display = "none";
                document.getElementById("insel4").style.display = "none";
                

                document.getElementById("levelText").innerHTML = "Das Gym";
                document.getElementById("gameimage").src = "PC.png";
                document.getElementById("levelTipps").innerHTML = "Willkommen im Fitnessstudio";

                // //Buy Ticket
                document.getElementById("gamebutton1").style.top = "300px";
                document.getElementById("gamebutton1").style.left = "340px";
                document.getElementById("gamebutton1").style.width = "205px";
                document.getElementById("gamebutton1").style.height = "70px";
                document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(9)');

                stopAllAudio();
                playaudio("gym.mp3", 0.2, true);

                (Raetsel2Geloest) ? "" : makeButtons(2);

                if (historyArray[historyArray.length - 1] != 8) {
                    historyArray.push(8);
                }
            
            break;
    

        case 9:
            
            break;

        case 10:

            break;

        case 11:    // IKEA-INSEL NAH
            
            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("levelText").innerHTML = "Das Möbelhaus";
            document.getElementById("gameimage").src = "Insel_IKEA.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im IKEA Möbelhaus";

            // IKEA
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

        //Laderampe
        case 12:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("levelText").innerHTML = "Das Möbelhaus";
            document.getElementById("gameimage").src = "lkw.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im IKEA Möbelhaus";

            // IKEA
            document.getElementById("gamebutton1").style.top = "366px";
            document.getElementById("gamebutton1").style.left = "774px";
            document.getElementById("gamebutton1").style.width = "18px";
            document.getElementById("gamebutton1").style.height = "55px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(13)'); // ToDo: für Case 13

            if (historyArray[historyArray.length - 1] != 12) {
                historyArray.push(12);
            }

            break;


            //Lager Raum
            case 13:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            // Inseln freischalten
            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("levelText").innerHTML = "Das Möbelhaus";
            document.getElementById("gameimage").src = "lager.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Lager";
 
            //Button Lager
            document.getElementById("gamebutton1").style.top = "366px";
            document.getElementById("gamebutton1").style.left = "774px";
            document.getElementById("gamebutton1").style.width = "18px";
            document.getElementById("gamebutton1").style.height = "55px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(14)'); // ToDo: für Case 13

            if (historyArray[historyArray.length - 1] != 13) {
                historyArray.push(12);
            }

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
* document.getElementById("insel2").style.display = "block"; //zum Freischalten der Inseln
*
*/
