const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Simulate progress data
const progressData = [
    {
        name: "Daniel Karnaukh",
        sune: 10,
        antisune: 8,
        t: 15,
        u: 12,
        l: 5,
        h: 2,
        pi: 9,
    },
    {
        name: "Christopher Chi",
        sune: 20,
        antisune: 12,
        t: 30,
        u: 18,
        l: 10,
        h: 4,
        pi: 18,
    },
    {
        name: "Alexei Sinyavin",
        sune: 25,
        antisune: 20,
        t: 35,
        u: 22,
        l: 15,
        h: 6,
        pi: 22,
    },
];

// API route to get progress data
app.get("/api/progress", (req, res) => {
    res.json(progressData);
});

// API route to update progress
app.post("/api/progress/update", (req, res) => {
    const { name, set, progress } = req.body;

    // Find the user in the progress data
    const user = progressData.find((entry) => entry.name === name);
    if (user) {
        user[set] = progress; // Update the progress
        res.status(200).json({ success: true });
    } else {
        res.status(404).json({ success: false, message: "User not found" });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log
