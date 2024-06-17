import Image from 'next/image';
import messages from "../../../messages";
import ScoreNumberDisplay from "./ScoreNumberDisplay"
import "../../styles/PersonColumn.css";

export default function PersonColumn ({personName, myPoints, pointsOther, sex, image}) {
  const genderMessage = sex === 1? "female" : "male";
  const indexLoserMessage = Math.floor(Math.random() * messages.losers[genderMessage].length);
  const indexWinnerMessage = Math.floor(Math.random() * messages.winners[genderMessage].length);
  const messageToShow = myPoints > pointsOther ? messages.winners[genderMessage][indexWinnerMessage] : messages.losers[genderMessage][indexLoserMessage];

  function fixMessage (message, name, points) {
    message = message.replace(/\*\*name\*\*/g, name).replace(/\*\*points\*\*/g, points);
    return message;
  }

return (
  <div className="person-info-column">
    <div id="results-picture-and-number">
        <div className="results-image-wrapper">
          {image?
            <Image src={URL.createObjectURL(image)} width={60} height={60} alt="user-image"/>
            :
            <div style={{fontSize:"20px"}}>{personName}</div>
          }
        </div>
        <ScoreNumberDisplay myPoints={myPoints}/>
    </div>
    <div className="message-container"> {fixMessage( messageToShow, personName, myPoints)} </div>
  </div>
  )
}

