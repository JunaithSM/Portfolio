window.addEventListener('load', () => {
    const overlay = document.getElementById('boot-overlay');
    const cube = document.querySelector('.cube-wrapper');

    // How long you want the cube to show (e.g., 2.5 seconds)
    setTimeout(() => {
        // 1. Shrink and fade the cube/text
        overlay.style.opacity = "0";
        overlay.style.filter = "blur(20px)";
        overlay.style.transform = "scale(1.1)";
        overlay.style.pointerEvents = "none";

        // 2. Trigger the portfolio reveal
        setTimeout(() => {
            document.body.classList.add('site-ready');
        }, 200);

        // 3. Remove overlay from DOM
        setTimeout(() => {
            overlay.style.display = "none";
        }, 1200);

    }, 2500);
});