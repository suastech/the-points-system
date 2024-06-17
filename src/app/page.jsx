import Link from "next/link";
import "./home.css";
import CircleCard from "./evaluate/components/CircleCard";

export default function Home() {
 
  return (
  
  <div className="page-content">
    <CircleCard/>
    <div className="welcome-screen">
      <div className="home-inner-text">
        <p style={{fontSize:"30px"}}>Welcome</p>
        <p>We are the world´s only system for the scientific measurement of people´s performance in their love relationships.</p>
        <p>Using state-of-the-art technology to obtain and process personal information, we provide accurate and indisputable scores.</p>
        <p>Enter to discover your relationship score.</p>
        <Link href={"/info"}><button className="generic-button">Discover</button></Link>
      </div>
    </div>
  </div>
   
  );
}
