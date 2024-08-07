import React from 'react';
import { useStore } from '../../FileDataStore';

const InvoiceErrorPage = () => {
  const fileData = useStore((store) => store.fileData);

  return (
    <div className="p-8 bg-[#240046] min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-white">Invoice Errors</h1>
      {fileData ? (
        <table className="min-w-full bg-white border-[2px] border-gray-300 rounded-[10px] overflow-hidden">
          <thead>
            <tr className="bg-[#5A189A]">
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left rounded-tl-[10px]">Invoice Number</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Date</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Customer Name</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Total Amount</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Item Description</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Item Quantity</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Item Price</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Item Total</th>
              <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left rounded-tr-[10px]">Errors</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((invoice, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Invoice Number']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice.Date}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Customer Name']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Total Amount']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Item Description']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Item Quantity']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Item Price']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice['Item Total']}</td>
                <td className="py-3 px-4 border-b-[2px] border-gray-300">{invoice.Errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-white">No data available</p>
      )}
    </div>
  );
};

export default InvoiceErrorPage;
