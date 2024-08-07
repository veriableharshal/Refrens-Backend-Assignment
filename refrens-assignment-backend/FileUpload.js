const path = require("path");
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
    console.log("Invoice is created successfully")
  } else if (ext === ".xlsx") {

    processExcel(filePath, res);
    console.log("Invoice is created successfully")
  
  } else {
    res.status(400).send("Unsupported file type.");
  }
};

module.exports = {
  uploadFile,
};
