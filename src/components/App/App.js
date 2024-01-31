import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../containers/Home/home'
import Approve from '../../containers/Admin/adminApproval'
import ViewPayments from '../../containers/Admin/adminPaymentView'
import PaymentType from '../../containers/Payment/paymentType'
import PaymentDetails from '../../containers/Payment/paymentDetails'
import PaymentSuccess from '../../containers/Payment/paymentSuccess'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/admin-approval" element={< Approve />} />
          <Route path="/admin-payments-view" element={< ViewPayments />} />
          <Route path="/select-payment" element={< PaymentType />} />
          <Route path="/payment-details" element={< PaymentDetails />} />
          <Route path="/payment-success" element={< PaymentSuccess />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;