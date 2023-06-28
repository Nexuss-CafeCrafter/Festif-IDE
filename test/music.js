let isMusicPlaying = false;
let audioElement = null;

function playRandomMusic() {
  const musicUrls = [
    "musics/sardines_1min.mp3",
    "musics/apero.mp3",
    // Add more music URLs as needed
  ];

  const randomIndex = Math.floor(Math.random() * musicUrls.length);
  const randomMusicUrl = musicUrls[randomIndex];

  audioElement = new Audio(randomMusicUrl);

  document.addEventListener("click", () => {
    audioElement.play();
    toggleStopButton(true);
  }, { once: true });

  setTimeout(() => {
    audioElement.pause();
    audioElement.currentTime = 0;
    toggleStopButton(false);
  }, 60000);
}

function stopMusic() {
  if (isMusicPlaying && audioElement !== null) {
    audioElement.pause();
    audioElement.currentTime = 0;
    isMusicPlaying = false;
    toggleStopButton(false);
  }
}

function toggleStopButton(show) {
  const stopButton = document.getElementById("stopButton");
  if (show) {
    stopButton.style.display = "block";
  } else {
    stopButton.style.display = "none";
  }
}

function playRandomMusicAtRandomTime() {
  const randomInterval = Math.floor(Math.random() * 8 + 2) * 60000;

  setTimeout(() => {
    if (!isMusicPlaying) {
      playRandomMusic();
      isMusicPlaying = true;
    }
    playRandomMusicAtRandomTime();
  }, randomInterval);
}

playRandomMusicAtRandomTime();
