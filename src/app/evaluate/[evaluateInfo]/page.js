"use client";

import { useState } from "react";
import Image from "next/image";
import { STATUS_OPTIONS } from '../../../../generalParameters';
import CryptoJS from "crypto-js";
import HackingEffect from "../components/HackingEffect";
import DisplayResults from "../components/DisplayResults";
import PeriodMenu from "../components/PeriodMenu";
import dataChartGenerator from "../components/dataChartGenerator";
import "../../styles/evaluate.css";
import validateUrl from "../components/validateUrl";
import { useRouter } from 'next/navigation';
import addImage from '../../images/add-image.png'
import remove from '../../images/remove.png'

export default function Evaluate({params}) {
  const [isWelcome, setIsWelcome] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dataBar, setDataBar] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const [valueMenuPeriod, setValueMenuPeriod] = useState(0);
  const [images, setImages] = useState({ image1: null, image2: null });
  const secret_key = "hola";
  const router = useRouter();  
  const urlInfo = decodeURIComponent(params.evaluateInfo);
  const [numPersons, setNumPersons]= useState([0,0]);

  function decrypt(encryptedData, secretKey) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  const decryptedData = decrypt(urlInfo, secret_key);
  const [dataObject, setDataObject] = useState( () => {
    const fn1length = Number(decryptedData.substring(16, 18))
    const ln1length = Number(decryptedData.substring(18, 20))
    const fn2length = Number(decryptedData.substring(20, 22))
    const ln2length = Number(decryptedData.substring(22, 24))
    const object = {
      gap: Number(decryptedData.substring(0, 1)),
      sex1: Number(decryptedData.substring(1, 2)),
      sex2: Number(decryptedData.substring(2, 3)),
      winner: Number(decryptedData.substring(3, 4)),
      status: Number(decryptedData.substring(4, 6)) > -1 && Number(decryptedData.substring(4, 6)) <= STATUS_OPTIONS.length ? STATUS_OPTIONS[Number(decryptedData.substring(4, 6))] : null,
      date: decryptedData.substring(6, 16),
      firstName1: decryptedData.substring(24, 24 + fn1length),
      lastName1: decryptedData.substring(24 + fn1length, 24 + fn1length + ln1length),
      firstName2: decryptedData.substring(24 + fn1length + ln1length, 24 + fn1length + ln1length + fn2length),
      lastName2: decryptedData.substring(24 + fn1length + ln1length + fn2length)
      }
    return object
  })

  if (!validateUrl(dataObject, STATUS_OPTIONS.length) ) {
    setTimeout(() => { router.push('/')}, 2000);
    return (<div>Invalid link. Redirecting...</div>
    )};

  function activateResults() {
    const [newBarData, newLineData]  = dataChartGenerator(dataObject, valueMenuPeriod);
    setIsWelcome(false)
    setDataBar(newBarData);
    setDataLine(newLineData);
    //setIsLoading(true); //Uncomment this line
    setShowResults(true) //Erase this line
  }

  const handleImageChange = (e, person) => {
    const file = e.target.files[0];
    if (file) {
      setImages(prevState => ({ ...prevState, [person]: file }));
    }
  };

  const removePhoto = (index) => {
    const newObject = {...images}
    newObject[`image${index}`] = null;
    setImages(newObject)
  }

  return (
    <div className="page-content">

      {isWelcome &&
      <>
        <div id="welcome-box-evluate">
          <p>
            The Points System generates an accurate assessment of the performance of the members of a relationship.
            The results are accurate, indisputable, definitive, and science-based.
          </p>
        </div>

        <div id="evaluate-information-screen">
         <h4 style={{textAlign:"center", fontSize:"25px"}}>{`${dataObject.firstName1} ${dataObject.lastName1}`} & {`${dataObject.firstName2} ${dataObject.lastName2}`}</h4>
        
         <div className="add-photos-space">
          {numPersons.map( (element, index) => {
            return(
            <div className="add-photo-item" key={index}>
              <label htmlFor={`fileInput${index+1}`} className="custom-file-label">
                <p>Add Photo</p>
                <Image className="add-photo-image"
                    src={images[`image${index+1}`] === null? addImage: URL.createObjectURL(images[`image${index+1}`])}
                    alt="add-image"
                    width={40}
                    height={40}
                />
              </label>
              <input
                type="file"
                id={`fileInput${index+1}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, `image${index+1}`)}
                style={{ display: 'none' }}
               />

              {images[`image${index+1}`] !== null && 
              <Image className="remove-photo"
                     src={remove} alt="remove"
                     title="Remove Photo"
                     onClick={() => {
                      removePhoto(index + 1);
                    }}
                     />
              }

            </div>
            )
            })
          }

         </div>

         <label className="evaluate-information-label">In a relationship since:</label>
         <h4>{dataObject.date}</h4>
         <label className="evaluate-information-label">Status:</label>
         <h4>{dataObject.status}</h4>
         <label className="evaluate-information-label">Period to analyze:</label>
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
                  images={images}
                 />}
    
    </div>
  )
}
