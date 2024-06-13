import "../../styles/DisplayResults.css";
import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PersonColumn from "./PersonColumn";
import backButton from "../../images/back.png";
import Image from "next/image";

export default function DisplayResults( {dataObject, dataBar, dataLine, person1, person2, valueMenuPeriod, setShowResults, setIsWelcome, images}) {
  const period = [
    `from ${dataObject.date} to today.`,
    "Last week",
    "Last month",
    "Last year"
  ]

  return (
    <section id="results-area">

    <div id="results-buttons">
      <button onClick={() => {setShowResults(false); setIsWelcome(true)} }>Other period  {/* <Image src={backButton} alt="back" /> */} </button>
      <button>Share</button>
      <button>Download</button>
    </div>

    <div id="presentation-results">
      
      <div id="results-initial-info">
          <h1 > Certificate</h1>
          <div> {`${dataObject.firstName1} ${dataObject.lastName1} & ${dataObject.firstName2} ${dataObject.lastName2} `}</div>
          <div> Relationship Status: <i>{dataObject.status}</i></div>
          <div>Period analyzed: {period[valueMenuPeriod]} </div>
      </div>


        <div id="bargraph-and-info">
            <BarGraph dataBar={dataBar} />
          <div id="persons-info-space">
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
