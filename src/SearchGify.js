import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
const GiphyItem = React.lazy(() => import("./GiphyItem"));

export const SearchGify = () => {
  // const [giphyArray, setgiphyArray] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [giphyData, setGiphyData] = useState([]);

  const apiKey = "1xGPgNOHn0R3iRpJtMlxj0hooj5gubLQ";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
  const objParam = {
    limit: "5",
    offset: "0",
    rating: "G",
    lang: "en"
  };

  const serializeGetParams = input => {
    console.log("input" + input);
    console.log("I am inside");
    let str = Object.entries(objParam)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    let finalUrl = url + "&q=" + input + "&" + str;
    return finalUrl;
  };

  const handleChange = e => {
    setinputValue(e.target.value);
  };

  const callToGetData = async value => {
    const responseFromGiphy = await axios.get(serializeGetParams(value));
    if (responseFromGiphy) {
      setGiphyData(responseFromGiphy.data.data);
    }
  };

  const handleClick = () => {
    callToGetData(inputValue);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Gifs.."
          onChange={event => handleChange(event)}
        />
        <button className="btn btn-primary" onClick={handleClick}>
          Submit
        </button>
      </div>
      {giphyData.length > 0 ? (
        <div className="giphy-container">
          <Suspense fallback={<h1>Loading Giphys</h1>}>
              <p>Showing {inputValue} Giphys</p>
            <GiphyItem data={giphyData} />
          </Suspense>
        </div>
      ) : null}
    </div>
  );
};
