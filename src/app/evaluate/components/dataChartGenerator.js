
export default function dataChartGenerator (dataObject, valueMenuPeriod) {

  function getArrayDates(value) {
    const originDate = new Date(dataObject.date)
    const today = new Date();
    let arrayDates = [];
    switch (Number(value)) {
      case 0:
        // Devuelve array de fechas por semana entre hoy y originDate, en formato dd-mm-yy
        while (today >= originDate) {
          arrayDates.push(`${originDate.getDate()}-${originDate.getMonth() + 1}-${originDate.getFullYear().toString().slice(-2)}`);
          originDate.setDate(originDate.getDate() + 7);
        }
        break;
    
      case 1:
        // Devuelve array de fechas de los últimos siete días desde today, en formato: dd-mm

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dayOfWeek = daysOfWeek[date.getDay()];
          arrayDates.unshift(`${dayOfWeek} ${date.getDate()}`);
        }
        break;
    
      case 2:
        // Devuelve array de fechas de los últimos 30 días desde today, en formato mm-yy

        const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < 30; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          arrayDates.unshift(`${date.getDate()} ${monthsOfYear[ date.getMonth()] }`);
        }
        break;
    
      default:
        // Devuelve array de los últimos 12 meses transcurridos desde today, en formato: jan, feb, mar, etc.
        for (let i = 0; i < 12; i++) {
          const date = new Date(today);
          date.setMonth(date.getMonth() - i);
          arrayDates.unshift(`${date.toLocaleString('default', { month: 'short' })}-${originDate.getFullYear().toString().slice(-2)}`);
        }
        break;
    }

    return arrayDates
  }
  
  function getAstronomicalValues (numberOfPeriods) {
    // Va a dar los msmos totales para cualquier lapso de tiempo 
    const ratioMinMax = 100;
  
    const minTotalL = 10;
    const maxTotalL = 20; 
    const proxiTotalL = Math.random() * (maxTotalL - minTotalL) + minTotalL;
  
    const mediaPerPeriodL = proxiTotalL / numberOfPeriods;
    const valueLoser = mediaPerPeriodL * (0.5 + Math.random());
  
    const minTotalW = minTotalL* ratioMinMax;
    const maxTotalW = maxTotalL * ratioMinMax 
    const proxiTotalW = Math.random() * (maxTotalW - minTotalW) + minTotalW;
  
    const mediaPerPeriodW = proxiTotalW / numberOfPeriods;
    const valueWinner = mediaPerPeriodW * (0.5 + Math.random());
  
    //Send the results in order according to dataObjectWinner: 1 or 2;
    return dataObject.winner === 1? [Math.round(valueWinner), Number(valueLoser.toFixed(2)) ] : [Number(valueLoser.toFixed(2)), Math.round(valueWinner)] }
  
  function getCloseValues () {
    //Add values to generate the gap according to value dataObject.gap
    const [rangeUpper, rangeBottom] = dataObject.gap === 0 ? [.02, .005] : dataObject.gap === 1 ?[.1, .02] : [.5, .1];
    const loserValue = (Math.random() * (120 - 80 + 1)) + 80;
    const plus = Math.floor(Math.random() * (rangeUpper - rangeBottom + 1)) + rangeBottom;
    let winnerValue = loserValue * (1 + plus)
    return dataObject.winner === 1? [ Number(winnerValue.toFixed(2)), Number(loserValue.toFixed(2)) ]  : [Number(loserValue.toFixed(2)), Number(winnerValue.toFixed(2))] }
  
  const arrayLabelsX = getArrayDates(valueMenuPeriod)
  let lineData = [];
  let total1 = 0;
  let total2 = 0;
  
  arrayLabelsX.forEach( element => {
    const obj = {
      date: element
    }
    if (dataObject.gap === 3) {
      let values = getAstronomicalValues(arrayLabelsX.length)
      obj[dataObject.firstName1]= values[0];
      obj[dataObject.firstName2]= values[1];
      total1 += values[0]
      total2 += values[1]
    }
    else {
      let values = getCloseValues()
      obj[dataObject.firstName1]= values[0];
      obj[dataObject.firstName2]= values[1];
      total1 += values[0]
      total2 += values[1]
    }
    lineData.push(obj)
  })

  const barData = [
    { name: dataObject.firstName1, value: Number(total1.toFixed(2)) },
    { name: dataObject.firstName2, value: Number(total2.toFixed(2)) },
  ]

  return [barData, lineData]

}

/* const dataObject = {
  gap: 3, //
  status: 0,
  date: "2022-01-01",
  winner: 2,
  firstName1: "juan",
  lastName1: "perez",
  firstName2: "maría",
  lastName2: "lopez"
  }
  // ["From de begginig of our relationship", "Last week", "Last month", "Last year" ]
const valueMenuPeriod = 0
console.log(dataChartGenerator (dataObject, valueMenuPeriod)) */