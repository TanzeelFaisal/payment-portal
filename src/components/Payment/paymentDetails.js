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

            <div class="text-center container">
                <h1>Online Payment</h1>
            </div>
            <div class="container mt-5">
                <div class="row details-container">
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="studentName" placeholder='name'/>
                        <label for="studentName">Student Name:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="studentRegNo" placeholder='name'/>
                        <label for="studentRegNo" required="true">Student Registration No:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="studentEmail" placeholder='name'/>
                        <label for="studentEmail">Student Email:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="studentCNIC" placeholder='name'/>
                        <label for="studentCNIC">Student CNIC:</label>
                    </div>
                    <div className='mb-3'>
                        <span className='input-group-text text-center'>Payment secured with STRIPE via Askari and Habib bank ltd.</span>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="program" placeholder='name'/>
                        <label for="program">Programs (Degree):</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="term" placeholder='name'/>
                        <label for="term">Term:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="challanNo" placeholder='name'/>
                        <label for="challanNo">Challan No:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" class="form-control" id="amount" placeholder='name'/>
                        <label for="amount">Amount:</label>
                    </div>
                </div>
                <div class="text-center mt-3"><h4><label htmlFor="relation">Relation</label></h4></div>
                <select class="form-select" name="relation" id="relation" value={selectedRelation} onChange={handleRelationChange}>
                    <option value="">Select Relationship with Student</option>
                    <option value="self">Self</option>
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="mother">Mother</option>
                </select>
                <div className='d-flex justify-content-center'>
                    <button class="btn w-50 btn-dark" type="button" onClick={< Navigate to='/' />}>Submit</button>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentDetails;