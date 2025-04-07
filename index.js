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

app.get('/mails', (req, res) => {
  const key = req.query.key;

  if (key !== 'soyfermin') {
    return res.status(401).send('Unauthorized');
  }

  fs.readFile('emails.txt', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading emails');
    }

    const emails = data.trim().split('\n').filter(Boolean);

    const html = `
      <html>
        <head>
          <title>Eternia - Registered Emails</title>
          <style>
            body {
              font-family: sans-serif;
              padding: 40px;
              background-color: #0e0e0e;
              color: white;
            }
            h1 {
              color: #00ffd5;
            }
            ul {
              list-style: none;
              padding-left: 0;
            }
            li {
              background: #1a1a1a;
              margin: 6px 0;
              padding: 10px;
              border-radius: 6px;
            }
          </style>
        </head>
        <body>
          <h1>💾 Eternia - Registered Emails</h1>
          <ul>
            ${emails.map(email => `<li>${email}</li>`).join('')}
          </ul>
        </body>
      </html>
    `;

    res.send(html);
  });
});
