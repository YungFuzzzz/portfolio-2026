import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Groene kubus
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

let lastTime = performance.now();

function animate(currentTime) {
    requestAnimationFrame(animate);

    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    // Rotatie per seconde
    const rotationSpeed = 1;
    cube.rotation.x += rotationSpeed * delta;
    cube.rotation.y += rotationSpeed * delta;

    renderer.render(scene, camera);
}
animate(performance.now());

// Responsive canvas
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});