var editor = CodeMirror(document.getElementById('code'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'paraiso-light',
     extraKeys: {
         "Ctrl-Space": "autocomplete",
         "Tab": function(cm) {
             var completion = cm.state.completion;
             if (completion && completion.pick) {
                 completion.pick();
             } else {
                 cm.execCommand("indentMore");
             }
         }
     }
 });

// Le timer
var timerId;
// Timer actif ?
let timer = false;
var music = new Audio("../musics/sardines_1min.mp3");

document.getElementById("code").addEventListener("input", PostPause)

// Fonction zone de text
// Si timer off, on le lance, on attend 30 min et on lance la prochaine fonction
function PostPause()
{
    console.log("Here it is!")
    if (! timer)
    {
        // CLear timer
        clearTimeout(timerId);
        // Start timer
        timer = true
        timerId = setTimeout(function() {
            music.play();
            OnPause();
        }, 8 * 1 * 1000); // Minutes * secondes * miliseconds
    }
}

// Pause function
function OnPause() {
    // Block the writing and show the APERO
    editor.setOption('readOnly', true);
    var messageElement = document.getElementById("APERO");
    messageElement.style.display = "block";
    // Labda function , after 5 minutes, clear
    setTimeout(function() {
        var messageElement = document.getElementById("APERO");
        messageElement.style.display = "none";
        clearTimeout(timerId);
        editor.setOption('readOnly', false);
        timer = false;
        music.pause();
        music.currentTime = 0;
    }, 5 * 1 * 1000); // Minutes * secondes * miliseconds
}