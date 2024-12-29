// Mapping colors for cube faces
const COLORS = {
    U: 'white', // Up
    D: 'yellow', // Down
    F: 'green', // Front
    B: 'blue', // Back
    L: 'orange', // Left
    R: 'red' // Right
};

// Initialize a solved cube state
let cubeState = {
    U: Array(9).fill('U'),
    D: Array(9).fill('D'),
    F: Array(9).fill('F'),
    B: Array(9).fill('B'),
    L: Array(9).fill('L'),
    R: Array(9).fill('R')
};

// Function to display the cube
function renderCube() {
    const cubeContainer = document.getElementById('cube-container');
    cubeContainer.innerHTML = ''; // Clear previous state

    // Render each face
    Object.keys(cubeState).forEach(face => {
        cubeState[face].forEach(() => {
            const tile = document.createElement('div');
            tile.classList.add('face');
            tile.style.backgroundColor = COLORS[face];
            cubeContainer.appendChild(tile);
        });
    });
}

// Event listener for Visualize button
document.getElementById('visualize-btn').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm-input').value.trim();

    if (algorithm) {
        // For now, just log the algorithm to the console
        alert(`Algorithm: ${algorithm}`);
    } else {
        alert('Please input an algorithm!');
    }

    renderCube();
});

// Initial rendering of the cube
renderCube();
