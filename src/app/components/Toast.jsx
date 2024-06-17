import "../styles/Toaster.css"

export default function Toast({message, turnOff}) {
   setTimeout(() => {
    console.log("turning off")
    turnOff(false)
  }, 1000);

return (
  <div className="toaster-box">
    {message}
  </div>

)
}