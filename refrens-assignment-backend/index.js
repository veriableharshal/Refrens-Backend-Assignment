const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); 
const fileUpload = require('./FileUpload');

const app = express();

app.use(cors());

const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.post('/upload', upload.single('file'), fileUpload.uploadFile);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
