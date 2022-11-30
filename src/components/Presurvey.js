import React, { useState, useEffect } from 'react';
import './App.css';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { db } from './firebase';

function Presurvey(props) {
    const [cup, setCup] = useState("");
    const handlecup = (event) => {
        setCup(event.target.value)
    }
    const [coffee, setCoffee] = useState("");
    const handleCoffee = (event) => {
        setCoffee(event.target.value)
    }

    const [health, setHealth] = useState("");
    const handleHealth = (event) => {
        setHealth(event.target.value)
    }

    const btnstyle= {
        ml: "17%",
        width: "60%",
        bottom: "10%",
        fontSize: "13pt",
        mt: "20px",
        mb: "20px"
    }

    const onSubmit = () => {
        if (cup === "" || coffee === "" || health === ""){
            alert("Please fill in all the survey items")
        }
        else{
            db.ref('/' + props.mturk + '/presurvey/').push({ amount: cup, coffee: coffee, health: health })
            props.handleInit(coffee)
            props.handleNext()
        }
    }


    return (
        <div>
            <div className="Navbar">
                <img src="/logo.png" alt="logo" className="Logo"/>
            </div>
            <div className="Body">
                <div className="Main">
                    <div className='Title'>
                        Presurvey
                    </div>
                    <div className="surveyQuestion">
                        1. Enter your MTurk ID below
                    </div>
                    <TextField fullWidth 
                        label="MTurk ID" 
                        id="fullWidth" 
                        placeholder="Paste write your MTurk ID here"
                        value={props.mturk}
                        onChange={props.handleMturk}
                    />
                    <div className="surveyQuestion">
                        2. How much coffee do you drink a day?
                    </div>
                    <FormControl sx={{ width:"100%", mb:"25px" }}>
                        <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={cup}
                        onChange={handlecup}
                        >
                        <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="1 cup or less" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="2 cups" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="3" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="3 cups" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="4" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="4 cups or more" labelPlacement="bottom" sx={{ width:"15%", textAlign:"center" }}/>
                        </RadioGroup>
                    </FormControl>
                    <div className="surveyQuestion">
                        3. Do you think coffee is good for your health? 
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
                    <div className="surveyQuestion">
                        4. How often do you read health related news?
                    </div>
                    <FormControl sx={{ width:"100%", mb:"25px" }}>
                        <RadioGroup
                        aria-labelledby="radio-buttons-group-label"
                        name="radio-buttons-group"
                        row
                        value={health}
                        onChange={handleHealth}
                        >
                        <FormControlLabel value="1" control={<Radio/>} label="Almost Never" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="2" control={<Radio/>} label="Once a Week" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="3" control={<Radio/>} label="Once a day" labelPlacement="bottom" sx={{ width:"15%" }}/>
                        <FormControlLabel value="4" control={<Radio/>} label="More than Twice a Day" labelPlacement="bottom" sx={{ width:"15%", textAlign:"center" }}/>
                        </RadioGroup>
                    </FormControl>
                    <Button variant="outlined" sx={btnstyle} onClick={onSubmit}>Click to Proceed and Read an Article</Button>
                </div>
                <br/>
                <br/>
            </div>
        </div>
    )
}


export default Presurvey;
