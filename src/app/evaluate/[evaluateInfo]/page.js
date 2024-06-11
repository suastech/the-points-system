"use client";

import { useState } from "react";
import { STATUS_OPTIONS } from '../../../../generalParameters';
import CryptoJS from "crypto-js";
import HackingEffect from "../components/HackingEffect";
import DisplayResults from "../components/DisplayResults";
import PeriodMenu from "../components/PeriodMenu";
import dataChartGenerator from "../components/dataChartGenerator";
import "../../styles/evaluate.css";
import validateUrl from "../components/validateUrl";
import { useRouter } from 'next/navigation';


export default function Evaluate({params}) {
  const [isWelcome, setIsWelcome] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false);
  const [dataBar, setDataBar] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const [valueMenuPeriod, setValueMenuPeriod] = useState(0);
  const [images, setImages] = useState({ image1: null, image2: null });
  const secret_key = "hola";
  const router = useRouter();

  
  const urlInfo = decodeURIComponent(params.evaluateInfo);
   
  function decrypt(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const decryptedData = decrypt(urlInfo, secret_key);

  const [dataObject, setDataObject] = useState( () => {
    const object = {
      gap: Number(decryptedData.substring(0, 1)),
      sex1: Number(decryptedData.substring(1, 2)),
      sex2: Number(decryptedData.substring(2, 3)),
      winner: Number(decryptedData.substring(3, 4)),
      status: Number(decryptedData.substring(4, 6)) > 0 && Number(decryptedData.substring(4, 6)) <= STATUS_OPTIONS.length ? STATUS_OPTIONS[Number(decryptedData.substring(4, 6))] : null,
      date: decryptedData.substring(6, 16),
      fn1length: Number(decryptedData.substring(16, 18)), 
      ln1length: Number(decryptedData.substring(18, 20)),
      fn2length: Number(decryptedData.substring(20, 22)),
      ln2length: Number(decryptedData.substring(22, 24))
      }
    object.firstName1= decryptedData.substring(24, 24 + object.fn1length),
    object.lastName1= decryptedData.substring(24 + object.fn1length, 24 + object.fn1length + object.ln1length),
    object.firstName2= decryptedData.substring(24 + object.fn1length + object.ln1length, 24 + object.fn1length + object.ln1length + object.fn2length),
    object.lastName2= decryptedData.substring(24 + object.fn1length + object.ln1length + object.fn2length)
    return object
  })

  if (!validateUrl(dataObject, STATUS_OPTIONS.length) ) {
    setTimeout(() => { 
      router.push('/');
    }, 2000);
    return (
      <div>Invalid link. Redirecting...</div>
  )}

  function activateResults() {
    const [newBarData, newLineData]  = dataChartGenerator(dataObject, valueMenuPeriod);
    setIsWelcome(false)
    setDataBar(newBarData);
    setDataLine(newLineData);
    setIsLoading(true);
  }

  // Manejador de cambio de archivo para las imágenes
  const handleImageChange = (e, person) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prevState => ({ ...prevState, [person]: file.name }));
    } else {
      setImages(prevState => ({ ...prevState, [person]: null }));
    }
  };

  return (
    <div className="page-content">

      {isWelcome && <>
        <div id="welcome-box-evluate">
          <p>
            The Points System generates an accurate assessment of the performance of the members of a relationship.
            The results are accurate, indisputable, definitive, and science-based.
          </p>
          <p>We received a request to conduct the analysis of:</p>
        </div>

        <div id="evaluate-information-screen">
          <h4 style={{textAlign:"center", fontSize:"25px"}}>{`${dataObject.firstName1} ${dataObject.lastName1}`} and {`${dataObject.firstName2} ${dataObject.lastName2}`}</h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'image1')}
            style={{ display: 'none' }}

          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'image2')}
            style={{ display: 'none' }}
          />

          <label>In a relationship since:</label>
          <h4>{dataObject.date}</h4>
          <label>Status of their relationship:</label>
          <h4>{dataObject.status}</h4>
          <label>Period to analyze:</label>
          <PeriodMenu date={dataObject.date} setValueMenuPeriod={setValueMenuPeriod} />
          <button onClick={activateResults}>See Result</button>
        </div>
      </>
      }

      {isLoading && <HackingEffect setIsLoading={setIsLoading} setShowResults={setShowResults}/>}

      {showResults && <DisplayResults
                  dataObject={dataObject}
                  dataBar={dataBar} dataLine={dataLine}
                  person1={dataObject.firstName1} person2={dataObject.firstName2}
                  valueMenuPeriod={valueMenuPeriod}
                  setShowResults={setShowResults}
                  setIsWelcome={setIsWelcome}
                 />}
    
    </div>
  )
}
