import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';

function Instruction(props) {

    return (
        <div className="total">
            <div className="Navbar">
                <img src="/logo.png" alt="logo" className="Logo"/>
            </div>
            <div className="Body">
                <div className="instructionMain">
                    <div className='Title'>
                        Thank you for participating for our study!
                    </div>
                    <div className="instruction">
                        In this study, you will be first asked to read a health related article. Please read or skim through the article as you normally do.
                        <br/>
                        <br/>
                        After that, you will be asked to use our news recommendation system. Please thoroughly use our system (at least for 3~5 minutes) and answer to the survey.
                        <br/>
                        <br/>
                        There would be short surveys during the process, so please respond honestly!
                    </div>

                    <Button variant="outlined" sx={{ mt: "20px", mb:"20px", width: "200px", padding: "10px", height: "50px" }} onClick={props.handleNext}>Move to Next Stage</Button>
                </div>
                <br/>
            </div>
        </div>
    )
}


export default Instruction;
