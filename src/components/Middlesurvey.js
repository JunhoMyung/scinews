import React, { useState } from 'react';
import './App.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { db } from './firebase';

function Middlesurvey(props) {
    const [change, setChange] = useState("");
    const handleChange = (event) => {
        setChange(event.target.value)
    }
    const [coffee, setCoffee] = useState("");
    const handleCoffee = (event) => {
        setCoffee(event.target.value)
    }

    const btnstyle= {
        ml: "22%",
        width: "50%",
        bottom: "10%",
        fontSize: "13pt",
        mt: "20px",
        mb: "20px"
    }

    const onSubmit = () => {
        db.ref('/' + props.mturk + '/middlesurvey/').push({ change: change, coffee: coffee })
        props.handleNext()
    }


    return (
        <div>
            <div className="Navbar">
                <img src="/logo.png" alt="logo" className="Logo"/>
            </div>
            <div className="Body">
                <div className="Main">
                    <div className='Title'>
                        Survey
                    </div>
                    <div className="surveyQuestion">
                        1. Did your initial thoughts on coffee changed?
                    </div>
                    <FormControl sx={{ width:"100%", mb:"25px" }}>
                        <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={change}
                        onChange={handleChange}
                        >
                        <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Yes" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="No" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        </RadioGroup>
                    </FormControl>
                    <div className="surveyQuestion">
                        2. If it has changed, what is your thoughts on coffee now? (You don't have to answer if you said "No" to the first question.)
                    </div>
                    <FormControl sx={{ width:"100%", mb:"25px" }}>
                        <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={coffee}
                        onChange={handleCoffee}
                        >
                        <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Very Unhealty" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Unhealthy" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="3" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Neutral" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="4" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Healthy" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="5" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Very Healthy" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        </RadioGroup>
                    </FormControl>
                    <Button variant="outlined" sx={btnstyle} onClick={onSubmit}>Click to Proceed to Our New Recommendation System</Button>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    )
}


export default Middlesurvey;
