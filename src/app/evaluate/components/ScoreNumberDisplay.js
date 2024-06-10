import { memo } from 'react';
import { useEffect, useState } from "react";

const ScoreNumberDisplay = memo(({ myPoints }) => {
  const [showedNumber, setShowedNumber ] = useState(0);
  const [counter, setCounter] = useState(0);
  const limit = 20;
  const speedChange = 100;

  useEffect(() => {
    setCounter ( prev => prev + 1);
    let idInterval;
    if (counter < limit) {
      idInterval = setInterval(() => {
        const random = Math.floor(Math.random() * 10000) 
        setShowedNumber(random);
      }, speedChange);
    } else {
      setShowedNumber(myPoints);
    }
    return () => clearInterval(idInterval);
  }, [showedNumber]);


  return <p>{showedNumber}</p>;
});


ScoreNumberDisplay.displayName = 'NumberDisplay';


export default ScoreNumberDisplay;
