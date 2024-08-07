const path = require("path");
const multer = require("multer");
const { processCSV, processExcel } = require("./helpers/fileProcessors");


const uploadFile = (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = path.join(__dirname, "uploads", file.filename);
  console.log("File path:", filePath);

  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".csv") {
    processCSV(filePath, res);
  } else if (ext === ".xlsx") {
    processExcel(filePath, res);
  } else {
    res.status(400).send("Unsupported file type.");
  }
};

module.exports = {
  uploadFile,
};
