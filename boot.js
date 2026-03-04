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
        p.textContent = bootLines[lineIndex];
        terminal.appendChild(p);
        lineIndex++;

        // Random delay to simulate "processing" time
        const delay = Math.random() * 400 + 100;
        setTimeout(typeLine, delay);
    } else {
        // Add a final cursor and then fade out
        terminal.innerHTML += '<span class="cursor"></span>';
        setTimeout(() => {
            overlay.style.transition = "opacity 1s ease";
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
            }, 1000);
        }, 1000);
    }
}

// Start the sequence after a brief initial pause
window.addEventListener('load', () => {
    setTimeout(typeLine, 500);
});