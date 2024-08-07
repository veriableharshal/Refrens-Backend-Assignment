const validateFileData = require('../helpers/validateData');

test('validates correct data without errors', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" }
    ];
    const errors = validateFileData(data);
    expect(errors.length).toBe(0);
});

test('returns errors for missing required fields', () => {
    const data = [
        { "Invoice Number": "", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" }
    ];
    const errors = validateFileData(data);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].Errors).toContain('"Invoice Number" is required');
});

test('returns errors for incorrect date format', () => {
    const data = [
        { "Invoice Number": "001", "Date": "2022-01-01", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" }
    ];
    const errors = validateFileData(data);
    expect(errors.some(error => error.Errors.includes('Invalid date "2022-01-01"'))).toBe(true);
});

test('returns errors for non-numeric fields', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "two", "Item Price": "fifty", "Item Total": "one hundred" }
    ];
    const errors = validateFileData(data);
    expect(errors.some(error => error.Errors.includes('"two" must be a valid number'))).toBe(true);
    expect(errors.some(error => error.Errors.includes('"fifty" must be a valid number'))).toBe(true);
    expect(errors.some(error => error.Errors.includes('"one hundred" must be a valid number'))).toBe(true);
});

test('validates uniqueness of invoice number with consistent data', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" },
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 2", "Item Quantity": "1", "Item Price": "50", "Item Total": "50" }
    ];
    const errors = validateFileData(data);
    expect(errors.length).toBe(0);
});

test('returns errors for duplicate invoice numbers with different data', () => {
    const data = [
        { "Invoice Number": "001", "Date": "01-01-2022", "Customer Name": "John Doe", "Total Amount": "100", "Item Description": "Item 1", "Item Quantity": "2", "Item Price": "50", "Item Total": "100" },
        { "Invoice Number": "001", "Date": "02-01-2022", "Customer Name": "Jane Doe", "Total Amount": "200", "Item Description": "Item 2", "Item Quantity": "1", "Item Price": "200", "Item Total": "200" }
    ];
    const errors = validateFileData(data);
    expect(errors.some(error => error.Errors.includes('Duplicate invoice number: 001 with different data'))).toBe(true);
});
