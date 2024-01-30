import React, { useState } from 'react';
import { Navigate } from 'react-router';
import Layout from '../Layout/Layout'

function PaymentType() {
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handlePaymentTypeChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedPaymentTypeId(Number(event.target.value));
    setSelectedPaymentType(event.target.options[selectedIndex].text);
  };

  const handleSubmit = () => {
    if (selectedPaymentTypeId === 0) {
      alert('Please select a Payment Type first')
    }
    else {setRedirect(true)}
  };

  return (
    <Layout>
      <div class="text-center container mb-5">
        <h1>Online Payment</h1>
      </div>
      <div class="text-center container">
        <h4><label htmlFor="paymentType">Payment Type</label></h4>
        <select class="form-select" name="paymentType" id="paymentType" value={selectedPaymentTypeId} onChange={handlePaymentTypeChange}>
          <option value="0">Select Payment Type</option>
          <option value="1">Tuition Fee, Hostel Charges, and University Dues</option>
          <option value="2">Test Fee</option>
          <option value="3">Clearance Fee</option>
        </select>
        <div className='d-flex justify-content-center'>
          <button class="btn w-50 btn-dark" type="button" onClick={handleSubmit}>Submit</button>
        </div>
        {redirect && < Navigate to='/payment-details' state={{id: selectedPaymentTypeId, text: selectedPaymentType}} />}
      </div>
    </Layout>
  );
}

export default PaymentType;