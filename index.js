const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).send('No email provided');
  }

  fs.appendFile('emails.txt', email + '\n', err => {
    if (err) {
      console.error('Error saving email:', err);
      return res.status(500).send('Server error');
    }

    res.send('Email saved successfully');
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});