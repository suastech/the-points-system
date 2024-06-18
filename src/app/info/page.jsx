import Link from "next/link"
import "../styles/Info.css"

export default function Info() {

return (
<div className="page-container">

  <div  id="info-container">

    <div id="info-header">
      <div>The Points System</div>
      <div>Technology that always proves you right</div>
    </div>
      
    <h4>Relationships are not easy. We all need an objective and rigorous system that shows the world we are always right.</h4>
    <h4>The solution is finally here:</h4>
    
    <ol>
      <li>Click on Request Evaluation.</li>
      <li>Enter your and your partner´s information.</li>
      <li>Copy and share the link where a customized result will be waiting for you.</li>
    </ol>
    <Link href={"/request"}>
        <div style={{display:"block", margin:"0 auto", width:"fit-content"}} >
        <button className="generic-button">Request Evaluation</button>
        </div>
    </Link>
    <h4>Share this page with whoever may be in need of a hand from The Points System.</h4>

  </div>

</div>
)
}