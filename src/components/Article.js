import React, { useState, useEffect } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { db } from './firebase';

function Article(props) {

    const [load, setLoad] = useState(false)
    const [article, setArticle] = useState({title:'', author:'', publish_date:'', image:'', text:''})

    useEffect(()=>{
        if (!load){
            var dbref = ""
            if (props.init === "1" || props.init === "2"){
                dbref = "/Coffee/-NI2SBDyRpGzPkBIUswn"
            }
            else {
                dbref = "/Coffee/-NI2r4S5dUnZYBNs-xsk/"
            }
            db.ref(dbref).get().then((snapshot) => {
                const json = snapshot.val()["article"]
                setArticle({title: json["title"], author: json["authors"], publish_date: json["publish_date"], image: json["image"], text: json["text"]})
            })
            setLoad(true)
        }
    },[])

    return (
        <div className="total">
            <div className="Navbar">
                <img src="/logo.png" alt="logo" className="Logo"/>
            </div>
            <div className="Body">
                <div className="Main">
                    <div className='Title'>
                        {article["title"]}
                    </div>

                    <div className='Author'>
                        {article["author"]}
                    </div>

                    <div className='Date'>
                        {article["publish_date"]}
                    </div>

                    <img src={article["image"]} alt = "main_img" className = "Image" />

                    <div className='News'>
                        {article["text"]}
                    </div>

                    <Button variant="outlined" sx={{ mt: "20px", mb:"20px", fontSize:"12pt" }} onClick={props.handleNext}>Move to the Next Stage</Button>
                </div>
                <br/>
            </div>
        </div>
    );
}


export default Article;
