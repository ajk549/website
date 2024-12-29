// Initialize a 3D scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Colors for the Rubik's Cube faces
const COLORS = {
    U: 0xffffff, // White
    D: 0xffff00, // Yellow
    F: 0x00ff00, // Green
    B: 0x0000ff, // Blue
    L: 0xffa500, // Orange
    R: 0xff0000, // Red
};

// Cube size and spacing
const CUBE_SIZE = 1;
const SPACING = 0.1;

// Function to create a small cube with face colors
function createCube(x, y, z) {
    const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);
    const materials = [
        new THREE.MeshBasicMaterial({ color: COLORS.R }), // Right
        new THREE.MeshBasicMaterial({ color: COLORS.L }), // Left
        new THREE.MeshBasicMaterial({ color: COLORS.U }), // Up
        new THREE.MeshBasicMaterial({ color: COLORS.D }), // Down
        new THREE.MeshBasicMaterial({ color: COLORS.F }), // Front
        new THREE.MeshBasicMaterial({ color: COLORS.B }), // Back
    ];
    const cube = new THREE.Mesh(geometry, materials);
    cube.position.set(x, y, z);
    return cube;
}

// Create a 3x3x3 Rubik's Cube
const cubes = [];
for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
            const miniCube = createCube(
                x * (CUBE_SIZE + SPACING),
                y * (CUBE_SIZE + SPACING),
                z * (CUBE_SIZE + SPACING)
            );
            cubes.push(miniCube);
            scene.add(miniCube);
        }
    }
}

// Position the camera
camera.position.z = 7;

// Add rotation animation
function animate() {
    requestAnimationFrame(animate);

    // Rotate the entire cube
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

// Event listener for Visualize button
document.getElementById('visualize-btn').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm-input').value.trim();
    alert(`Algorithm "${algorithm}" will be applied soon!`);
    // Add logic to parse and visualize algorithm here.
});
