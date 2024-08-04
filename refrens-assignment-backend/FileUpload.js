const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const XLSX = require('xlsx');

const uploadFile = (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = path.join(__dirname, 'uploads', file.filename);
  console.log('File path:', filePath);

  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === '.csv') {
    processCSV(filePath, res);
  } else if (ext === '.xlsx') {
    processExcel(filePath, res);
  } else {
    res.status(400).send('Unsupported file type.');
  }
};

const processCSV = (filePath, res) => {
  const fieldLengths = {};

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('headers', (headers) => {
      headers.forEach(header => {
        fieldLengths[header] = 0;
      });
    })
    .on('data', (row) => {
      for (const [key, value] of Object.entries(row)) {

        console.log(`${key}:${value}`)
        if (fieldLengths[key] < value.length) {
          fieldLengths[key] = value.length;


        }
      }
    })
    .on('end', () => {
      res.json({
        status: 'OK',
        fieldLengths: fieldLengths,
        message: 'File processed successfully'
      });
    })
    .on('error', (error) => {
      res.status(500).send('Error processing CSV file: ' + error.message);
    });
};

const processExcel = (filePath, res) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (data.length === 0) {
      return res.status(400).send('Empty Excel file.');
    }

    const headers = data[0];
    const fieldLengths = {};

    headers.forEach(header => {
      fieldLengths[header] = 0;
    });

    data.slice(1).forEach(row => {
      headers.forEach((header, index) => {
        const value = row[index] || '';
        if (fieldLengths[header] < value.toString().length) {
          fieldLengths[header] = value.toString().length;
        }
      });
    });

    res.json({
      status: 'OK',
      fieldLengths: fieldLengths,
      message: 'File processed successfully'
    });
  } catch (error) {
    res.status(500).send('Error processing Excel file: ' + error.message);
  }
};

module.exports = {
  uploadFile
};
