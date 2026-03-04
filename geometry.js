const canvas = document.querySelector('#bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;

// --- 1. GEOMETRY & MATERIAL ---
// Reusing geometries across meshes is memory-efficient
const geometries = [
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.ConeGeometry(0.8, 1.6, 4),
    new THREE.CylinderGeometry(0.6, 0.6, 1.4, 6),
    new THREE.IcosahedronGeometry(1.0, 0)
];

// MeshBasicMaterial is faster than Phong for wireframes (no light math needed)
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.3,
    wireframe: true
});

// --- 2. OBJECT GENERATION ---
const shapes = [];
for (let i = 0; i < 35; i++) {
    const geo = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(geo, material);

    mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
    );

    // Store custom properties directly for faster access in the loop
    mesh.userData.rot = (Math.random() - 0.5) * 0.015;
    mesh.userData.off = Math.random() * Math.PI * 2;

    scene.add(mesh);
    shapes.push(mesh);
}

// --- 3. ANIMATION LOOP ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime() * 0.5;

    for (let i = 0; i < shapes.length; i++) {
        const mesh = shapes[i];
        const { rot, off } = mesh.userData;

        // Rotation
        mesh.rotation.x += rot;
        mesh.rotation.y += rot;

        // Drifting
        mesh.position.y += Math.sin(elapsedTime + off) * 0.008;
        mesh.position.x += Math.cos(elapsedTime + off) * 0.004;

        // Depth Cycle
        mesh.position.z += 0.01;
        if (mesh.position.z > 12) mesh.position.z = -25;
    }

    renderer.render(scene, camera);
}

// --- 4. UTILS ---
window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
});

animate();