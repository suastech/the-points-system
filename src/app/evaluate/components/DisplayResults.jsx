import "../../styles/DisplayResults.css";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PersonColumn from "./PersonColumn";
import ResultsHeader from "./ResultsHeader";

export default function DisplayResults( {dataObject, dataBar, dataLine, person1, person2, valueMenuPeriod, setShowResults, setIsWelcome, images}) {
  const period = [
    `from ${dataObject.date} to today`,
    "Last week",
    "Last month",
    "Last year"
  ]

  return (
    <section id="results-area">

    <div id="results-buttons">
      <button onClick={() => {setShowResults(false); setIsWelcome(true)} }>Change period  {/* <Image src={backButton} alt="back" /> */} </button>
      <button>Share</button>
      <button>Download</button>
    </div>

    <div id="presentation-results">
      <ResultsHeader dataObject={dataObject} period={period} valueMenuPeriod={valueMenuPeriod}/>

      <div id="bargraph-and-info">
        <BarGraph dataBar={dataBar} />
        <div className={`persons-info-space ${dataBar[0].value > dataBar[1].value ? "reverse-persons" : ""}`}>
          <PersonColumn personName ={person1} sex={dataObject.sex1} myPoints = {dataBar[0].value} pointsOther = {dataBar[1].value} image={images.image1}/>
          <PersonColumn personName ={person2} sex={dataObject.sex2} myPoints = {dataBar[1].value} pointsOther = {dataBar[0].value} image={images.image2}/>
        </div>
      </div>
      
      <LineGraph dataLine={dataLine} person1={person1} person2={person2}/>
      
      <div id="cetificate-footer">
       The Points System analyzed the performance of each member of this relationship obtaining the presented results, which are definitive, correct, incontrovertible and have official validity.
      </div>
      
      </div>  
    </section>
  )
}
