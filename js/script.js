const canvas = document.getElementById("signature-pad");
const launchBtn = document.getElementById("launchBtn");
const clearBtn = document.getElementById("clearBtn");

const revealScreen = document.getElementById("revealScreen");
const revealLogo = document.getElementById("revealLogo");

function resizeCanvas() {

    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;

    canvas.getContext("2d").scale(ratio, ratio);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

const signaturePad = new SignaturePad(canvas, {

    backgroundColor: "rgb(255,255,255)",

    onEnd: () => {

        if (!signaturePad.isEmpty()) {
            launchBtn.disabled = false;
        }

    }

});

clearBtn.addEventListener("click", () => {

    signaturePad.clear();

    launchBtn.disabled = true;

});

launchBtn.addEventListener("click", () => {

    document.querySelector(".container").style.display = "none";

    revealScreen.style.display = "block";

    setTimeout(() => {

        revealLogo.classList.add("showLogo");

    }, 300);

    setTimeout(() => {

        window.location.href =
        "https://www.welfare.dlb.lk";

    }, 5000);

});