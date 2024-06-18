import FixedLogo from "@/app/components/FixedLogo"
import "../../styles/ResultsHeader.css"

export default function ResultsHeader({dataObject, period, valueMenuPeriod}) {

  return ( 
    <div id="results-initial-info">
      <div className="results-header">
        <h1>Certificate</h1> <div>The Points System</div>
        {/*<div className="logo-container"><FixedLogo/></div>*/}
      </div>
      <div> {`${dataObject.firstName1} ${dataObject.lastName1} & ${dataObject.firstName2} ${dataObject.lastName2} `}</div>
      <div> Relationship Status: <i>{dataObject.status}</i></div>
      <div>Period analyzed: {period[valueMenuPeriod]} </div>
    </div>

  )
}