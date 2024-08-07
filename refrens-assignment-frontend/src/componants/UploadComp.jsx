import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useStore } from '../../FileDataStore'; // Ensure this path is correct

const UploadComp = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('No file selected');
    const [dragging, setDragging] = useState(false);

    const fileDataSet = useStore((store) => store.fileDataSet);
    const fileData = useStore((store) => store.fileData);
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await fetch('http://localhost:3000/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.type === "Valid") {
                        console.log("Valid");
                        fileDataSet(data.data); 
                        console.log(fileData);
                        alert('File Uploaded and Invoice is ready');
                        navigate("/dataObserver");

                    } else if (data.type === "Invalid") {
                        console.log("Invalid");
                        fileDataSet(data.data); 
                        console.log(fileData);
                        alert('File Uploaded Successfully but file has errors in it ');
                        navigate("/validation-errors");
                    }
                    console.log('File processed successfully:', data);
                    
                } else {
                    const errorText = await response.text();
                    console.error('Error response from server:', errorText);
                    alert('File upload failed: ' + errorText);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file: ' + error.message);
            }
        } else {
            alert('No file selected');
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
        }
    };

    return (
        <div 
            className={`h-72 w-72 rounded-lg shadow-lg flex flex-col items-center justify-between p-2.5 gap-1.5 ${dragging ? 'bg-purple-700' : 'bg-purple-600'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex-1 w-full border-2 border-dashed border-royalblue rounded-lg flex items-center justify-center flex-col">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-24">
                    <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="text-center text-white">Select or Drop your invoice</p>
            </div>
            <label htmlFor="file" className="bg-violet-700 w-full h-10 px-2 rounded-lg cursor-pointer flex items-center justify-end text-white border-none">
                <svg fill="#FFFFFF" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-5">
                    <path d="M15.331 6H8.5v20h15V14.154h-8.169z"></path>
                    <path d="M18.153 6h-.009v5.342H23.5v-.002z"></path>
                </svg>
                <p className="flex-1 text-center">{fileName}</p>
            </label>
            <input id="file" type="file" className="hidden" onChange={handleFileChange} />
            <button 
                onClick={handleFileUpload} 
                className="mt-2 bg-violet-700 text-white px-4 py-2 rounded-lg"
            >
                Upload
            </button>
        </div>
    );
};

export default UploadComp;
