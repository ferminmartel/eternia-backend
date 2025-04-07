const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ Eternia backend is running!');
});

// Ruta para guardar emails
app.post('/subscribe', (req, res) => {
  const email = req.body.email;
  if (!email || typeof email !== 'string') {
    return res.status(400).send('Invalid email');
  }

  const line = `${email.trim()}\n`;
  fs.appendFile('emails.txt', line, (err) => {
    if (err) {
      console.error('Error saving email:', err);
      return res.status(500).send('Internal server error');
    }
    res.send('Email saved');
  });
});

// Ruta para ver mails guardados (opcional)
app.get('/mails', (req, res) => {
  fs.readFile('emails.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading file');
    const lines = data.trim().split('\n');
    res.json(lines);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
