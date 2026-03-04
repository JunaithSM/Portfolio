
const bootLines = [
    "> PARVEN_OS v2.6.0 (Kernel 6.12.0-arch-1-LTS)",
    "> INITIALIZING SYSTEM BOOT...",
    "> DETECTING HARDWARE... [OK]",
    "> CHECKING RAM... 16GB (Detected 'AI-Ready' markup: +400% Price)",
    "> ERROR: LOCAL_LLM_NOT_FOUND. Reason: GPU Poor.",
    "> MOUNTING /dev/sda1 AS READ-WRITE...",
    "> LOADING DRIVERS... [OK]",
    "> STARTING X-SERVER... (Please don't flicker)",
    "> OPTIMIZING L3 CACHE... (The only thing AI hasn't ruined yet)",
    "> SUDO RM -RF /USER/STRESS... [PERMISSION DENIED]",
    "> SYSTEM CHECK COMPLETE. NO KERNEL PANIC DETECTED.",
    "> WELCOME TO THE MACHINE."
];

const terminal = document.getElementById('terminal-text');
const overlay = document.getElementById('boot-overlay');
let lineIndex = 0;

function typeLine() {
    if (lineIndex < bootLines.length) {
        const p = document.createElement('div');
        p.style.marginBottom = "5px";
        p.style.fontSize = "0.95rem";

        let text = bootLines[lineIndex];

        if (text.includes("ERROR")) {
            p.style.color = "#ff2020";
        } else if (text.includes("[OK]")) {
            text = text.replace("[OK]", "<span style='color:#45bc1a'>[OK]</span>");
        } else if (text.includes("AI-Ready") || text.includes("markup")) {
            p.style.color = "#f6dd1c";
        } else if (text.includes("SUDO")) {
            p.style.color = "#c6ff1d";
        }

        p.innerHTML = text;
        terminal.appendChild(p);
        lineIndex++;

        let delay = Math.random() * 150 + 50;
        if (text.includes("GPU Poor")) delay = 1000;
        if (text.includes("PERMISSION DENIED")) delay = 800;

        setTimeout(typeLine, delay);
    } else {
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        terminal.appendChild(cursor);

        setTimeout(() => {
            overlay.style.transition = "opacity 0.8s ease, transform 1s ease, filter 0.8s ease";
            overlay.style.opacity = "0";
            overlay.style.filter = "blur(20px)";
            overlay.style.transform = "scale(1.1)";
            overlay.style.pointerEvents = "none";

            setTimeout(() => {
                document.body.classList.add('site-ready');
            }, 200);

            setTimeout(() => {
                overlay.style.display = "none";
            }, 1200);
        }, 1500);
    }
}

// Trigger boot sequence on page load
window.addEventListener('load', () => {
    setTimeout(typeLine, 400);
});
