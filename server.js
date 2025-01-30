const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Use middleware to parse JSON
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/rants', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Rant Schema
const rantSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 }
});
// Create a Rant Model
const Rant = mongoose.model('Rant', rantSchema);

// POST /api/rants - Create a new rant
app.post('/api/rants', async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Rant text is required" });
  }

  try {
    const newRant = new Rant({ text });
    await newRant.save();

    // Get the latest 3 rants
    const latestRants = await Rant.find().sort({ timestamp: -1 }).limit(3);
    res.status(201).json(latestRants);
  } catch (err) {
    res.status(500).json({ error: "Failed to post rant" });
  }
});

// GET /api/rants - Get the latest rants
app.get('/api/rants', async (req, res) => {
  try {
    const latestRants = await Rant.find().sort({ timestamp: -1 }).limit(3);
    res.status(200).json(latestRants);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve rants" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
