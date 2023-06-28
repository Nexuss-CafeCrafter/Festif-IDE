let zoneTexte = document.getElementById("text");

// Le timer
let timerId;
// Timer actif ?
let timer = false;
let music = new Audio("musics/apero.mp3");

// Fonction zone de text
// Si timer off, on le lance, on attend 30 min et on lance la prochaine fonction
function PostPause()
{
    if (! timer)
    {
        // CLear timer
        clearTimeout(timerId);
        // Start timer
        timer = true
        timerId = setTimeout(function() {
            music.play();
            OnPause();
        }, 2 * 1 * 1000); // Minutes * secondes * miliseconds
    }
}

// Pause function
function OnPause() {
    // Block the writing and show the APERO
    zoneTexte.disabled = true;
    var messageElement = document.getElementById("APERO");
    messageElement.style.display = "block";
    // Labda function , after 5 minutes, clear
    setTimeout(function() {
        var messageElement = document.getElementById("APERO");
        messageElement.style.display = "none";
        clearTimeout(timerId);
        zoneTexte.disabled = false;
        timer = false;
        music.pause();
        music.currentTime = 0;
    }, 30 * 1 * 1000); // 5 Minutes * secondes * miliseconds
}