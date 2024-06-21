'use client'
import { useState } from "react";
import '../../styles/FormUser.css'
import Link from "next/link";
import {PROJECT_BASICS, STATUS_OPTIONS, VICTORY_LEVELS} from '../../../../generalParameters'
import Image from 'next/image';
import copy from "../../images/copy.png";
import CryptoJS from "crypto-js";
import Toast from "../../components/Toast";

export default function FormUser() {
  const[ isConfirm, setIsConfirm] = useState(false);
  const[ isFinalScreen,setIsFinalScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState("");
  const limitDate = new Date().toISOString().split('T')[0];
  const [isToaster, setIsToaster] = useState(false);
  const [isForm, setIsForm] = useState(true);
  
  const secret_key = process.env.NEXT_PUBLIC_SECRET_KEY;

  const handleCopy = () => {
    const message = `${PROJECT_BASICS.url}/evaluate/${route}`;
    navigator.clipboard.writeText(message)
      .then(() => {
        setIsToaster(true)
      })
      .catch((error) => {
        alert('Unable to copy to clipboard. Please try again');
      });
  };

  const [data, setData] = useState({
        gap: "",
        sex1: "",
        sex2: "",
        winner: "",
        status: "",
        date: "",
        fn1length:"", 
        ln1length:"",
        fn2length:"",
        ln2length:"",
        firstName1: "",
        lastName1: "",
        firstName2: "",
        lastName2:"",
      })

  function handleChange (e) {
    let copy = {...data};
    copy[e.target.name] = e.target.value;
    setData(copy);
  }

  function handleSubmit (e) {
    e.preventDefault()
    const newObj = {... data}
    //send the length of the names and last names as properties:
    newObj.fn1length = data.firstName1.length.toString().padStart(2, '0');
    newObj.ln1length = data.lastName1.length.toString().padStart(2, '0');
    newObj.fn2length = data.firstName2.length.toString().padStart(2, '0');
    newObj.ln2length = data.lastName2.length.toString().padStart(2, '0');
    setData(newObj);
    setIsForm(false)
    setIsConfirm(true)
  }

  function handleBackToEdit() {
    console.log(data)
    setIsConfirm(false);
    setIsForm(true)
  }

  function handleConfirm() {
    setIsConfirm(false)
    setIsFinalScreen(true)
    generateLink()
  }

  function generateLink() {
    const dataString = Object.values(data).join('');
    const encryptedData = CryptoJS.AES.encrypt(dataString, secret_key).toString();
    setRoute(encodeURIComponent(encryptedData));
    setTimeout(() => { setIsLoading(false) }, 1000)
  }

return (
<>
    <form id="user-form" style={ isForm? {} : {display:"none"}}  onSubmit={handleSubmit}>
      <h3 id="form-header">Let´s create your tailored evaluation</h3>
      <div className="new-field">
        <label >Person 1</label>
        <div className="info-person">
          <input type="text" name="firstName1" id="firstName1" placeholder="First Name..." onChange={handleChange} value={data.firstName1} required></input>
          <input type="text" name="lastName1" id="lastName1" placeholder="Last Name..." onChange={handleChange} required></input>
          <select name="sex1" id="sex1" onChange={handleChange} required >
            <option value="" disabled selected>Sex</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>

        </div>
        <label >Person 2</label>
        <div className="info-person">
          <input type="text" name="firstName2" placeholder="First Name" id="firstName2" onChange={handleChange} required></input>
          <input type="text" name="lastName2" placeholder="Last Name..." id="lastName2" onChange={handleChange} required></input>
          <select name="sex2" id="sex2" onChange={handleChange} required >
            <option value="" disabled selected>Sex</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
      </div>

      <div className="new-field">
        <label htmlFor="status">Relationship Status</label>
        <select name="status" id="status" required onChange={handleChange}>
            <option value="" disabled selected>--Select--</option>
            {STATUS_OPTIONS.map( (text, index) => {
              return <option id={"option_" + index} key={index} value={index.toString().padStart(2, '0')} >{text}</option>
            })}
        </select>
      </div>

      <div className="new-field">
        <label htmlFor="time-together">Together since...</label>
        <input name="date" id="date" type="date" max={limitDate} onChange={handleChange} required></input>
      </div>

      <div className="new-field ">
          <label >Who will get the higher score? <spann style={{color: "red", opacity:"0.7"}}> (choose wisely) </spann></label>
            <div style={{display:"flex", justifyContent:"space-around"}}>
              <div className="form-winner-box">
                <label>Person 1</label>
                <input type="radio" name="winner" id="option1" value={"1"} onChange={handleChange} required/>
              </div>
              <div className="form-winner-box">
                <label>Person 2</label>
                <input type="radio" name="winner" id="option2" value={"2"} onChange={handleChange} required/>
              </div>
            </div>
      </div>

      <div className="new-field">
        <label htmlFor="gap">How big the score difference should be?</label>
        <select name="gap" id="gap" onChange={handleChange} required>
          <option disabled value="" selected>--Select--</option>
          {VICTORY_LEVELS.map( (element, index) => <option key={index} value={index.toString()}>{element}</option>)}
        </select>
      </div>
      <button type="submit" disabled={isConfirm || isFinalScreen}  className="button">Submit</button>
    </form>
  

  {isConfirm &&
    <div className="confirm">
        <h1>Verify the information</h1>
        <h2>Evaluation requested for: <br/> <span className="confirmation-info-span">{data.firstName1 + " " + data.lastName1} ({data.sex1 === "0"? "male" : "female"}) & {data.firstName2 + " " + data.lastName2} ({data.sex2 === "0"? "male" : "female"}) </span> </h2>
        <h2>Relationship status:<br/> <span className="confirmation-info-span">{STATUS_OPTIONS[Number(data.status)]} </span> </h2>
        <h2>Together since:<br/> <span className="confirmation-info-span">{data.date} </span> </h2>
        <h2>The result will be favorable to:<br/>  <span className="confirmation-info-span">  {data.winner === "1"? data.firstName1 + " " + data.lastName1 : data.firstName2 + " " + data.lastName2} </span></h2>
        <div style={{display:"flex", justifyContent: "space-around"}}>
            <button onClick={handleConfirm}>Confirm</button>
            <button onClick={handleBackToEdit}>Back to edit</button>
        </div>
    </div>
  }

  {isFinalScreen &&
      <div className="confirm">
      {isLoading?
        <div className="circular-loading-container">
          <div className="circular-loading">
            <div className="circular-inner">
          </div>
        </div>
        <div style={{marginTop:"15px"}}>Loading</div>
       </div>
      :
      <div>
        <Link href={`/evaluate/${route}`}><h1 style={{ display: 'inline-block', verticalAlign: 'middle' }}>Check your results here!</h1></Link>
        <Image src={copy} alt="copy" className="icon-share" onClick={handleCopy}  style={{ display: 'inline-block', verticalAlign: 'middle'}} />
        <h2>Share the link with your partner and those you want to see the evaluation.</h2>
        <button onClick={ () => { location.reload();} } > Close </button>
        {isToaster && <Toast message={"Link copied!"} turnOff={setIsToaster}/>}

      </div>
      }

    </div>

  }
  </>
)    
}

{/* <div className="confirm-wrapper">
    <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Verify the information
      </Typography>
      <Typography variant="subtitle1">
        Evaluation requested for:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data.firstName1} {data.lastName1} ({data.sex1 === "0" ? "male" : "female"}) & {data.firstName2} {data.lastName2} ({data.sex2 === "0" ? "male" : "female"})
      </Typography>
      <Typography variant="subtitle1">
        Relationship status:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {STATUS_OPTIONS[Number(data.status)]}
      </Typography>
      <Typography variant="subtitle1">
        Together since:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data.date}
      </Typography>
      <Typography variant="subtitle1">
        The result will be favorable to:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {data.winner === "1" ? `${data.firstName1} ${data.lastName1}` : `${data.firstName2} ${data.lastName2}`}
      </Typography>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: '20px' }}>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="outlined" color="primary" onClick={handleBackToEdit} >
          Back to edit
        </Button>
      </div>
    </CardContent>
    </Card>
    </div>  */}