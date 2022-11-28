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

    const [feedback, setFeedback] = useState("");
    const handleFeedback = (event) => {
        setFeedback(event.target.value)
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
        db.ref('/' + props.mturk + '/postsurvey/').push({ amount: cup, coffee: coffee, feedback: feedback })
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
                        1. After reading the article, how do you think about coffee and its effect on our health?
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
                        <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="1 or less cup a day" labelPlacement="bottom" sx={{ width:"20%" }}/>
                        <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="2 cups" labelPlacement="bottom" sx={{ width:"20%" }}/>
                        <FormControlLabel value="3" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="3 cups" labelPlacement="bottom" sx={{ width:"20%" }}/>
                        <FormControlLabel value="4" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="4 cups or more" labelPlacement="bottom" sx={{ width:"20%" }}/>
                        </RadioGroup>
                    </FormControl>
                    <div className="surveyQuestion">
                        3. Please give any feedbacks four our new recommendation system!
                    </div>
                    <TextField fullWidth 
                        id="fullWidth" 
                        placeholder="Paste any feedbacks for our new recommendation system"
                        value={feedback}
                        onChange={handleFeedback}
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
