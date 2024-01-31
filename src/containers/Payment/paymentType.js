import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';

function PaymentType() {
  const [amount, setAmount] = useState(0);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState(0);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handlePaymentTypeChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    setSelectedPaymentTypeId(Number(event.target.value));
    setSelectedPaymentType(event.target.options[selectedIndex].text);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const handleProceed = () => {
    let userData = JSON.parse(localStorage.getItem('userData'));
    userData.user.amount = amount;
    userData.user.paymentType = selectedPaymentType;
    localStorage.setItem('userData', JSON.stringify(userData));

    fetch('http://localhost:3001/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        id: selectedPaymentTypeId,
        paymentType: selectedPaymentType,
        userEmail: userEmail,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <Layout>
      <div className="text-center container mb-5">
        <h1>Online Payment</h1>
      </div>
      <div className="text-center container">
        <h4>
          <label htmlFor="paymentType">Payment Type</label>
        </h4>
        <select
          className="form-select"
          name="paymentType"
          id="paymentType"
          value={selectedPaymentTypeId}
          onChange={handlePaymentTypeChange}
        >
          <option value="0">Select Payment Type</option>
          <option value="1">Tuition Fee, Hostel Charges, and University Dues</option>
          <option value="2">Test Fee</option>
          <option value="3">Clearance Fee</option>
        </select>
        <div className="row details-container mt-3">
          <div className="col-lg-6 mb-3 form-floating">
            <input type="text" className="form-control" id="challanNo" placeholder="name" />
            <label htmlFor="challanNo">Challan No:</label>
          </div>
          <div className="col-lg-6 mb-3 form-floating">
            <input type="text" className="form-control" id="amount" placeholder="name" onChange={handleAmountChange} />
            <label htmlFor="amount">Amount:</label>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary btn-dark w-50" type="button" onClick={handleProceed}>
            Proceed
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default PaymentType;