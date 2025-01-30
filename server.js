const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000; // Backend runs on port 5000

app.use(cors());
app.use(express.json());

let rants = [];

app.post('/api/rants', (req, res) => {
    const rant = req.body.text;
    if (rant) {
        const timestamp = new Date().toISOString();
        rants.push({ text: rant, timestamp });

        if (rants.length > 3) {
            rants.shift(); // Keep only the 3 most recent rants
        }

        res.status(200).json({ message: 'Rant added successfully' });
    } else {
        res.status(400).json({ error: 'Rant text is required' });
    }
});

app.get('/api/rants', (req, res) => {
    res.status(200).json(rants);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

