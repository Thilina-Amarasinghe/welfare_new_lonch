const canvas = document.getElementById("signature-pad");
const launchBtn = document.getElementById("launchBtn");
const clearBtn = document.getElementById("clearBtn");

const revealScreen = document.getElementById("revealScreen");
const revealLogo = document.getElementById("revealLogo");

// Canvas resize
function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    const ctx = canvas.getContext("2d");
    ctx.scale(ratio, ratio);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Signature Pad
const signaturePad = new SignaturePad(canvas, {
    backgroundColor: "rgb(255,255,255)"
});

// Sign කළාම button active කරන්න
function enableLaunchButton() {
    if (!signaturePad.isEmpty()) {
        launchBtn.disabled = false;
    }
}

// Mouse
canvas.addEventListener("mouseup", enableLaunchButton);

// Touch
canvas.addEventListener("touchend", enableLaunchButton);

// Pointer
canvas.addEventListener("pointerup", enableLaunchButton);

// Clear Button
clearBtn.addEventListener("click", () => {
    signaturePad.clear();
    launchBtn.disabled = true;
});

// Launch Button
launchBtn.addEventListener("click", () => {

    // Safety check
    if (signaturePad.isEmpty()) {
        alert("Please provide your signature first.");
        return;
    }

    // Hide launch screen
    document.querySelector(".container").style.display = "none";

    // Show reveal screen
    revealScreen.style.display = "block";

    // Logo animation
    setTimeout(() => {
        revealLogo.classList.add("showLogo");
    }, 300);

    // Redirect after 5 sec
    setTimeout(() => {
        window.location.href = "https://www.welfare.dlb.lk";
    }, 5000);

});

console.log("SCRIPT LOADED SUCCESSFULLY");
