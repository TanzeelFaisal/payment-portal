import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './paymentDetails.css'
import Layout from '../Layout/Layout'

function PaymentDetails() {
    const [selectedRelation, setSelectedRelation] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleRelationChange = (event) => {
        setSelectedRelation(event.target.value)
    };

    const handleSubmit = () => {
        setRedirect(true)
    };

    return (
        <Layout>
            <div className="text-center container">
                <h1>Online Payment</h1>
            </div>
            <div className="container mt-5">
                <div className="row details-container">
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentName" placeholder='name'/>
                        <label for="studentName">Student Name:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentRegNo" placeholder='name'/>
                        <label for="studentRegNo">Student Registration No:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentEmail" placeholder='name'/>
                        <label for="studentEmail">Student Email:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentCNIC" placeholder='name'/>
                        <label for="studentCNIC">Student CNIC:</label>
                    </div>
                    <div className='mb-3'>
                        <span className='input-group-text text-center'>Payment secured with STRIPE via Askari and Habib bank ltd.</span>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="program" placeholder='name'/>
                        <label for="program">Programs (Degree):</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="term" placeholder='name'/>
                        <label for="term">Term:</label>
                    </div>
                </div>
                <div className="text-center mt-3"><h4><label htmlFor="relation">Relation</label></h4></div>
                <select className="form-select" name="relation" id="relation" value={selectedRelation} onChange={handleRelationChange}>
                    <option value="">Select Relationship with Student</option>
                    <option value="self">Self</option>
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="mother">Mother</option>
                </select>
                <div className='d-flex justify-content-center'>
                    <button class="btn w-50 btn-dark" type="button" onClick={handleSubmit}>Submit</button>
                </div>
                { redirect && < Navigate to='/'/> }
            </div>
        </Layout>
    );
}

export default PaymentDetails;