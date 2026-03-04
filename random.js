function applyRandomGlows() {
    const cards = document.querySelectorAll('.project-card');
    const colors = ['glow-red', 'glow-green', 'glow-blue'];

    cards.forEach(card => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        card.classList.add(randomColor);
    });
}

window.addEventListener('load', () => {
    applyRandomGlows();
});