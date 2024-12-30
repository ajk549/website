const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// Progress Schema and Model
const progressSchema = new mongoose.Schema({
    name: String,
    sune: Number,
    antisune: Number,
    t: Number,
    u: Number,
    l: Number,
    h: Number,
    pi: Number,
});
const Progress = mongoose.model("Progress", progressSchema);

// Serve Main Page
app.get("/website", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve Update Page
app.get("/website/update", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "update.html"));
});

// API: Update Progress
app.post("/api/progress/update", async (req, res) => {
    const { name, set, progress } = req.body;

    try {
        const userProgress = await Progress.findOne({ name });

        if (userProgress) {
            userProgress[set] = progress;
            await userProgress.save();
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: "Error updating progress" });
    }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
