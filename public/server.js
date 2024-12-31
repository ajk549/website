
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const competitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  progress: {
    sune: { type: Number, min: 0, max: 72, default: 0 },
    antisune: { type: Number, min: 0, max: 72, default: 0 },
    t: { type: Number, min: 0, max: 72, default: 0 },
    u: { type: Number, min: 0, max: 72, default: 0 },
    l: { type: Number, min: 0, max: 72, default: 0 },
    h: { type: Number, min: 0, max: 40, default: 0 },
    pi: { type: Number, min: 0, max: 72, default: 0 },
  },
  total: { type: Number, default: 0 }
});

const Competitor = mongoose.model('Competitor', competitorSchema);

const connectionString = 'mongodb+srv://ajk54:54905490@ajk.knn6a.mongodb.net/?retryWrites=true&w=majority&appName=ajk'; 

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Error connecting to MongoDB:', error));




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Define competitors and their initial progress
let competitors = [
    {
        name: "Daniel Karnaukh",
        progress: {
            sune: 0,
            antisune: 0,
            t: 0,
            u: 0,
            l: 0,
            h: 0,
            pi:0
        },
        
    },
    {
        name: "Christopher Chi",
        progress: {
            sune: 0,
            antisune: 0,
            t: 0,
            u: 0,
            l: 0,
            h: 0,
            pi: 0
        },
        
    },
    {
        name: "Alexei Sinyavin",
        progress: {
            sune: 0,
            antisune: 0,
            t: 0,
            u: 0,
            l: 0,
            h: 0,
            pi: 0
        },
            }
];

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve update.html
app.get('/update', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'update.html'));
});









// Endpoint to fetch all competitors and their progress from MongoDB
app.get('/api/progress', async (req, res) => {
    try {
        // Fetch competitors from MongoDB
        const competitors = await Competitor.find().sort({ total: -1 }); // Sort by total progress in descending order

        // Send the competitors as JSON response
        res.json(competitors);
    } catch (error) {
        console.error("Error fetching competitors:", error);
        res.status(500).json({ error: "Failed to fetch competitors." });
    }
});














app.post('/api/progress/update', async (req, res) => {
  const { name, set, progress } = req.body;

  try {
    let competitor = await Competitor.findOne({ name });

    if (!competitor) {
      competitor = new Competitor({
        name,
        progress: { sune: 0, antisune: 0, t: 0, u: 0, l: 0, h: 0, pi: 0 },
      });
    }

    competitor.progress[set] = progress; 
    await competitor.save();

    res.status(200).json({ message: 'Progress updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update progress.' });
  }
});




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
