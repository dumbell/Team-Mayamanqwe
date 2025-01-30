// index.js (or your server file)
const express = require('express');
const app = express();
const port = 5000;

// In-memory store for rants (you could use a database in production)
let rants = [];

// Middleware to parse JSON requests
app.use(express.json());

// POST /api/rants - Store new rant
app.post('/api/rants', (req, res) => {
    const { text } = req.body;
    const timestamp = new Date().toISOString();
    const newRant = { text, timestamp, likes: 0 };
    
    // Add the new rant to the beginning of the list
    rants.unshift(newRant);
    
    // If more than 3 rants, remove the oldest
    if (rants.length > 3) {
        rants.pop();
    }

    res.json(newRant); // Send the added rant back as response
});

// GET /api/rants - Get the latest 3 rants
app.get('/api/rants', (req, res) => {
    res.json(rants);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

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

const cors = require('cors');
app.use(cors());

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
