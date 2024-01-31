import React, { useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import Receipt from '../../components/Receipt/Receipt';

function PaymentSuccess() {
  useEffect(() => {
    savePaymentData();
  }, []);

  const savePaymentData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const date = new Date().toLocaleDateString()
      userData.user.date = date
      localStorage.setItem('userData', JSON.stringify(userData))

      const response = await fetch('http://localhost:3001/save-payment-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: userData.user.studentName,
          studentRegNo: userData.user.studentRegNo,
          studentEmail: userData.user.studentEmail,
          amount: userData.user.amount,
          paymentType: userData.user.paymentType,
          paidStatus: true,
          date: date,
        }),
      });
      if (response.ok) {
        console.log('Payment details saved successfully');
      } else {
        console.error('Failed to save payment data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving payment data:', error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <div className="alert alert-success" role="alert">
          Payment was successful!
        </div>
        <Receipt />
        <button className="btn btn-primary" onClick={() => window.location = '/select-payment'}>
          Back to Payment
        </button>
      </div>
    </Layout>
  );
}

export default PaymentSuccess;
