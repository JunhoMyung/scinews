import './App.css';
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { VictoryTooltip, VictoryScatter, VictoryVoronoiContainer, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie } from 'victory';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import { io } from "socket.io-client";
import { Oval } from 'react-loader-spinner'
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloseIcon from '@mui/icons-material/Close';

function Main(props) {

  const [article, setArticle] = useState({title:'', author:'', publish_date:'', image:'', text:''})
  const [load, setLoad] = useState(false)
  const [myData, setmyData] = useState([])
  const [recommend, setRecommend] = useState("link")
  const [newarticle, setNewarticle] = useState({})
  const [effect, setEffect] = useState({})
  const [genderselect, setgenderselect] = useState('general');
  const [filter, setFilter] = useState('age');
  const [pie, setPie] = useState([{x: "Positive", y: 13}, {x: "Negative", y: 8}, , {x: "Neutral", y: 20}])
  const [tutorial, setTutorial] = useState(false)
  const openTutorial = () => setTutorial(true);
  const handleTutorial = () => {
    setTutorial(false)
  }

  const handlefilter = (event) => {
    setFilter(event.target.value)
    var newdata = [...myData]
    var positive = 0
    var negative = 0
    var neutral = 0
    for (let i = 0; i < newdata.length; i++){
      newdata[i]["stroke"] = "white";
      if (newdata[i]["data"]["sentiment"] > 3){
        positive ++
      }
      else if (newdata[i]["data"]["sentiment"] === "3"){
        neutral ++
      }
      else {
        negative ++
      }
    }
    setmyData(newdata)
    setPie([{x: "Positive", y: positive}, {x: "Negative", y: negative}, , {x: "Neutral", y: neutral}])
    setSlider(10)
    setgenderselect("general")
  }

  const handlegenderselect = (event, newAlignment) => {
    setgenderselect(newAlignment);
    var newdata = [...myData]
    var positive = 0
    var negative = 0
    var neutral = 0

    if (newAlignment === null || newAlignment === "general"){
      for (let i = 0; i < newdata.length; i++){
        newdata[i]["stroke"] = "white";
        if (newdata[i]["data"]["sentiment"] > 3){
          positive ++
        }
        else if (newdata[i]["data"]["sentiment"] === "3"){
          neutral ++
        }
        else {
          negative ++
        }
      }
    }
    else {
      for (let i = 0; i < newdata.length; i++){
        if (newdata[i]["data"]["gender"] === newAlignment || newdata[i]["data"]["gender"] === "none"){
          newdata[i]["stroke"] = "#FFF192";
          if (newdata[i]["data"]["sentiment"] > 3){
            positive ++
          }
          else if (newdata[i]["data"]["sentiment"] === "3"){
            neutral ++
          }
          else {
            negative ++
          }
        }
        else {
          newdata[i]["stroke"] = "white";
        }
      }
    }
    setmyData(newdata)
    setPie([{x: "Positive", y: positive}, {x: "Negative", y: negative}, , {x: "Neutral", y: neutral}])
  };

  const [open, setOpen] = useState(false);
  const [slider, setSlider] = useState(10);
  const handleSlider = (event) => {
    setSlider(event.target.value);
    var newdata = [...myData]
    var positive = 0
    var negative = 0
    var neutral = 0

    var target = "senior"
    if (event.target.value === 10){
      target = "general"
    }
    else if (event.target.value === 20){
      target = "child"
    }
    else if (event.target.value === 30){
      target = "adult"
    }

    if (target === "general"){
      for (let i = 0; i < newdata.length; i++){
        newdata[i]["stroke"] = "white";
        if (newdata[i]["data"]["sentiment"] > 3){
          positive ++
        }
        else if (newdata[i]["data"]["sentiment"] === "3"){
          neutral ++
        }
        else {
          negative ++
        }
      }
    }
    else if (target === "adult"){
      for (let i = 0; i < newdata.length; i++){
        if (newdata[i]["data"]["age"] === target || newdata[i]["data"]["age"] === "none"){
          newdata[i]["stroke"] = "#FFF192";
          if (newdata[i]["data"]["sentiment"] > 3){
            positive ++
          }
          else if (newdata[i]["data"]["sentiment"] === "3"){
            neutral ++
          }
          else {
            negative ++
          }
        }
        else {
          newdata[i]["stroke"] = "white";
        }
      }
    }
    else {
      for (let i = 0; i < newdata.length; i++){
        if (newdata[i]["data"]["age"] === target){
          newdata[i]["stroke"] = "#FFF192";
          if (newdata[i]["data"]["sentiment"] > 3){
            positive ++
          }
          else if (newdata[i]["data"]["sentiment"] === "3"){
            neutral ++
          }
          else {
            negative ++
          }
        }
        else {
          newdata[i]["stroke"] = "white";
        }
      }
    }
    console.log(positive, negative, neutral)
    setPie([{x: "Positive", y: positive}, {x: "Negative", y: negative}, , {x: "Neutral", y: neutral}])
    setmyData(newdata)
  };

  const [view, setView] = useState(false);
  const openView = () => setView(true);
  const handleCloseView = () => {
    setView(false)
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (recommend === "error"){
      setRecommend("link")
    }
    setOpen(false)
  }

  const [link, setLink] = useState("");
  const handleChange = (event) => {
    setLink(event.target.value);
  };

  const [likert, setLikert] = useState("0");

  const handleLikert = (event) => {
    setLikert(event.target.value);
  };

  const [age, setAge] = useState("child");

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const [gender, setGender] = useState("male");

  const handleGender = (event) => {
    setGender(event.target.value);
  };


  // const socket = io.connect('http://127.0.0.1:8080')

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: '#000',
        contrastText: '#57595D',
      },
    },
  });

  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '25%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '40%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style3 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '85%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style4 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '85%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const style5 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '60%',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const btnstyle= {
    position: "absolute",
    left: "40%",
    width: "20%",
    bottom: "10%"
  }

  const accordianstyle = {
    width: "93.5%",
    border: "1px solid gray",
    boxShadow: 0,
    mb: "5px"
  }


  const marks = [
    {
      value: 10,
      label: 'General',
    },
    {
      value: 20,
      label: 'Child',
    },
    {
      value: 30,
      label: 'Adult',
    },
    {
      value: 40,
      label: 'Senior',
    },
  ];

  useEffect(()=>{
    // socket.on("article", (text) => {
    //   try{
    //     console.log(text)
    //     let userObj = JSON.parse(text);
    //     setNewarticle(userObj)
    //     setRecommend("edit")
    //     getLikertDefault(userObj)
    //     getEffects(userObj)
    //   } 
    //   catch (error) {
    //     setRecommend("error")
    //   }
    // })

    if (!load){
      getGraph()
      setLoad(true)
    }
  // },[socket])
  },[])

  const getGraph = () => {
    var temp = []
    var positive = 0
    var negative = 0
    var neutral = 0
    db.ref('/Coffee/').get().then((snapshot) => {
      const json = snapshot.val()
      for (const i of Object.keys(json)){
        const data = json[i]
        const dose = data["dosage"]
        var x = 0
        if (dose.length > 3){
          x = Math.random()
        }
        else if (dose.length === 3){
          const low = parseInt(dose[0])
          const high = parseInt(dose[2])
          x = Math.random() + Math.floor((low + high) / 2)
        }
        else {
          x = parseInt(dose[0]) + Math.random()
        }

        const y = Math.floor(Math.random() * (-40) - 10) 

        var color = "#6a6a6a"
        if (data["sentiment"] === "1"){
          color = "#CE5757"
        }
        else if (data["sentiment"] === "2"){
          color = "#E0A5A6"
        }
        else if (data["sentiment"] === "3"){
          color = "#B4B4B4"
        }
        else if (data["sentiment"] === "4"){
          color = "#A8D0F0"
        }
        else {
          color = "#5DADEC"
        }
        temp.push({ x: x, y: y, fill: color, data: data, stroke: "white"})

        if (data["sentiment"] > 3){
          positive ++
        }
        else if (data["sentiment"] === "3"){
          neutral ++
        }
        else {
          negative ++
        }
      }
      setmyData(temp)
      setPie([{x: "Positive", y: positive}, {x: "Negative", y: negative}, {x: "Neutral", y: neutral}])
    })
  }

  const getEffects = (obj) => {
    const effect_list = obj["qa"]["effects"]
    const result = {}
    var count = effect_list.length;

    for(var i = 0; i < count; i++) {
      const rand_key = (Math.random() + 1).toString(36).substring(7)
      result[rand_key] = effect_list[i]
    }
    setEffect(result)
  }

  // const onlink = () => {
  //   socket.emit('request', link)
  //   setRecommend("loading")
  // }
  
  const setNewTitle = (e) => {
    var temp = {...newarticle}
    temp["article"]["title"] = e.target.value
    setNewarticle(temp)
  }

  const setNewAuthors = (e) => {
    var temp = {...newarticle}
    temp["article"]["authors"] = e.target.value
    setNewarticle(temp)
  }

  const setNewPublishDate = (e) => {
    var temp = {...newarticle}
    temp["article"]["publish_date"] = e.target.value
    setNewarticle(temp)
  }

  const setNewText = (e) => {
    var temp = {...newarticle}
    temp["article"]["text"] = e.target.value
    setNewarticle(temp)
  }

  const setNewDosage = (e) => {
    var temp = {...newarticle}
    temp["qa"]["dosage"] = e.target.value
    setNewarticle(temp)
  }

  const getLikertDefault = (obj) => {
    const senti = obj["sentiment"]
    if (senti["label"] === "POSITIVE"){
      if (senti["score"] > 0.8){
        setLikert("5")
      }
      else{
        setLikert("4")
      }
    }
    else if (senti["label"] === "NEGATIVE"){
      if (senti["score"] > 0.8){
        setLikert("1")
      }
      else{
        setLikert("2")
      }
    }
    else {
      setLikert("3")
    }

    const gender = obj["classify"]["gender"]
    const age = obj["classify"]["age"]
    setGender(gender)
    setAge(age)
  }

  const handleEffect = (v, e) => {
    var temp = {...effect}
    temp[v] = e.target.value
    setEffect(temp)
  }
  
  const removeEffect = (v) => {
    var temp = {...effect}
    delete temp[v]
    setEffect(temp)
  }

  const addEffect = () => {
    var temp = {...effect}
    temp[(Math.random() + 1).toString(36).substring(7)] = ""
    setEffect(temp)
  }

  const renderEffect = Object.keys(effect).map((v) => { 
    return (
      <>
        <ListItem secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => removeEffect(v)}>
            <DeleteIcon/>
          </IconButton>
        }>
          <input
            className="effectInput"
            value={effect[v]}
            onChange={(e) => handleEffect(v, e)}
          />
        </ListItem>
        <Divider variant="middle" component="li" />
      </>
    )
  })

  const VictoryCustomTooltip = (props) => {
    const { datum, x, y } = props;
    var new_x = x + 10;
    var new_y = y;
  
    if (x > 200){
      new_x = x - 200;
    }
    if (x > 220){
      new_x = x - 210;
    }
    if (x > 230){
      new_x = x - 210;
    }
    if (y > 50){
      new_y = y - 50;
    }
    if (y > 100){
      new_y = y - 100;
    }
    if (y > 150){
      new_y = y - 130;
    }
    if (y > 200){
      new_y = y - 180;
    }
    if (y > 20 && y < 100){
      new_y = y - 20;
    }

    const hovertarget = () => {
      if (datum["data"]["age"] !== "none" && datum["data"]["gender"] !== "none"){
        return (
          <>
            Target age: <b>{datum["data"]["age"].charAt(0).toUpperCase() + datum["data"]["age"].slice(1)}</b>
            <br/>
            Target gender: <b>{datum["data"]["gender"].charAt(0).toUpperCase() + datum["data"]["gender"].slice(1)}</b>
          </>
        )
      }
      else if (datum["data"]["age"] !== "none"){
        return (
          <>
            Target age: <b>{datum["data"]["age"].charAt(0).toUpperCase() + datum["data"]["age"].slice(1)}</b>
          </>
        )
      }
      else if (datum["data"]["gender"] !== "none"){
        return (
          <>
            Target gender: <b>{datum["data"]["gender"].charAt(0).toUpperCase() + datum["data"]["gender"].slice(1)}</b>
          </>
        )
      }
      else{
        return(<></>)
      }
    }

    const getDosage = () => {
      if (datum["data"]["dosage"].length === 1){
        return(
          <>
            {datum["data"]["dosage"]} cup a day
          </>
        )
      }
      else if (datum["data"]["dosage"].length === 3){
        return(
          <>
            {datum["data"]["dosage"][0]} ~ {datum["data"]["dosage"][2]} cups a day
          </>
        )
      }
      else {
        return(
          <>
            {datum["data"]["dosage"]}
          </>
        )
      }
    }
  
    return (
      <g style={{ pointerEvents: "none" }}>
        <foreignObject
          x={new_x}
          y={new_y}
          width="100"
          height="100"
          style={{ overflow: "visible" }}
        >
          <div className="hoverlabel">
            <div className="hovertitle">
              {datum["data"]["article"]["title"]}
            </div>
            <img src={datum["data"]["article"]["image"]} className="hoverimage"/>
            <div className="hovertarget">
              {hovertarget()}
            </div>
            <div className="hoverdosage">
              Dosage: <b>{getDosage()}</b>
            </div>
            <div className="hovereffect">
              Effect:
              <ul className="hovereffectlist">
                {Object.keys(datum["data"]["effects"]).map((id) => (
                  <li key={id}>
                    {datum["data"]["effects"][id].charAt(0).toUpperCase() + datum["data"]["effects"][id].slice(1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </foreignObject>
      </g>
    );
  };
  
  const onSubmit = () => {
    const result = {"article": newarticle["article"], "effects": effect, "age": age, "gender": gender, "sentiment": likert, "dosage": newarticle["qa"]["dosage"]}
    db.ref('/Coffee/').push(result)

    setRecommend("link")
    setNewarticle({})
    setEffect({})
    setOpen(false)
    setLink("")
    setLikert("0")
    setAge("child")
    setGender("male")
  }

  // const renderModal = () => {
  //   if (recommend === "link"){
  //     return(
  //       <Box sx={style1}>
  //         <div className="modalTitle">
  //           Please recommend a health news related to "Coffee"
  //         </div>
  //         <TextField fullWidth 
  //           label="Link" 
  //           id="fullWidth" 
  //           placeholder="Paste the link of the news here."
  //           value={link}
  //           onChange={handleChange}
  //         />
  //         <Button variant="outlined" sx={btnstyle} onClick={onlink}>Submit</Button>
  //       </Box>
  //     )
  //   }
  //   else if (recommend === "loading"){
  //     return(
  //       <Box sx={style2}>
  //         <Oval
  //           width="28%"
  //           height="28%"
  //           color="#3944BC"
  //           strokeWidth={3}
  //           secondaryColor='#0492C2'
  //           ariaLabel="grid-loading"
  //           wrapperClass="load"
  //           visible={true}
  //         />
  //         <div className="loadlabel">
  //           Processing...
  //         </div>
  //       </Box>
  //     )
  //   }
  //   else if (recommend === "edit") {
  //     return(
  //       <Box sx={style3}>
  //         <Grid container spacing={0} sx={{height: "100%"}}>
  //           <Grid item xs={5}>
  //             <div className="gridLeft">
  //               <div className="gridTitle">
  //                 Please Help Correcting the Details!
  //               </div>
  //               <Accordion sx = {accordianstyle}>
  //                 <AccordionSummary
  //                   expandIcon={<ExpandMoreIcon />}
  //                   aria-controls="panel1a-content"
  //                   id="panel1a-header"
  //                   sx = {{ fontSize: "13pt", bgcolor: "#f4f4f5" }}
  //                 >
  //                   Change Article Info
  //                 </AccordionSummary>
  //                 <AccordionDetails sx = {{ borderTop: "1px solid gray" }}>
  //                   <div className="gridSubtitle">
  //                     Title:
  //                   </div>
  //                   <input
  //                     className="gridInputText"
  //                     value={newarticle["article"]["title"]}
  //                     onChange={setNewTitle}
  //                   />
  //                   <div className="gridSubtitle">
  //                     Author:
  //                   </div>
  //                   <input
  //                     className="gridInputText"
  //                     value={newarticle["article"]["authors"]}
  //                     onChange={setNewAuthors}
  //                   />
  //                   <div className="gridSubtitle">
  //                     Publish Date:
  //                   </div>
  //                   <input
  //                     className="gridInputText"
  //                     value={newarticle["article"]["publish_date"]}
  //                     onChange={setNewPublishDate}
  //                   />
  //                   <div className="gridSubtitle">
  //                     Text:
  //                   </div>
  //                   <textarea 
  //                     className="gridTextField"
  //                     value={newarticle["article"]["text"]}
  //                     onChange={setNewText}
  //                   />
  //                 </AccordionDetails>
  //               </Accordion>
  //               <Accordion sx = {accordianstyle}>
  //                 <AccordionSummary
  //                     expandIcon={<ExpandMoreIcon />}
  //                     aria-controls="panel1a-content"
  //                     id="panel1a-header"
  //                     sx = {{ fontSize: "13pt", bgcolor: "#f4f4f5" }}
  //                   >
  //                     Add Article Detail
  //                   </AccordionSummary>
  //                   <AccordionDetails sx = {{ borderTop: "1px solid gray" }}>
  //                     <div className="description">
  //                       Note: The data below are from AI suggestion, which may not be accurate. Please make modifications to better fit the article.
  //                     </div>
  //                     <div className="gridSubtitle">
  //                       Sentiment:
  //                     </div>
  //                     <div>
  //                       <FormControl sx={{ mt:"15px", width:"100%", mb:"15px" }}>
  //                         <RadioGroup
  //                           aria-labelledby="radio-buttons-group-label"
  //                           name="radio-buttons-group"
  //                           row
  //                           value={likert}
  //                           onChange={handleLikert}
  //                         >
  //                           <FormControlLabel value="1" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Negative" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="2" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="3" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Neutral" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="4" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="5" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Positive" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                         </RadioGroup>
  //                       </FormControl>
  //                     </div>
  //                     <div className="gridSubtitle">
  //                       Target Age Group:
  //                     </div>
  //                     <FormControl sx={{ mt:"15px", width:"100%", mb:"15px" }}>
  //                       <RadioGroup
  //                         aria-labelledby="radio-buttons-group-label"
  //                         name="radio-buttons-group"
  //                         row
  //                         value={age}
  //                         onChange={handleAge}
  //                       >
  //                         <FormControlLabel value="child" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Child" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                         <FormControlLabel value="adult" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Adult" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                         <FormControlLabel value="senior" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Senior" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                         <FormControlLabel value="none" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="None" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                       </RadioGroup>
  //                     </FormControl>

  //                     <div className="gridSubtitle">
  //                       Target Gender:
  //                     </div>
  //                     <FormControl sx={{ mt:"15px", width:"100%", mb:"15px" }}>
  //                         <RadioGroup
  //                           aria-labelledby="radio-buttons-group-label"
  //                           name="radio-buttons-group"
  //                           row
  //                           value={gender}
  //                           onChange={handleGender}
  //                         >
  //                           <FormControlLabel value="male" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Male" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="female" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="Female" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                           <FormControlLabel value="none" control={<Radio sx={{ ml: "auto", mr: "auto" }}/>} label="None" labelPlacement="bottom" sx={{ width:"11%" }}/>
  //                         </RadioGroup>
  //                       </FormControl>

  //                     <div className="gridSubtitle">
  //                       Dosage:
  //                     </div>
  //                     <input
  //                       className="gridInputText"
  //                       value={newarticle["qa"]["dosage"]}
  //                       onChange={setNewDosage}
  //                     />

  //                     <div className="gridSubtitle">
  //                       Effects of Coffee:
  //                     </div>
  //                     <List>
  //                       {renderEffect}
  //                       <ListItem>
  //                         <ListItemAvatar>
  //                           <IconButton onClick = {addEffect}>
  //                             <AddIcon/>
  //                           </IconButton>
  //                         </ListItemAvatar>
  //                         <ListItemText
  //                           sx={{ color: "black", pt:"2px" }}
  //                           primary="Add Effects by Yourself!"
  //                         />
  //                       </ListItem>
  //                     </List>

  //                   </AccordionDetails>
  //               </Accordion>
  //               <ThemeProvider theme={theme}>
  //                 <Button color="neutral" variant="outlined" endIcon={<SendIcon />} sx={{ mt:"10px", width: "180px", padding:"8px", fontSize:"13pt" }} onClick={onSubmit}>
  //                   Submit
  //                 </Button>
  //               </ThemeProvider>
  //             </div>
  //           </Grid>
  //           <Grid item xs={7}>
  //             <div className="gridRight">
  //               <div className="Title">
  //                 {newarticle["article"]["title"]}
  //               </div>
  //               <div className="Author">
  //                 {newarticle["article"]["authors"]}
  //               </div>
  //               <div className='Date'>
  //                 {newarticle["article"]["publish_date"]}
  //               </div>

  //               <img src={newarticle["article"]["image"]} alt = "new_img" className = "Image" />

  //               <div className='News'>
  //                 {newarticle["article"]["text"]}
  //               </div>
  //             </div>
  //           </Grid>
  //         </Grid>
  //       </Box>
  //     )
  //   }
  //   else {
  //     return(
  //       <Box sx={style2}>
  //         <div className="loadlabel2">
  //           Cannot get article from the link. Please try other article.
  //         </div>
  //       </Box>
  //     )
  //   }
  // }

  return (
    <div className="total">
      <div className="Navbar">
        <img src="/logo.png" alt="logo" className="Logo"/>
      </div>
      <div className="Body">
        <div className="recommendMain">
          <div className='graph_heading'>
            Recommended Articles to Read 
            <IconButton aria-label="help" sx ={{ ml:"10px", mb:"3px" }} onClick={openTutorial}>
              <HelpOutlineIcon sx={{ fontSize: 30  }}/>
            </IconButton>
          </div>
          <br/>

          <Box>
            <Grid container spacing={0} sx={{width: "100%"}}>
              <Grid item xs={4}>
                <div className="sliderlabel">
                    Try Filtering the Articles With
                  </div>
                  <FormControl sx={{ width: "150px", ml:"1.5%" }}>
                    <Select
                      id="demo-simple-select"
                      value={filter}
                      onChange={handlefilter}
                    >
                      <MenuItem value={"age"}>Age</MenuItem>
                      <MenuItem value={"gender"}>Gender</MenuItem>
                    </Select>
                  </FormControl>
                  {filter === "age" ? 
                    <Slider
                      aria-label="Age Group"
                      value={slider}
                      onChange={handleSlider}
                      step={10}
                      min={10}
                      max={40}
                      marks={marks}
                      sx = {{ width: "90%", ml: "5%", mt: "20px" }}
                    /> 
                    : 
                    <>
                      <br/>
                      <ToggleButtonGroup
                        color="primary"
                        value={genderselect}
                        exclusive
                        onChange={handlegenderselect}
                        sx = {{ ml: "1.5%", mt: "10px" }}
                      >
                        <ToggleButton value="general" sx = {{ width: "100px" }}>General</ToggleButton>
                        <ToggleButton value="male" sx = {{ width: "100px" }}>Male</ToggleButton>
                        <ToggleButton value="female" sx = {{ width: "100px" }}>Female</ToggleButton>
                      </ToggleButtonGroup>
                    </>  
                  }
                  <div className="pie">
                    <VictoryPie
                      innerRadius={100}
                      width={550}
                      colorScale={["#5DADEC", "#CE5757", "#B4B4B4" ]}
                      style={{
                        labels: {
                          fontSize: 25
                        }
                      }}
                      data={pie}
                      labels={({ datum }) => (datum.y === 0 ? "" : datum.x)}
                    />
                  </div>
                </Grid>
              <Grid item xs={8}>
                <div className="axisLabel">
                  Dosage
                </div>
                <img src="/sentiment.png" alt="legend" className="Legend"/>
                {
                  myData.length === 0 ? (<div></div>) : (
                    <VictoryChart 
                      domain={{ y:[-55, -8], x:[0, 6] }} 
                      height={350} 
                      width={400}
                      containerComponent = {
                        <VictoryVoronoiContainer
                          labels={() => " "}
                          labelComponent={
                            <VictoryTooltip flyoutComponent={<VictoryCustomTooltip />} />
                          }
                        />
                      }
                      theme={VictoryTheme.material}
                    >
                      <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5]}
                        tickFormat={["1 Cup", "2 Cups", "3 Cups", "4 Cups", "5 Cups"]}
                        x={10} 
                        style={{ grid: {stroke: "grey"}, tickLabels: { fontSize: 9 } }}
                      />
                      <VictoryScatter
                        bubbleProperty="amount"
                        size={({ active }) => active ? 10 : 7}
                        data={myData}
                        style={{
                          data: {
                            fill: ({ datum }) => datum.fill,
                            stroke: ({ datum }) => datum.stroke,
                            strokeWidth: 4
                          }                    
                        }}
                        events={[
                          {
                            target: "data",
                            eventHandlers: {
                              onClick: (e, props) => {
                                const json = props.data[props.index]["data"]["article"]
                                setArticle({title: json["title"], author: json["authors"], publish_date: json["publish_date"], image: json["image"], text: json["text"]})
                                openView()
                              },
                              onMouseOver: () => {
                                document.body.style.cursor = 'cursorurl';
                              },
                            }
                          }
                        ]}
                      />
                    </VictoryChart>
                  )
                }                       
              </Grid>
            </Grid>
          </Box>
          {/* <Button variant="outlined" startIcon={<AddIcon />} onClick={handleOpen}>
            Please recommend some news by yourself!
          </Button> */}
          <br/>
          <Button variant="outlined" sx={{ mt:"-50px", width: "300px", fontSize:"12pt" }} onClick={props.handleNext}>Move to the Next Stage</Button>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
      >
        <span>
          {renderModal()}
        </span>
      </Modal> */}
      <Modal
        open={view}
        onClose={handleCloseView}
      >
        <Box sx={style4}>
          <div className="viewArticle">
            <div className='Title'>
              {article["title"]}
            </div>

            <div className='Author'>
              {article["author"]}
            </div>

            <div className='Date'>
              {article["publish_date"]}
            </div>

            <img src={article["image"]} alt = "main_img" className = "Image2" />

            <div className='News'>
              {article["text"]}
            </div>
          </div>
          <IconButton aria-label="close" onClick={handleCloseView} sx={{ position:"absolute", top:5, right:5, }}>
            <CloseIcon sx={{ fontSize: 40 }}  />
          </IconButton>
        </Box>
      </Modal>
      <Modal
        open={tutorial}
        onClose={handleTutorial}
      >
        <Box sx={style5}>
          <div className='Title'>
            Tutorial
          </div>
          <div className="Tutorial">
            Each nodes in the graph represents one article related to "Coffee". 
            <br/>
            <br/>
            Hover on the nodes to check the summary of the article, and click on them to view the full article!
            <br/>
            <br/>
            The x-axis of the graph represents the effective dosage of "Coffee".
            <br/>
            <br/>
            Color of each nodes represent the sentiment of the article. Please keep these information in mind when using our system!
            <br/>
            <br/>
            Thank you again for your participation!
          </div>
          <IconButton aria-label="close" onClick={handleTutorial} sx={{ position:"absolute", top:20, right:20, }}>
            <CloseIcon sx={{ fontSize: 40 }}  />
          </IconButton>
        </Box>
      </Modal>
    </div>
    
  );
}

export default Main;
