import React, { useState } from 'react';
import { Navigate } from 'react-router';
import './paymentType.css'
import Layout from '../Layout/Layout'

function PaymentType() {
  const [selectedPaymentType, setSelectedPaymentType] = useState('');

  const handlePaymentTypeChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };

  const handleSubmit = () => {
    // Add your payment processing logic here based on selectedPaymentType
    console.log('Processing payment with type:', selectedPaymentType);
  };

  return (
    <Layout>
      <div class="text-center container mb-5">
        <h1>Online Payment</h1>
      </div>
      <div class="payment-options container text-center">
        <h4><label htmlFor="paymentType">Payment Type</label></h4>
        <select class="form-select" name="paymentType" id="paymentType" value={selectedPaymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select Payment Type</option>
          <option value="fee">Tuition Fee, Hostel Charges, and University Dues</option>
          <option value="testFee">Test Fee</option>
          <option value="clearanceFee">Clearance Fee</option>
        </select>
        <div className='d-flex justify-content-center'>
          <button class="btn w-50 btn-dark" type="button" onClick={< Navigate to='/payment-details' />}>Submit</button>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentType;