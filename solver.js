document.getElementById("scrambleForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const scramble = document.getElementById("scramble").value.trim();
    const solutionOutput = document.getElementById("solutionOutput");

    if (!scramble) {
        solutionOutput.textContent = "Please enter a valid scramble.";
        return;
    }

    try {
        // Simulated cube solving (replace with actual algorithm/library)
        const response = await fetch(`https://example.com/solve?scramble=${encodeURIComponent(scramble)}`);
        const data = await response.json();
        if (data.solution) {
            solutionOutput.textContent = data.solution;
        } else {
            solutionOutput.textContent = "Could not solve the cube. Please check your input.";
        }
    } catch (error) {
        console.error(error);
        solutionOutput.textContent = "An error occurred while solving the cube.";
    }
});
