import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../containers/Home/home'
import PaymentType from '../../containers/PaymentType/paymentType'
import PaymentDetails from '../../containers/PaymentDetails/paymentDetails'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/select-payment" element={< PaymentType />} />
          <Route path="/payment-details" element={< PaymentDetails />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;