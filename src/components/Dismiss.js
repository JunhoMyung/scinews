import React from 'react';
import './App.css';

function Dismiss(props) {
    return (
        <div className="total">
            <div className="Navbar">
                <img src="/logo.png" alt="logo" className="Logo"/>
            </div>
            <div className="Body">
                <div className="DismissMain">
                    <div className='Title'>
                        Thank you for your participation!
                    </div>
                    <div className="surveycode">
                        Please enter "COFF33" as your completion code in MTurk. Have a nice day!
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Dismiss;
