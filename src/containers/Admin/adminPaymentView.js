import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';

function AdminPaymentView() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/payments');
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments);
      } else {
        console.error('Failed to fetch payments:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1 className="mb-4">Admin Payment View</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Student Name</th>
              <th scope="col">Registration No</th>
              <th scope="col">Email</th>
              <th scope="col">Amount</th>
              <th scope="col">Payment Type</th>
              <th scope="col">Payment Status</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th scope="row">{index + 1}</th>
                <td>{payment.studentName}</td>
                <td>{payment.studentRegNo}</td>
                <td>{payment.studentEmail}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentType}</td>
                <td>
                    {payment.paidStatus ? (
                        <span className="text-success">Paid</span>
                    ) : (
                        <span className="text-secondary">Pending</span>
                    )}
                </td>
                <td>{new Date(payment.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminPaymentView;