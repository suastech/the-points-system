import { useState, useEffect } from 'react';
import '../../styles/LoadingEffect.css';

export default function LoadingEffect( {counterLimit} ) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const countValue = setInterval(() => {
      if (value >= 100 ) {
        clearInterval( countValue );
        return;
      }
      setValue(prev => prev + 1);
    }, 100);

  }, [value]);

  return (
    <div className="progress" style={{ "--progress": `${value<100? value: 100}%` }}>
      <div className="bar">
        <div className="progress-value"></div>
      </div>
      <div id='text-progress'>{value<100? value: 100}%</div>
    </div>
  );
}
