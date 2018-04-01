import React from "react";

let Ad = () => (
    <img className="ad" src={`http://localhost:3000/ads/?r=${Math.floor(Math.random() * 1000)}`}/>
)

export default Ad
