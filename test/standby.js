

let isInactive = false;
let container = document.getElementById('standby');
const movingImage = document.getElementById('patrick');
let positionX = 0; // Position horizontale initiale
let positionY = 0; // Position verticale initiale
let speedX = 5; // Vitesse de déplacement horizontale
let speedY = 2; // Vitesse de déplacement verticale

let deg = 0

function moveImage() {
    positionX += speedX;
    positionY += speedY;
    const rotation = (positionX + positionY) % 360;
    movingImage.style.transform = `translate(${positionX}px, ${positionY}px) rotate(${rotation}deg)`;

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;
    const imageWidth = movingImage.offsetWidth;
    const imageHeight = movingImage.offsetHeight;

    if (positionX + imageWidth >= containerWidth || positionX <= 0) {
        speedX *= -1; // Inverser la direction horizontale en cas de collision avec les bords
        deg = Math.floor(Math.random() * 360);
        movingImage.style.filter = `hue-rotate(${deg}deg)`;
    }

    if (positionY + imageHeight >= containerHeight || positionY <= 0) {
        speedY *= -1; // Inverser la direction verticale en cas de collision avec les bords
        deg = Math.floor(Math.random() * 360);
        movingImage.style.filter = `hue-rotate(${deg}deg)`;
    }
    window.requestAnimationFrame(moveImage);
}

function checkInactivity() {
    if (document.getElementById('APERO').style.display === 'none') {
        isInactive = true;
        // Code à exécuter lorsque le codeur est inactif
        container.style.display = "block";
        moveImage();
        console.log(`speedX, speedY = ${speedX}, ${speedY}`);
    }
}

function resetInactivity() {
    isInactive = false;
    // Code à exécuter lorsque le codeur redevient actif
    container.style.display = "none";
}

// Temps d'inactivité en millisecondes
const inactivityTime = 5000; // 5 minutes

let inactivityTimer = setTimeout(checkInactivity, inactivityTime);

function resetTimer() {
    clearTimeout(inactivityTimer);

    if (isInactive) {
        resetInactivity();
    }

    inactivityTimer = setTimeout(checkInactivity, inactivityTime);
}

window.addEventListener('mousemove', resetTimer);
window.addEventListener('keydown', resetTimer);
