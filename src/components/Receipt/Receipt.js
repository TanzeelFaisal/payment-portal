import html2pdf from 'html2pdf.js';
import './receipt.css'
import { useEffect } from 'react';

const Receipt = () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    const user = data.user

    const info = {
        name: user.studentName,
        dept: user.program, 
        sem: user.term, 
        regno: user.studentRegNo, 
        date: user.date,
        challan: user.challanNo, 
        amount: user.amount
    }

    const handleDownload = async () => {
        const pdfElement = document.getElementById('invoice-POS');

		if (!pdfElement) {
			console.error('PDF element not found.');
			return;
		}

		const options = {
			margin: 0,
			filename: 'payment-receipt.pdf',
			image: { type: 'jpeg', quality: 0.98 },
			html2canvas: { scale: 2 },
			jsPDF: { unit: 'mm',format:'a5', orientation: 'portrait' },
		};

		html2pdf().from(pdfElement).set(options).save();
    };


    return (
        <>
            <i onClick={handleDownload} className="fa-solid fa-download"></i>

            <div id="invoice-POS" className='py-3 px-2'>

                <center id="top">
                    <img class="logo" src="logo.jpg"></img>
                    <div class="info">
                        <h2>Quaid i Azam University Islamabad</h2>
                    </div>
                </center>
                <br></br>

                <div id='mid'>
                    <p><strong>Date: </strong><span>{info.date}</span></p>
                    <p><strong>Challan No: </strong><span>{info.challan}</span></p>
                </div>

                <div id="bot">

                    <div id="table">
                        <div>
                            <p>Name</p>
                            <p>{info.name}</p>
                        </div>
                        <div>
                            <p>Registration No</p>
                            <p>{info.regno}</p>
                        </div>
                        <div>
                            <p>Department</p>
                            <p>{info.dept}</p>
                        </div>
                        <div>
                            <p>Semester</p>
                            <p>{info.sem}</p>
                        </div>
                        <div class="tabletitle">
                                <h2 >Total</h2>
                                <h2>Rs. {info.amount}</h2>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <p className='end'>Thank you for your using the payment portal!</p>
                </div>
            </div>

        </>
    )
}

export default Receipt;