const convertToJSON = (data) => {
    const map = [];
  
    data.forEach((row) => {
      const invoiceNumber = row["Invoice Number"];
  
      if (!map[invoiceNumber]) {
        map[invoiceNumber] = {
          invoiceNumber,
          date: row["Date"],
          customerName: row["Customer Name"],
          totalAmount: parseFloat(row["Total Amount"]),
          items: [],
        };
      }
  
      map[invoiceNumber].items.push({
        description: row["Item Description"],
        quantity: parseInt(row["Item Quantity"], 10),
        price: parseFloat(row["Item Price"]),
        total: parseFloat(row["Item Total"]),
      });
    });
  
    return Object.values(map);
  };
  
  module.exports = convertToJSON;