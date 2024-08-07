const moment = require("moment");

const validateFileData = (data) => {
  const errors = [];
  const invoiceMap = new Map();

  data.forEach((row) => {
    const errorMessage = [];
    const requiredFields = [
      'Invoice Number',
      'Date',
      "Customer Name",
      "Total Amount",
      "Item Description",
      "Item Quantity",
      "Item Price",
      "Item Total",
    ];


    requiredFields.forEach((field) => {
      if (!row[field]) {
        errorMessage.push(`"${field}" is required`);
      }
    });

   
    if (row["Date"] && !moment(row["Date"], "DD-MM-YYYY", true).isValid()) {
      errorMessage.push(`Invalid date "${row["Date"]}"`);
    }

    ["Total Amount", "Item Quantity", "Item Price", "Item Total"].forEach((field) => {
      if (row[field] && isNaN(Number(row[field]))) {
        errorMessage.push(`"${row[field]}" must be a valid number`);
      }
    });

    // Validate invoice uniqueness
    const invoiceNumber = row["Invoice Number"];
    if (row["Date"] && row["Customer Name"] && row["Total Amount"]) {
      const uniqueIdentifier = `${row["Customer Name"]}-${row["Date"]}-${row["Total Amount"]}`;
      if (!invoiceMap.has(invoiceNumber)) {
        invoiceMap.set(invoiceNumber, uniqueIdentifier);
      } else {
        if (invoiceMap.get(invoiceNumber) !== uniqueIdentifier) {
          errorMessage.push(`Duplicate invoice number: ${invoiceNumber} with different data`);
        }
      }
    }

    // Collect errors for the current row
    if (errorMessage.length > 0) {
      row["Errors"] = errorMessage.join(", ");
      errors.push(row);
    }
  });

  return errors;
};

module.exports = validateFileData;
