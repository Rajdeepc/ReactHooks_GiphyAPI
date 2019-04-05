import React, { useState,useEffect } from 'react';
import axios from 'axios';

export const SearchGify = () => {

   // const [giphyArray, setgiphyArray] = useState([]);
    const [inputValue, setinputValue] = useState('marvel');
    const [gifValue, setgifValue] = useState('');
    let giphyArray = [];
    let i = 0;

    const apiKey = '1xGPgNOHn0R3iRpJtMlxj0hooj5gubLQ';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`
    const objParam = {
        limit: '5',
        offset: '0',
        rating: 'G',
        lang: 'en'
    }
    
    useEffect(() => {
        handleClick()
    },[])
    

    const serializeGetParams = (input) => {
        console.log("input" + input)
        console.log("I am inside");
        let str = Object.entries(objParam).map(([key, val]) => `${key}=${val}`).join('&');
        let finalUrl = url + '&q=' + input + '&' + str;
        return finalUrl;
    }


    const handleChange = (e) => {
        setinputValue(e.target.value)
    }

    const changeGif = () => {
        if(i < giphyArray.length) {
            setTimeout(() => {
                console.log("index" + giphyArray[i].embed_url)
                setgifValue(giphyArray[i].embed_url);
                i++;
                changeGif();
            }, 5000)
        }
    }


    const handleClick = () => {
        i = 0;
        console.log("value from input" + inputValue)
        axios.get(serializeGetParams(inputValue))
            .then(response => {
                console.log("response from api" + JSON.stringify(response.data.data));
                giphyArray = response.data.data;
                changeGif();
            })
            .catch(err => {
                console.log("Error" + err);
            })
    }

    return (
        <div>
            <input type="text" placeholder="Search" onChange={handleChange}/>
            <button className="btn btn-block" onClick={handleClick}>Submit</button>

            <div className="gifyContainer">
            <div>
                <iframe src={gifValue}></iframe>
            </div>
        

            </div>
        </div>

    )
}
