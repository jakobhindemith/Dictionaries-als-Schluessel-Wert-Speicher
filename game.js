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
                    insel2ON = true;
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
           
            if (insel2ON) {
                document.getElementById("insel2").style.display = "block";
            }
            if (insel3ON) {
                document.getElementById("insel3").style.display = "block";
            }
            if (insel4ON) {
                document.getElementById("insel4").style.display = "block";
            }
            
            document.getElementById("schluesselText").innerHTML = "ABC123";
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
            playaudio("waves.mp3", 0.2);
            
            if (historyArray[historyArray.length - 1] != 1) {
                historyArray.push(1);
            }

            break;

        case 2:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";


            // Ändern der Texte und Infos und des Bildes
            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Die DHL Insel";
            document.getElementById("gameimage").src = "Island_Postoffice.png";
            document.getElementById("levelTipps").innerHTML = "<p>Jetzt, wo du weißt, was dich erwarten wird, werde ich dich ein wenig in das Thema der HashMaps einführen.</p><p>Eine Map in der Programmierung ist eine Datenstruktur, welche es ermöglicht, Werte nach einem bestimmten Muster abzulegen und effizient wiederzubeschaffen. Die Grundlage einer solchen Map ist ein, dir sicherlich bekanntes, Array. Also eine Tabelle, in der Werte gespeichert werden und eindeutig einem Index zugeordnet werden.</p><p>Eine Map baut insofern darauf auf, dass sie die Werte mit einer besonderen Indexstruktur speichert, indem sie die Indizes mithilfe eines Schlüssels berechnet und in der Lage ist, die Werte anhand dieses Schlüssels wiederzubeschaffen. Aber ich denke, du schaust es dir einfach selbst an, anstatt mir hier zuzuhören, oder? <p>Hinter mir siehst du die Postfiliale dieser Insel. Diese hat die Briefe bis vor kurzem noch sortiert, indem der Mitarbeiter immer das gesamte Regal systematisch absuchen musste, bis das richtige Fach gefunden wurde. Allerdings kannst du dir vorstellen, dass diese Methode sehr lange dauern kann, oder? Darum wurde das System überarbeitet. Sie arbeitet jetzt wie eine HashMap. Am besten gehst du einfach mal rein und lässt es dir durch den Mitarbeiter erklären.</p>";
        
            // Ändern des Buttons
            document.getElementById("gamebutton1").style.top = "190px";
            document.getElementById("gamebutton1").style.left = "288px";
            document.getElementById("gamebutton1").style.width = "100px";
            document.getElementById("gamebutton1").style.height = "150px";
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

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";


            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Level_Postoffice.gif";
            document.getElementById("levelTipps").innerHTML = "<p>Der Mitarbeiter in der Postfiliale:</p>Unser neues System arbeitet wie eine HashMap und verwendet eine HashFunktion. Eine HashFunktion im Allgemeinen ist eine Zuordnung, welche Schlüsselwerten einen sogenannten HashWert zuordnet. Wie sicher bzw. verwendbar die Ergebnisse dabei sind, hängt von der Qualität der HashFunktion ab. Je mehr verschiedene HashWerte die Funktion in einem bestimmten Schlüsselraum erzeugen kann, desto besser ist sie.</p>Eine HashMap wiederum verwendet diese HashFunktion, um Schlüssel-Wert-Paare in einem Array zu speichern und später wieder auszulesen. Dabei wird aus dem Schlüssel ein Hash-Wert berechnet, welcher dann als Index in einem Array, in welchem die Daten gespeichert werden, fungiert. Somit können schnell und unabhängig vom Umfang der Datenmenge Datensätze wiedergefunden werden.</p>In unserer Postfiliale kannst du dir das Briefregal neben dir stellen wir uns ein großes Array vor. </p> <p>Die Empfängeradressen sind die Schlüssel, und die Briefe selbst sind die Werte. Unsere HashFunktion berechnet aus den Adressen eine Zahl, die einer Fachnummer entspricht. In dieses Fach legen wir dann unsere Briefe.<p>Hier ist unsere aktuelle HashFunktion: <br><code>(Straße als Zahl + Hausnummer) % Anzahl der Fächer (50) = Fach Index</code> <br> <table><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td></td><td>.</td><td>,</td><td>ß</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td><td>12</td><td>13</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td><td>K</td><td>L</td><td>M</td><td>N</td><td>O</td><td>P</td><td>Q</td><td>R</td><td>S</td><td>T</td><td>U</td><td>V</td><td>W</td><td>X</td><td>Y</td><td>Z</td></tr><tr><td>14</td><td>15</td><td>16</td><td>17</td><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>31</td><td>32</td><td>33</td><td>34</td><td>35</td><td>36</td><td>37</td><td>38</td><td>39</td></tr></table>";
            
        
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

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";

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
            "5.Aufgabe: 44 % 14 = ?<br>"; // = 2
            
        
            makeButtons(1);

            if (historyArray[historyArray.length - 1] != 4) {
                historyArray.push(4);
            }
            break;

        case 5:

            removeButtons();

            //Insel 1 Button verstecken
            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
        

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Postoffice";
            document.getElementById("gameimage").src = "Insel_Gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen auf dem Parkplatz";
        
            /*
            // Button Parkplatz
            document.getElementById("gamebutton1").style.top = "390px";
            document.getElementById("gamebutton1").style.left = "340px";
            document.getElementById("gamebutton1").style.width = "205px";
            document.getElementById("gamebutton1").style.height = "70px";
            document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(6)');
            */

             // Button für Gym
             document.getElementById("gamebutton1").style.top = "250px";
             document.getElementById("gamebutton1").style.left = "440px";
             document.getElementById("gamebutton1").style.width = "125px";
             document.getElementById("gamebutton1").style.height = "85px";
             document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(7)');
             


            makeButtons(1);

            stopAllAudio();
            playaudio("8-bit-arcade.mp3", 0.02);
           
            removeButtons();

            
            if (historyArray[historyArray.length - 1] != 5) {
                historyArray.push(5);
            }
            break;


        case 6:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Der Parkplatz";
            document.getElementById("gameimage").src = "parkplatz.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen beim Parkplatz";
        

            removeButtons(1);

                
            if (historyArray[historyArray.length - 1] != 6) {
                historyArray.push(6);
            }
                break;

        case 7:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "block";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Gym";
            document.getElementById("gameimage").src = "gym.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Fitnessstudio";

             // Buttons Bildschirm
             document.getElementById("gamebutton1").style.top = "452px";
             document.getElementById("gamebutton1").style.left = "533px";
             document.getElementById("gamebutton1").style.width = "105px";
             document.getElementById("gamebutton1").style.height = "60px";
             document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(8)');

             if (historyArray[historyArray.length - 1] != 7) {
                historyArray.push(7);
            }
            break;
        
            
        case 8:

            removeButtons();

            document.getElementById("gamebutton1").style.display = "none";

            document.getElementById("insel2").style.display = "none";
            document.getElementById("insel3").style.display = "none";
            document.getElementById("insel4").style.display = "none";
            

            document.getElementById("schluesselText").innerHTML = "ABC123";
            document.getElementById("levelText").innerHTML = "Das Gym";
            document.getElementById("gameimage").src = "pc.png";
            document.getElementById("levelTipps").innerHTML = "Willkommen im Fitnessstudio";

             // //Buy Ticket
             document.getElementById("gamebutton1").style.top = "300px";
             document.getElementById("gamebutton1").style.left = "340px";
             document.getElementById("gamebutton1").style.width = "205px";
             document.getElementById("gamebutton1").style.height = "70px";
             document.getElementById("gamebutton1").setAttribute('onclick', 'gameAction(9)');

             if (historyArray[historyArray.length - 1] != 8) {
                historyArray.push(8);
            }
            break;
    

        case 9:
            
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
