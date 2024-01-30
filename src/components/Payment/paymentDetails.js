import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './paymentDetails.css'
import Layout from '../Layout/Layout'

function PaymentDetails() {
    const [selectedRelation, setSelectedRelation] = useState('');
    const [Amount, setAmount] = useState(0);
    const location = useLocation();
    const { id, text } = location.state;

    const handleRelationChange = (event) => {
        setSelectedRelation(event.target.value)
    };

    const handleAmountChange = (event) => {
        setAmount(Number(event.target.value))
    };

    const handleBack = () => {};

    const handleProceed = () => {
        fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: Amount,
                id: id,
                paymentType: text,
            })
        }).then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        }).then(({ url }) => {
            // console.log(Amount, text)
            window.location = url
        }).catch(e => {
            console.error(e.error)
        })
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
                        <input type="text" class="form-control" id="amount" placeholder='name' onChange={handleAmountChange}/>
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
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-secondary me-2" type="button" onClick={handleBack}>
                        Back
                    </button>
                    <button className="btn btn-primary" type="button" onClick={handleProceed}>
                        Proceed
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentDetails;