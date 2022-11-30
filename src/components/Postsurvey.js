import React, { useState, useEffect } from 'react';
import './App.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { db } from './firebase';
import TextField from '@mui/material/TextField';

function Postsurvey(props) {

    const [cup, setCup] = useState("");
    const handlecup = (event) => {
        setCup(event.target.value)
    }
    const [coffee, setCoffee] = useState("");
    const handleCoffee = (event) => {
        setCoffee(event.target.value)
    }

    const [feedback1, setFeedback1] = useState("");
    const handleFeedback1 = (event) => {
        setFeedback1(event.target.value)
    }

    const [feedback2, setFeedback2] = useState("");
    const handleFeedback2 = (event) => {
        setFeedback2(event.target.value)
    }

    const [feedback3, setFeedback3] = useState("");
    const handleFeedback3 = (event) => {
        setFeedback3(event.target.value)
    }

    const btnstyle= {
        left: "40%",
        width: "25%",
        bottom: "10%",
        fontSize: "13pt",
        mt: "20px",
        mb: "20px"
    }

    const onSubmit = () => {
        db.ref('/' + props.mturk + '/postsurvey/').push({ amount: cup, coffee: coffee, feedback1: feedback1, feedback2: feedback2, feedback3: feedback3 })
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
                        Postsurvey
                    </div>
                
                    <div className="surveyQuestion">
                        1. After using the recommendation system, how do you think about coffee and its effect on our health?
                    </div>
                    <FormControl sx={{ mt:"15px", width:"100%", mb:"15px" }}>
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
                    <div className="surveyQuestion">
                        2. How much coffee would you drink everyday from now?
                    </div>
                    <FormControl sx={{ mt:"15px", width:"100%", mb:"15px" }}>
                        <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={cup}
                        onChange={handlecup}
                        >
                        <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="1 or less cup" labelPlacement="bottom" sx={{ width:"15%", textAlign: "center" }}/>
                        <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="2 cups" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="3" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="3 cups" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="4" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="4 cups or more" labelPlacement="bottom" sx={{ width:"15%", textAlign: "center" }}/>
                        </RadioGroup>
                    </FormControl>
                    <div className="surveyQuestion">
                        3. How was our new recommendation system in general? Did it provied enough information?
                    </div>
                    <TextField fullWidth 
                        id="fullWidth" 
                        placeholder="Please give any feedbacks for our new recommendation system"
                        value={feedback1}
                        onChange={handleFeedback1}
                    />
                    <div className="surveyQuestion">
                        4. How does our system compare to recommendation system in other news websites? Is it better or is it harder to understand?
                    </div>
                    <TextField fullWidth 
                        id="fullWidth" 
                        placeholder="Please give any feedbacks for our new recommendation system"
                        value={feedback2}
                        onChange={handleFeedback2}
                    />
                    <div className="surveyQuestion">
                        5. Please freely give us other comments! Thank you for your participation.
                    </div>
                    <TextField fullWidth 
                        id="fullWidth" 
                        placeholder="Please give any feedbacks for our new recommendation system"
                        value={feedback3}
                        onChange={handleFeedback3}
                    />
                    <Button variant="outlined" sx={btnstyle} onClick={onSubmit}>Submit</Button>
                    
                </div>
            </div>
            <br/>
            <br/>
        </div>
    )
}


export default Postsurvey;
