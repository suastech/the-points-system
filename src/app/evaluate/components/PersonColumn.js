import { useEffect, useState } from "react";
import Image from 'next/image';
import messages from "../../../messages";
import ScoreNumberDisplay from "./ScoreNumberDisplay"
import "../../styles/PersonColumn.css";

export default function PersonColumn ({personName, myPoints, pointsOther, sex}) {
  
  const genderMessage = sex === "0"? "male" : "female"
  const messageToShow = myPoints > pointsOther ? messages.winners[genderMessage][0] : messages.losers[genderMessage][0];

  function fixMessage (message, name, points) {
    message = message.replace(/\*\*name\*\*/g, name).replace(/\*\*points\*\*/g, points);
    return message;
  }

 

return (  
  <div className="person-info-column">
    <div id="results-picture-and-number">
     <div className="results-image-wrapper"><Image width={60} height={60} src="https://ca.slack-edge.com/T06RMEQ18AY-U06RK29DP0A-46c12e17b2d3-512" alt="img2"/> </div>
     <ScoreNumberDisplay myPoints={myPoints}/>
    </div>
    <div className="message-container"> {fixMessage( messageToShow, personName, myPoints)} </div>
  </div>
)
}

