const express = require('express')
const app = express()
const path = require('path');
const multer = require('multer');
const wav = require('wav');
const outFile = 'demo.wav';

app.use(express.static(path.join(__dirname, 'dist')));
let upload = multer();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

var type = upload.single('form-data');

app.post('/upload', upload.fields([{ name: 'audio', maxCount: 1}]),function(req,res){
  let data = req.files.audio[0]; // multipart/form-data;
  var fileWriter = new wav.FileWriter(outFile, {
    channels: 2,
    sampleRate: 44100,
    bitDepth: 16
  });
  fileWriter.write(Buffer.from(data.buffer));
  fileWriter.end();
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Node js example to demo record audio and upload to server.'));
