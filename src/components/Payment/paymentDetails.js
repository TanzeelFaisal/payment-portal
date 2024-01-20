import React, { useState } from 'react';
import { Navigate } from 'react-router';
import './paymentDetails.css'
import Layout from '../Layout/Layout'

function PaymentDetails() {
  const [selectedRelation, setSelectedRelation] = useState('');

  const handleRelationChange = (event) => {
    setSelectedRelation(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Processing relation with type:', selectedRelation);
  };

  return (
    <Layout>
        <div class="payment-header container h-0 w-75">
            <h1>Online Payment</h1>
        </div>
        <div class="container">
            <div class="row col-lg-5">
                <p><label htmlFor="studentName">Student Name:</label></p>
                <input type="text" class="form-control" id="studentName"/>
                <p><label htmlFor="studentRegNo" required="true">Student Registration No:</label></p>
                <input type="text" class="form-control" id="studentRegNo"/>
            </div>
            <div class="row col-lg-5">
                <p><label htmlFor="studentEmail">Student Email:</label></p>
                <input type="text" class="form-control" id="studentEmail"/>
                <p><label htmlFor="studentCNIC">Student CNIC:</label></p>
                <input type="text" class="form-control" id="studentCNIC"/>
            </div>
            <div class="row col-lg-5">
                <p><label htmlFor="program">Programs (Degree):</label></p>
                <input type="text" class="form-control" id="program"/>
                <p><label htmlFor="term">Term:</label></p>
                <input type="text" class="form-control" id="term"/>
            </div>
            <div class="row col-lg-5">
                <p><label htmlFor="challanNo">Challan No:</label></p>
                <input type="text" class="form-control" id="challanNo"/>
                <p><label htmlFor="amount">Amount:</label></p>
                <input type="text" class="form-control" id="amount"/>
            </div>
            <div class="text-center"><h4><label htmlFor="relation">Relation</label></h4></div>
            <form>
                <select class="form-select" name="relation" id="relation" value={selectedRelation} onChange={handleRelationChange}>
                    <option value="">Select Relationship with Student</option>
                    <option value="self">Self</option>
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="mother">Mother</option>
                </select>
            </form>
            <button class="btn btn-dark" type="button" onClick={< Navigate to='/' />}>Submit</button>
        </div>
    </Layout>
  );
}

export default PaymentDetails;