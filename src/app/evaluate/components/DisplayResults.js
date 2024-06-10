import "../../styles/DisplayResults.css";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PersonColumn from "./PersonColumn";

export default function DisplayResults( {dataObject, dataBar, dataLine, person1, person2, valueMenuPeriod, setShowResults, setIsWelcome}) {
  const points1 = dataBar[0].value
  const points2 = dataBar[1].value
  const period = [
    "from its beggining",
    "in the last week",
    "in the last month",
    "in the last year"
  ]

  return (
    <section id="results-area">

    <div className="results-previous">
      <button onClick={() => {setShowResults(false); setIsWelcome(true)} }>Analyze different period</button>
      <button>Download Certificate</button>
      <button>Share Certificate</button>
    </div>

    <div id="presentation-results">
      
      <div id="results-initial-info">
          <h1>The Points System</h1>
          <h1>Certificate</h1>
          <div> {`${dataObject.firstName1} ${dataObject.lastName1} & ${dataObject.firstName2} ${dataObject.lastName2}`} </div>
          <div>Relationship Status: {dataObject.status}</div>
          <div>Together since: {dataObject.date}</div>
          <div>Period Analyzed: </div>
      </div>

        <div id="bargraph-and-info">
            <BarGraph dataBar={dataBar} />
          <div id="persons-info-space">
            <PersonColumn personName ={person1} sex={dataObject.sex1} myPoints = {dataBar[0].value} pointsOther = {dataBar[1].value}/>
            <PersonColumn personName ={person2} sex={dataObject.sex2} myPoints = {dataBar[1].value} pointsOther = {dataBar[0].value}/>
          </div>
        </div>
        <LineGraph dataLine={dataLine} person1={person1} person2={person2}/>
      </div>
  
    </section>
  )
}
