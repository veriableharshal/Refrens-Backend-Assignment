import React from 'react'
import { useStore } from '../../FileDataStore';

const InvoiceBox = () => {
    const fileData = useStore((store) => store.fileData);

    return (
      <div className="p-8 bg-[#240046] min-h-screen">
      
          <h1 className="text-3xl font-extrabold text-center mb-8 text-white">Your Invoice</h1>
          {fileData ? (
            fileData.map((invoice, index) => (
              <div key={index} className="mb-8 p-6 border border-gray-200 rounded-[15px] shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-4 text-[#3C096C]">Invoice Number: {invoice.invoiceNumber}</h2>
                <p className="text-gray-700 mb-2"><strong>Date:</strong> {invoice.date}</p>
                <p className="text-gray-700 mb-2"><strong>Customer Name:</strong> {invoice.customerName}</p>
                <p className="text-gray-700 mb-2"><strong>Total Amount:</strong> ${invoice.totalAmount}</p>
                <h3 className="text-xl font-semibold mt-6 mb-4 text-gray-800">Items:</h3>
                <table className="min-w-full bg-white border-[2px] border-gray-300 rounded-[10px] overflow-hidden">
                  <thead>
                    <tr className="bg-[#5A189A]">
                      <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left rounded-tl-[10px]">No.</th>
                      <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Description</th>
                      <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Quantity</th>
                      <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left">Price</th>
                      <th className="py-3 px-4 border-b-[2px] text-white border-gray-300 text-left rounded-tr-[10px]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item, itemIndex) => (
                      <tr key={itemIndex} className="hover:bg-gray-100">
                        <td className="py-3 px-4 border-b-[2px] border-gray-300 text-left">{itemIndex + 1}</td>
                        <td className="py-3 px-4 border-b-[2px] border-gray-300">{item.description}</td>
                        <td className="py-3 px-4 border-b-[2px] border-gray-300">{item.quantity}</td>
                        <td className="py-3 px-4 border-b-[2px] border-gray-300">${item.price}</td>
                        <td className="py-3 px-4 border-b-[2px] border-gray-300">${item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-center text-white">No data available</p>
          )}
      
      </div>
    );
}

export default InvoiceBox