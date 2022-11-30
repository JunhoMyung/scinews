import React, { useState, useEffect } from 'react';
import './App.css';
import Main from './Main';
import Presurvey from './Presurvey'
import Postsurvey from './Postsurvey'
import Dismiss from './Dismiss'
import Article from './Article';
import Instruction from './Instruction';
import Middlesurvey from './Middlesurvey';

function App() {

    const [stage, setStage] = useState("instruction")
    const [mturk, setMturk] = useState("");
    const [init, setInit] = useState("")

    const handleChange = (event) => {
        setMturk(event.target.value);
    };

    const handleInstruction = () => {
        setStage("presurvey")
    };

    const handlePresurvey = () => {
        setStage("article")
    }

    const handleArticle = () => {
        setStage("middlesurvey")
    }

    const handleMiddlesurvey = () => {
        setStage("main")
    }

    const handleMain = () => {
        setStage("postsurvey")
    }
    const handlePostsurvey = () => {
        setStage("done")
    }

    const renderMain = () => {
        if (stage === "instruction"){
            return(
                <Instruction 
                    handleNext = {handleInstruction}
                />
            )
            
        }
        else if (stage === "presurvey"){
            return(
                <Presurvey
                    handleNext = {handlePresurvey}
                    mturk = {mturk}
                    handleMturk = {handleChange}
                    handleInit = {setInit}
                />
            )
        }
        else if (stage === "article"){
            return(
                <Article
                    handleNext = {handleArticle}
                    init = {init}
                />
            )
        }
        else if (stage === "middlesurvey"){
            return(
                <Middlesurvey
                    handleNext = {handleMiddlesurvey}
                    mturk = {mturk}
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
        // <>
        //     {renderMain()}
        // </>
        <Main
                    handleNext = {handleMain}
                    mturk = {mturk}
                />
    )
}


export default App;
