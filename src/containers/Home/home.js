import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userData', JSON.stringify(data));
        navigate('/select-payment');
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <Layout>
      <div className="text-center container mb-5">
        <h1>Welcome to the Payment Portal</h1>
      </div>
      <div className="text-center container">
        <div className="row details-container mt-3">
          <div className='col-lg-12 mb-3'>
            <h4>Sign In</h4>
            <form>
              <div className='form-floating mb-3'>
                <input type="text" className="form-control" id="email" placeholder='Email' onChange={(e) => handleInputChange(e, setEmail)}/>
                <label htmlFor="Email">Email</label>
              </div>
              <div className='form-floating mb-3'>
                <input type="password" className="form-control" id="password" placeholder='Password' onChange={(e) => handleInputChange(e, setPassword)}/>
                <label htmlFor="password">Password</label>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div></div>
                <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row mt-3">
          <div className='col'>
            <p>Not registered yet? <Link to="/payment-details">Create an account here</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;