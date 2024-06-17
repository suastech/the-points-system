import {useState} from "react";

export default function PeriodMenu({date, setValueMenuPeriod} ) {
  const periodLabels = ["From the beginnig",
                        "Last week",
                        "Last month",
                        "Last year" ]

  const startDate = new Date(date); 
  const today = new Date();

  const [periodOptions, setPeriodOptions] = useState( () => {
  
    let numberOptions;
    const differenceInDays = (today - startDate) / (1000 * 3600 * 24);
    if (differenceInDays >= 365) {
      numberOptions = 4;
    } else if (differenceInDays >= 30) {
      numberOptions = 3;
    } else if (differenceInDays >= 7) {
      numberOptions = 2;
    } else {
      numberOptions = 1;
    }

    let arrayToShow = [];
    for (let i = 0; i < numberOptions; i++) {
      arrayToShow.push(periodLabels[i])    
    }
    return arrayToShow;
  })

  return (
    <div>
      <select name="period" id="period" onChange={ (e) => setValueMenuPeriod(e.target.value)}>
        {periodOptions.map ((element, index) => {
          return <option key={index} value={index}>{element}</option>
        })}
      </select>
    </div>
  )

}