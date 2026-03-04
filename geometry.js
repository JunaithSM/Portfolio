const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 15; // Pulled back slightly since shapes are bigger

// --- 1. GEOMETRY SETUP (Scaled up by ~2x) ---
const geometries = [
    new THREE.BoxGeometry(1.2, 1.2, 1.2),         // Bigger Cube
    new THREE.ConeGeometry(0.8, 1.6, 4),          // Bigger Pyramid
    new THREE.CylinderGeometry(0.6, 0.6, 1.4, 6), // Bigger Cylinder
    new THREE.IcosahedronGeometry(1.0, 0)         // Bigger Low-poly Sphere
];

// Constant White Material
const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,       // Lowered opacity slightly so bigger shapes aren't distracting
    shininess: 100,
    wireframe: true     // High-tech structural look
});

// Lights - Critical for white wireframe depth
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// --- 2. OBJECT GENERATION ---
const shapesCount = 35; // Slightly fewer shapes because they are larger
const shapes = [];

for (let i = 0; i < shapesCount; i++) {
    const randomGeo = geometries[Math.floor(Math.random() * geometries.length)];
    const mesh = new THREE.Mesh(randomGeo, material); // Use shared material for better performance

    mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30
    );

    mesh.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.015,
        offset: Math.random() * Math.PI * 2
    };

    scene.add(mesh);
    shapes.push(mesh);
}

// --- 3. ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0005; // Slightly slower for a more peaceful feel

    shapes.forEach((mesh) => {
        // Independent rotation
        mesh.rotation.x += mesh.userData.rotSpeed;
        mesh.rotation.y += mesh.userData.rotSpeed;

        // Slow drifting movement
        mesh.position.y += Math.sin(time + mesh.userData.offset) * 0.008;
        mesh.position.x += Math.cos(time + mesh.userData.offset) * 0.004;

        // Reset depth if they get too close to the camera
        mesh.position.z += 0.005;
        if (mesh.position.z > 12) mesh.position.z = -25;
    });

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();