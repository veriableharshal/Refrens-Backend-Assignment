const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // Import the cors package
const fileUpload = require('./fileUpload');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Set up multer to save files in the 'uploads' directory
const upload = multer({ dest: path.join(__dirname, 'uploads') });

app.post('/upload', upload.single('file'), fileUpload.uploadFile);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
