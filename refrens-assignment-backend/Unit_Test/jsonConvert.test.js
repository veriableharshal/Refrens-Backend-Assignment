const convertToJSON = require('../helpers/JSONConverter');

test('converts data to JSON format correctly', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" }
    ];
    const jsonData = convertToJSON(data);
    expect(jsonData).toEqual([
        {
            invoiceNumber: "001",
            date: "01-01-2022",
            customerName: "John Doe",
            totalAmount: 100,
            items: [
                {
                    description: "Item 1",
                    quantity: 2,
                    price: 50,
                    total: 100
                }
            ]
        }
    ]);
});

test('handles multiple line items per invoice', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "200", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" },
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "200", "Item Description": "Item 2", "Item Quantity": "1", "Item Price": "100", "Item Total": "100" }
    ];
    const jsonData = convertToJSON(data);
    expect(jsonData).toEqual([
        {
            invoiceNumber: "001",
            date: "01-01-2022",
            customerName: "John Doe",
            totalAmount: 200,
            items: [
                {
                    description: "Item 1",
                    quantity: 2,
                    price: 50,
                    total: 100
                },
                {
                    description: "Item 2",
                    quantity: 1,
                    price: 100,
                    total: 100
                }
            ]
        }
    ]);
});
