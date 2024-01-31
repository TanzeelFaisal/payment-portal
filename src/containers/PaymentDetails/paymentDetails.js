import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function PaymentDetails() {
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        studentRegNo: '',
        studentEmail: '',
        studentCNIC: '',
        password: '',
        confirmPassword: '',
        program: '',
        term: '',
        relation: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatchError(true);
            alert('Passwords do not match');
            return;
        }

        if (!formData.studentName || !formData.studentRegNo || !formData.studentEmail || !formData.studentCNIC || !formData.password || !formData.confirmPassword || !formData.program || !formData.term || !formData.relation) {
            alert('Please fill out all required fields.');
            console.log(formData)
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/submit-payment-details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit payment details');
            }
            setRedirect(true);
        } catch (error) {
            console.error('Error submitting payment details:', error.message);
            alert('Failed to submit payment details. Please try again.');
        }
    };

    if (redirect) {
        return <Navigate to='/' />;
    }

    return (
        <Layout>
            <div className="text-center container">
                <h1>Online Payment</h1>
            </div>
            <div className="container mt-5">
                <div className="row details-container">
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentName" name="studentName" placeholder='Student Name' onChange={(e) => handleInputChange(e)}/>
                        <label htmlFor="studentName">Student Name:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentRegNo" name="studentRegNo" placeholder='Student Registration No' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="studentRegNo">Student Registration No:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="email" className="form-control" id="studentEmail" name="studentEmail" placeholder='Student Email' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="studentEmail">Student Email:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="studentCNIC" name="studentCNIC" placeholder='Student CNIC' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="studentCNIC">Student CNIC:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="password" className={`form-control ${passwordMatchError && 'is-invalid'}`} id="password" name="password" placeholder='Password' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="password">Password:</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="password" className={`form-control ${passwordMatchError && 'is-invalid'}`} id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                    </div>
                    <div className='mb-3'>
                        <span className='input-group-text text-center'>Payment secured with STRIPE via Askari and Habib bank ltd.</span>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="program" name="program" placeholder='Program' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="program">Programs (Degree):</label>
                    </div>
                    <div className='col-lg-6 mb-3 form-floating'>
                        <input type="text" className="form-control" id="term" name="term" placeholder='Term' onChange={(e) => handleInputChange(e)} required/>
                        <label htmlFor="term">Term:</label>
                    </div>
                </div>
                <div className="text-center"><h4><label htmlFor="relation">Relation</label></h4></div>
                <select className="form-select" name="relation" id="relation" onChange={(e) => handleInputChange(e)} required>
                    <option value="">Select Relationship with Student</option>
                    <option value="self">Self</option>
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="mother">Mother</option>
                </select>
                <div className="d-flex justify-content-center">
                    <button className="btn w-50 btn-dark mt-3" type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        </Layout>
    );
}

export default PaymentDetails;