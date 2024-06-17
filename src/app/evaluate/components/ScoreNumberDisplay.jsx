import { memo, useEffect, useState, useRef } from 'react';

const ScoreNumberDisplay = memo(({ myPoints }) => {
  const [state, setState] = useState({ showedNumber: 0, counter: 0 });
  const { showedNumber, counter } = state;
  const limit = 10;
  const speedChange = 100;
  const intervalRef = useRef(null);

  useEffect(() => {
    if (counter < limit) {
      intervalRef.current = setInterval(() => {
        const random = Math.floor(Math.random() * 10000);
        setState((prevState) => ({
          showedNumber: random,
          counter: prevState.counter + 1
        }));
      }, speedChange);
    } else {
      setState((prevState) => ({
        ...prevState,
        showedNumber: myPoints
      }));
    }

    return () => clearInterval(intervalRef.current);
  }, [counter, limit, speedChange, myPoints]);

  return <p>{Math.round(showedNumber)}</p>;
});

ScoreNumberDisplay.displayName = 'NumberDisplay';

export default ScoreNumberDisplay;
