Here's the updated `README.md` file with corrections and improvements:

---

# Assignment -> Invoice Upload, Validation, and JSON Conversion

This is an assignment project that allows users to upload their invoices in the form of CSV or Excel format. The uploaded invoice data is sent to an endpoint where it is validated and converted to JSON format. This data can then be viewed on the UI.

## Features

- **File Support:** Supports both CSV and Excel file formats.
- **Data Validation:** Data is validated before creating an invoice.
- **JSON Conversion:** Converts valid invoices into a structured JSON format.
- **Error Handling:** Handles errors throughout the process with descriptive messages.
- **Front-End Display:** Visual representation of valid invoices in a formatted invoice layout and detailed error reporting for invalid rows.

## Setup and Run Instructions

### Prerequisites

- **Node.js:** Ensure you have Node.js installed (version 12 or later). If not, then install Node.js.
- **NPM:** Node Package Manager is required for installing dependencies.

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/veriableharshal/Refrens-Backend-Assignment.git
   cd Refrens-Backend-Assignment
   ```
   
2. **Install Dependencies:**
   ```bash
   cd front-end
   npm install
   cd ..
   cd back-end
   npm install
   ```

### Running the Application
1. **Start the Server:**
   ```bash
   npm run dev
   ```
   The server will run on http://localhost:3000

2. **Run the React App:**
   ```bash
   npm run dev
   ```

### Upload an Invoice File
There are two ways to upload an invoice file:

1. **Using User Interface:**
   - Click on the "Browse Computer" button to select a file OR you can drag and drop the file.
   - Click on the "Upload" button to upload the file to the server.

2. **Using a tool like Postman or cURL:**
   - Send a POST request to http://localhost:3000/upload
   - Example request with cURL:
     ```bash
     curl -X POST http://localhost:3000/upload -F 'file=@path/to/your/invoice.csv'
     ```

## Error Reporting
Rows with errors are displayed in a table with all corresponding errors shown in a different column called "Errors."

### Example Error Report
![Example Error Report](https://github.com/veriableharshal/Refrens-Backend-Assignment/blob/main/Redme_File_Images/Invoice_Error_file.png)

## JSON Structure
Valid invoices are converted into the following JSON structure:
```json
[
  {
    "invoiceNumber": "INV-001",
    "date": "20-01-2024",
    "customerName": "Ted Mosby",
    "totalAmount": 560,
    "items": [
      { "description": "Widget A", "quantity": 2, "price": 50, "total": 100 },
      { "description": "Widget B", "quantity": 1, "price": 150, "total": 150 },
      { "description": "Widget C", "quantity": 3, "price": 70, "total": 210 },
      { "description": "Widget D", "quantity": 1, "price": 100, "total": 100 }
    ]
  }
  ...
]
```

### JSON Fields
- `invoiceNumber`: Unique identifier for the invoice.
- `date`: Date of the invoice.
- `customerName`: Name of the customer.
- `totalAmount`: Total amount for the invoice.
- `items`: List of items in the invoice, each containing:
  - `description`: Description of the item.
  - `quantity`: Quantity of the item.
  - `price`: Price per unit of the item.
  - `total`: Total price for the item (quantity * price).

### Example Valid Invoice
![Example Invoice](https://github.com/veriableharshal/Refrens-Backend-Assignment/blob/main/Redme_File_Images/Invoice_Page.png)

## Assumptions & Design Decisions
1. **About Dataset:** Since I was not provided with data, I researched examples to implement as the dataset. All logic and validations are applied according to this dataset.
2. **JSON format:** For ease of use, the processed invoice data is formatted in JSON. For example, all invoice items with the same invoice number and date are stored in the same invoice information.
3. **Date Format:** All dates in the invoice are assumed to be in DD-MM-YYYY format, commonly used in India.
4. **Numeric Validation:** All numeric fields are validated to be proper numbers, considering potential decimals.
5. **Front-End Display:** To make it user-friendly, I created a frontend so the invoices can be easily shown to the user, and it is easier for me as a developer to explore potential bugs.

---