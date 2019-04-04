import React, { useState } from 'react';
import axios from 'axios';

export const SearchGify = () => {

    const [giphyArray, setgiphyArray] = useState([]);
    const [inputValue, setinputValue] = useState('');


    const apiKey = '';
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`
    const objParam = {
        limit: '25',
        offset: '0',
        rating: 'G',
        lang: 'en'
    }

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


    const handleClick = () => {
        console.log("value from input" + inputValue)
        axios.get(serializeGetParams(inputValue))
            .then(response => {
                console.log(JSON.stringify(response.data.data));
                setgiphyArray(response.data.data);

            })
            .catch(err => {
                console.log("Error" + err);
            })
    }

    return (
        <div>
            <input type="text" placeholder="Search" onChange={handleChange} />
            <button className="btn btn-block" onClick={handleClick}>Submit</button>

            <div className="gifyContainer">
                {giphyArray.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.embed_url} alt=""/>

                        </div>
                    )
                })}

            </div>
        </div>

    )
}
