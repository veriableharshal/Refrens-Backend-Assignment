const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const XLSX = require("xlsx");
const convertToJSON = require("./JSONConverter");
const validateFileData = require("./validateData");

const processCSV = (filePath, res) => {
  const data = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      data.push(row);
    })
    .on("end", () => {
      const refineData = data.map((row) => {
        const cleanRow = Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.trim(), value.trim()])
        );
        return cleanRow;
      });

      const dataValidation = validateFileData(refineData);


      const jsonData = convertToJSON(refineData);
     
      console.log(jsonData)

      res.json({
        status: "OK",
        type: dataValidation.length > 0 ? "Invalid" : "Valid",
        data: dataValidation.length > 0 ? dataValidation : jsonData,
        message: dataValidation.length > 0 ? "Validation errors found." : "File processed successfully",
      });
    })
    .on("error", (error) => {
      res.status(500).send("Error processing CSV file: " + error.message);
    });
};

const processExcel = (filePath, res) => {
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const dataRow = [];

    if (data.length === 0) {
      return res.status(400).send("Empty Excel file.");
    }

    const headers = data[0];

    data.slice(1).forEach((row) => {
      const mapData = {};

      headers.forEach((header, index) => {
        const value = row[index] || "";
        if (header === "Date") {
          const jsDate = XLSX.SSF.parse_date_code(value);
          const formattedDate = `${("0" + jsDate.d).slice(-2)}-${("0" + (jsDate.m + 1)).slice(-2)}-${jsDate.y}`;
          mapData[header] = formattedDate;
        } else {
          mapData[header] = value.toString().trim();
        }
      });
      dataRow.push(mapData);
    });

    const dataValidation = validateFileData(dataRow);

 
    const jsonData = convertToJSON(dataRow);

    console.log(jsonData)

    res.json({
      status: "OK",
      type: dataValidation.length > 0 ? "Invalid" : "Valid",
      data: dataValidation.length > 0 ? dataValidation : jsonData,
      message: dataValidation.length > 0 ? "Validation errors found." : "File processed successfully",
    });
  } catch (error) {
    res.status(500).send("Error processing Excel file: " + error.message);
  }
};

module.exports = {
  processCSV,
  processExcel,
};
