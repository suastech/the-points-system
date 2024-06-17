
export default function dataChartGenerator (dataObject, valueMenuPeriod) {
  const dailyMax = 10;
  const differenceRanges = [
    [.95, .99], //small
    [.9, .95],
    [.4, .6],
    [.1, .2], // huge
  ];
  let beginningWeekly = false;
  const bottomLimit = differenceRanges[dataObject.gap][0];
  const upperLimit = differenceRanges[dataObject.gap][1];

  function generateValues() {
    const multipleLoser = Math.random() * (upperLimit - bottomLimit) + bottomLimit;
    let dayWinnerValue = (Math.random() * dailyMax);
    let dayLoserValue = (dayWinnerValue * multipleLoser);
    let totalWinner = Number(dayWinnerValue.toFixed(2)); 
    let totalLoser =  Number(dayLoserValue.toFixed(2));

    if (valueMenuPeriod === 0 && beginningWeekly === true) {
      totalWinner = dayWinnerValue * 7;
      totalLoser =  dayLoserValue * 7;
    }
    
    if (valueMenuPeriod === 3) {
      totalWinner = dayWinnerValue * 30;
      totalLoser =  dayLoserValue * 30;
      }
    
    totalWinner = Number(totalWinner.toFixed(2)); 
    totalLoser =  Number(totalLoser.toFixed(2));

    return dataObject.winner === 1? [totalWinner, totalLoser] : [totalLoser, totalWinner] 
  }

  function getArrayDates(value) {
    const originDate = new Date(dataObject.date)
    const today = new Date();
    let arrayDates = [];
    switch (Number(value)) {
      case 0:
        const oneDay = 24 * 60 * 60 * 1000;
        const daysDifference = Math.floor((today - originDate) / oneDay);

        if (daysDifference < 31) {
            //format: dd-mm ¿?
            while (today >= originDate) {
                arrayDates.push(`${originDate.getDate()}-${originDate.getMonth() + 1}`);
                originDate.setDate(originDate.getDate() + 1);
            }
        } else {
            beginningWeekly = true;
            while (today >= originDate) {
                arrayDates.push(`${originDate.getDate()}-${originDate.getMonth() + 1}-${originDate.getFullYear().toString().slice(-2)}`);
                originDate.setDate(originDate.getDate() + 7);
            }
        }
        break;

      case 1:
        // Format: dd-mm
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < 7; i++) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          const dayOfWeek = daysOfWeek[date.getDay()];
          arrayDates.unshift(`${dayOfWeek} ${date.getDate()}`);
        }
        break;
    
      case 2:
        // Last 30 days: mm-yy
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

  const arrayLabelsX = getArrayDates(valueMenuPeriod);
  let lineData = [];
  let total1 = 0;
  let total2 = 0;
  arrayLabelsX.forEach( element => {
    const obj = {date: element};
    let values = generateValues();
    obj[dataObject.firstName1]= values[0];
    obj[dataObject.firstName2]= values[1];
    total1 += values[0];
    total2 += values[1];
    lineData.push(obj);
    });

  const barData = [
    { name: dataObject.firstName1, value: Number(total1.toFixed(2)) },
    { name: dataObject.firstName2, value: Number(total2.toFixed(2)) },
    ];

  return [barData, lineData]
}