import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import HomePage from './Pages/HomePage'
import InvoicePage from "./Pages/InvoicePage";
import InvoiceErrorPage from "./Pages/InvoiceErrorPage";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dataObserver" element={<InvoicePage />} />
      <Route path="/validation-errors" element={<InvoiceErrorPage />} />
    </Routes>
  </Router>
  )
}

export default App
