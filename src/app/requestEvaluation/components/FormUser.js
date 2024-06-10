'use client'
import { useState } from "react";
import '../../styles/FormUser.css'
import Link from "next/link";
import {STATUS_OPTIONS, VICTORY_LEVELS} from '../../../../generalParameters'
import Image from 'next/image';

import copy from "../../images/copy.png";

export default function FormUser() {
  const[ isConfirm, setIsConfirm] = useState(false);
  const[ isFinalScreen,setIsFinalScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [route, setRoute] = useState("");
  const limitDate = new Date().toISOString().split('T')[0];

  const [data, setData] = useState({
        gap: "",
        firstName1: "",
        firstName2: "",
        lastName1:"",
        lastName2: "",
        sex1: "",
        sex2: "",
        winner: "",
        status: "",
        date: "",
      })

  function handleChange (e) {
    let copy = {...data};
    copy[e.target.name] = e.target.value;
    setData(copy);
  }

  function handleSubmit (e) {
    e.preventDefault()
    setIsConfirm(true)
  }

  function handleNext() {
    setIsConfirm(false)
    setIsFinalScreen(true)
    generateLink()
  }

  function generateLink() {
    let gap = data.gap;
    let statusString = data.status.toString()
    if (statusString.length === 1) {
      statusString = "0" + statusString
    }
    let date = data.date.replace(/[-]/g, '');
    let winner = data.winner;
    let sex1 = data.sex1;
    let sex2 = data.sex2;

    let firstName1 = encodeURIComponent(data.firstName1.trim().replace(/[-]/g, '***'));
    let firstName2 = encodeURIComponent(data.firstName2.trim().replace(/[-]/g, '***'));
    let lastName1 = encodeURIComponent(data.lastName1.trim().replace(/[-]/g, '***'));
    let lastName2 = encodeURIComponent(data.lastName2.trim().replace(/[-]/g, '***'));
    let route = sex1 + sex2 + "-" + gap + "-" + statusString + "-" + date + "-" + winner + "-" + firstName1 + "-" + lastName1 + "-" + firstName2 + "-" + lastName2;
    
    setRoute(route);

    setTimeout(
      () => {
        setIsLoading(false)
      }
      , 1000)

  }

return (
<>
  <form id="user-form" onSubmit={handleSubmit}>
    <div className="new-field">
      <label >Person 1</label>
      <div className="info-person">
        <input type="text" name="firstName1" id="firstName1" placeholder="First Name..." onChange={handleChange} value={data.firstName1}/* required */></input>
        <input type="text" name="lastName1" id="lastName1" placeholder="Last Name..." onChange={handleChange} /* required */></input>
        <select name="sex1" id="sex1" onChange={handleChange} required >
          <option value="" disabled selected>Sex</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>

      </div>
      <label >Person 2</label>
      <div className="info-person">
        <input type="text" name="firstName2" placeholder="First Name" id="firstName2" onChange={handleChange} /* required */></input>
        <input type="text" name="lastName2" placeholder="Last Name..." id="lastName2" onChange={handleChange} /* required */></input>
        <select name="sex2" id="sex2" onChange={handleChange} required >
          <option value="" selected disabled>Sex</option>
          <option value="0">Male</option>
          <option value="1">Female</option>
        </select>
      </div>
    </div>

    <div className="new-field">
      <label htmlFor="status">Relationship Status</label>
      <select name="status" id="status" /* required */ onChange={handleChange}>
          <option selected disabled>--Select--</option>
          {STATUS_OPTIONS.map( (text, index) => {
            return <option id={"option_" + index} key={index} value={index}>{text}</option>
          })}
      </select>
    </div>

    <div className="new-field">
      <label htmlFor="time-together">Together since...</label>
      <input name="date" id="date" type="date" max={limitDate} onChange={handleChange} /* required */></input>
    </div>

    <div className="new-field ">
        <label >Who will have the higher score? <spann style={{color: "red", opacity:"0.7"}}> (choose wisley) </spann></label>
          <div style={{display:"flex", justifyContent:"space-around"}}>

            <div className="form-winner-box">
              <label>Person 1</label>
              <input type="radio" name="winner" id="option1" value={1} onChange={handleChange} /* required *//>
            </div>
            <div className="form-winner-box">
              <label>Person 2</label>
              <input type="radio" name="winner" id="option2" value={2} onChange={handleChange} /* required *//>
              </div>

          </div>
    </div>

    <div className="new-field">
      <label htmlFor="gap">How big the score difference should be?</label>
      <select name="gap" id="gap" onChange={handleChange} /* required */>
        <option disabled selected></option>
        {VICTORY_LEVELS.map( (element, index) => <option key={index} value={index}>{element}</option>)}
      </select>
    </div>

    <button type="submit" disabled={isConfirm || isFinalScreen}  className="button">Submit</button>

  </form>

  {isConfirm &&
    <div className="full-box-background">
      <div className="confirm">
        <h1>Verify the information</h1>
        <h2>Evaluation requested for: <br/> <span className="confirmation-info-span">{data.firstName1 + " " + data.lastName1} ({data.sex1 === "0"? "male" : "female"}) & {data.firstName2 + " " + data.lastName2} ({data.sex2 === "0"? "male" : "female"}) </span> </h2>
        <h2>Relationship status:<br/> <span className="confirmation-info-span"> <i>{STATUS_OPTIONS[data.status]}</i> </span> </h2>
        <h2>Together since:<br/> <span className="confirmation-info-span">{data.date} </span> </h2>
        <h2>The result will be favorable to:<br/>  <span className="confirmation-info-span">  {data.winner === "1"? data.firstName1 + " " + data.lastName1 : data.firstName2 + " " + data.lastName2} </span></h2>
        <div style={{display:"flex", justifyContent: "space-around"}}>
            <button onClick={handleNext}>Confirm</button>
            <button onClick={() => { setIsConfirm(false)}}>Back to edit</button>
        </div>
      </div>
    </div>
  }

  {isFinalScreen &&
  
  <div className="full-box-background">
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
        <Link href={`/evaluate/${route}`}><h1 style={{ display: 'inline-block', verticalAlign: 'middle' }}>Check your results here! </h1> </Link>
        <Image src={copy} alt="copy" className="icon-share" style={{ display: 'inline-block', verticalAlign: 'middle'}} />
        <h2>Don't forget to share the link with your partner and those you want to see the evaluation.</h2>
        <h2>Buttons to share</h2>
      </div>
      }

    </div>
  </div>

  }
</>
)    
}