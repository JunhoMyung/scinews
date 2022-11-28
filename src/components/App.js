import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './Main';
import Presurvey from './Presurvey'
import Postsurvey from './Postsurvey'
import Dismiss from './Dismiss'

function App() {

    const [stage, setStage] = useState("presurvey")
    const [mturk, setMturk] = useState("");
    const handleChange = (event) => {
        setMturk(event.target.value);
    };

    const handlePresurvey = () => {
        setStage("main")
    }

    const handleMain = () => {
        setStage("postsurvey")
    }
    const handlePostsurvey = () => {
        setStage("done")
    }

    const renderMain = () => {
        if (stage === "presurvey"){
            return(
                <Presurvey
                    handleNext = {handlePresurvey}
                    mturk = {mturk}
                    handleMturk = {handleChange}
                />
            )
        }
        else if (stage === "main"){
            return(
                <Main
                    handleNext = {handleMain}
                    mturk = {mturk}
                />
            )
        }
        else if (stage === "postsurvey"){
            return(
                <Postsurvey
                    handleNext = {handlePostsurvey}
                    mturk = {mturk}
                />
            )
        }
        else {
            return(
                <Dismiss />
            )
        }
    }

    return (
        <>
            {renderMain()}
        </>
    )
}


export default App;
