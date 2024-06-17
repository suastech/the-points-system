export default function WelcomeText ({handleInfoScreen, name1, name2}) {

  return ( 
    <div className="text-space-welcome">
      <p style={{fontSize:"30px"}}>Welcome</p>
      <p>This is the world's only system for the scientific measurement of people's performance in their love relationships.</p>
      <p>We received a request to analyze the relationship of: <br/> <span style={{color:"grey", fontSize:"23px"}}>{name1} and {name2}</span> </p>
      <p>The provided results will be accurate, indisputable, definitive, and science-based.</p>
      <button onClick={handleInfoScreen}>Go to evaluation</button>
    </div>
  )
}