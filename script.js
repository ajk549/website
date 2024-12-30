document.addEventListener("DOMContentLoaded", () => {
    // Fetching progress data and populating the home page
    if (window.location.pathname === "/") {
        fetch("/api/progress")
            .then((response) => response.json())
            .then((data) => {
                const progressContainer = document.getElementById("progress-container");
                data.forEach((entry) => {
                    const userProgress = `
                        <div class="progress-item">
                            <h3>${entry.name}</h3>
                            <p>Sune: ${entry.sune} / 72</p>
                            <p>Antisune: ${entry.antisune} / 72</p>
                            <p>T: ${entry.t} / 72</p>
                            <p>U: ${entry.u} / 72</p>
                            <p>L: ${entry.l} / 72</p>
                            <p>H: ${entry.h} / 40</p>
                            <p>PI: ${entry.pi} / 72</p>
                        </div>
                    `;
                    progressContainer.innerHTML += userProgress;
                });
            });
    }

    // Handle progress update form submission
    if (window.location.pathname === "/update") {
        const form = document.getElementById("updateForm");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const set = document.getElementById("set").value;
            const progress = document.getElementById("progress").value;

            fetch("/api/progress/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, set, progress }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert("Progress updated successfully!");
                    } else {
                        alert("Error updating progress.");
                    }
                });
        });
    }
});
