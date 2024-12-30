const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
    name: String,
    sune: Number,
    antisune: Number,
    t: Number,
    u: Number,
    l: Number,
    h: Number,
    pi: Number,
});

const Progress = mongoose.model("Progress", ProgressSchema);

export default async function handler(req, res) {
    if (req.method === "POST") {
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
            res.status(500).json({ success: false, message: "Error updating progress" });
        }
    } else {
        res.status(405).json({ success: false, message: "Method Not Allowed" });
    }
}
