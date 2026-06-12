const canvas = document.getElementById("signature-pad");
const launchBtn = document.getElementById("launchBtn");
const clearBtn = document.getElementById("clearBtn");
const revealScreen = document.getElementById("revealScreen");
const verifyStatus = document.getElementById("verifyStatus");
const padWrapper = document.getElementById("padWrapper");

const animCanvas = document.getElementById("animationCanvas");
const ctx = animCanvas.getContext("2d");

let signaturePad;

function resizeCanvases() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    canvas.getContext("2d").scale(ratio, ratio);

    animCanvas.width = window.innerWidth;
    animCanvas.height = window.innerHeight;
}

window.addEventListener("DOMContentLoaded", () => {
    resizeCanvases();
    signaturePad = new SignaturePad(canvas, {
        backgroundColor: "rgba(255,255,255,0)", 
        penColor: "rgb(15, 23, 42)" // Draw signature using dark ink
    });

    canvas.addEventListener("mouseup", enableLaunchButton);
    canvas.addEventListener("touchend", enableLaunchButton);
    canvas.addEventListener("pointerup", enableLaunchButton);
});

window.addEventListener("resize", resizeCanvases);

function enableLaunchButton() {
    if (!signaturePad.isEmpty()) {
        verifyStatus.innerHTML = "⏳ SECURITY AUTHS VERIFYING...";
        verifyStatus.className = "verifying";

        setTimeout(() => {
            verifyStatus.innerHTML = "✓ SIGN-OFF AUTHENTICATED SUCCESSFULLY";
            verifyStatus.className = "verified";
            launchBtn.disabled = false;
        }, 1200);
    }
}

clearBtn.addEventListener("click", () => {
    signaturePad.clear();
    launchBtn.disabled = true;
    verifyStatus.innerHTML = "";
    verifyStatus.className = "";
    padWrapper.style.background = "#ffffff";
    padWrapper.style.border = "1px solid #ddd";
    canvas.style.filter = "none";
});

// --- METALLIC GOLD SCATTER ENGINE ---
let particles = [];
let animationStage = 0; 

// Premium Luxury Gold Palette
const goldPalette = ["#ffea85", "#d4af37", "#aa771c", "#f3e5ab", "#f1c40f"];

class Particle {
    constructor(startX, startY) {
        this.x = startX;
        this.y = startY;
        
        this.size = Math.random() * 2.5 + 1;
        this.color = goldPalette[Math.floor(Math.random() * goldPalette.length)];
        this.alpha = 1;
        
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 2.5; 
        
        this.gravity = 0.06;
        this.friction = 0.97;
        this.fadeSpeed = Math.random() * 0.01 + 0.006;
    }

    update() {
        if (animationStage === 1) {
            this.x += this.vx;
            this.y += this.vy;
            
            this.vy += this.gravity;
            this.vx *= this.friction;
            this.vy *= this.friction;
            
            if (this.alpha > 0) this.alpha -= this.fadeSpeed;
        } else if (animationStage === 2) {
            this.y -= Math.random() * 0.3 + 0.1;
            if (this.y < 0) {
                this.y = window.innerHeight;
                this.x = Math.random() * window.innerWidth;
                this.alpha = Math.random() * 0.6 + 0.2;
            }
        }
    }

    draw() {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#aa771c";
        ctx.fill();
        ctx.restore();
    }
}

function setupParticleSystem() {
    particles = [];
    const sigLines = signaturePad.toData();
    
    if (sigLines.length > 0) {
        sigLines.forEach(line => {
            line.points.forEach(pt => {
                const rect = canvas.getBoundingClientRect();
                for (let k = 0; k < 2.5; k++) {
                    particles.push(new Particle(rect.left + pt.x, rect.top + pt.y));
                }
            });
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, animCanvas.width, animCanvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// Trigger Professional Cinematic Launch
launchBtn.addEventListener("click", () => {
    if (signaturePad.isEmpty()) return;

    // Premium Gold Transformation Effect
    const sigCtx = canvas.getContext("2d");
    
    // Make the white signature area fully transparent
    padWrapper.style.background = "transparent"; 
    padWrapper.style.border = "1px solid transparent";
    padWrapper.style.boxShadow = "none";

    // Create a realistic luxury gold gradient directly inside the canvas
    const goldGrad = sigCtx.createLinearGradient(0, 0, canvas.width, 0);
    goldGrad.addColorStop(0, "#aa771c");
    goldGrad.addColorStop(0.25, "#f3e5ab");
    goldGrad.addColorStop(0.5, "#d4af37");
    goldGrad.addColorStop(0.75, "#ffea85");
    goldGrad.addColorStop(1, "#aa771c");

    // Replace only the signature stroke with the gold gradient
    sigCtx.save();
    sigCtx.globalCompositeOperation = "source-in";
    sigCtx.fillStyle = goldGrad;
    sigCtx.fillRect(0, 0, canvas.width, canvas.height);
    sigCtx.restore();

    // Apply a natural gold glow effect
    canvas.style.filter = "drop-shadow(0px 0px 15px #d4af37) drop-shadow(0px 0px 4px #ffea85)";
    
    // STEP 2: Hold the gold signature on screen for 5 seconds
    setTimeout(() => {
        setupParticleSystem();
        animationStage = 1; 
        
        revealScreen.style.display = "block";
        revealScreen.style.pointerEvents = "auto";
        animate();

        gsap.to(".container", {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.querySelector(".container").style.display = "none";
            }
        });

    }, 5000); 

    // STEP 3: Smooth reveal of the final DLB logo
    setTimeout(() => {
        animationStage = 2; 
        
        gsap.to("#finalContent", {
            opacity: 1,
            scale: 1,
            duration: 2.5,
            ease: "power3.out"
        });
    }, 6500); 

    // STEP 4: Redirect to the website
    setTimeout(() => {
        window.location.href = "https://www.welfare.dlb.lk";
    }, 12500);
});

console.log("DLB Professional Launch Suite Initialized.");
