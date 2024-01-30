import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentType from '../../containers/PaymentType/paymentType'
import PaymentDetails from '../../containers/PaymentDetails/paymentDetails'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/select-payment" element={<PaymentType />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;