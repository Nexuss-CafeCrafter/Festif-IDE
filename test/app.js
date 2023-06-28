const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mbo.css', (req, res) => {
  const cssPath = path.join(__dirname, 'styles.css');
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  res.setHeader('Content-Type', 'text/css');
  res.send(cssContent);
});

app.get('/images/pastaga.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'pastaga.ico'));
});

app.get('/images/beer-pong.png', (req, res) => {
  res.sendFile(path.join(__dirname, 'beer-pong.png'));
});

app.get('/musics/sardines_1min.mp3', (req, res) => {
  res.sendFile(path.join(__dirname, 'musics', 'sardines_1min.mp3'));
});

app.post('/saveFile', (req, res) => {
  const filePath = req.body.filePath;
  const fileContents = req.body.fileContents;

  fs.writeFile(path.join(__dirname, filePath), fileContents, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while saving the file.' });
    } else {
      res.json({ message: 'File saved successfully.' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
