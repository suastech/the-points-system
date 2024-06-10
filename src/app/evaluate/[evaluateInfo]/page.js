"use client";

import { useState } from "react";
import { STATUS_OPTIONS } from '../../../../generalParameters';
import HackingEffect from "../components/HackingEffect";
import DisplayResults from "../components/DisplayResults";
import PeriodMenu from "../components/PeriodMenu";
import dataChartGenerator from "../components/dataChartGenerator";
import "../../styles/evaluate.css";

export default function Evaluate({params}) {
  const [isWelcome, setIsWelcome] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false);
  const [dataBar, setDataBar] = useState([]);
  const [dataLine, setDataLine] = useState([]);
  const [valueMenuPeriod, setValueMenuPeriod] = useState(0)
  const urlInfo = decodeURI(params.evaluateInfo);
  const dataArray = urlInfo.split("-")
  
  const [dataObject, setDataObject] = useState({
    sex1: dataArray[0][0],
    sex2: dataArray[0][1],
    gap: Number(dataArray[1]),
    status: STATUS_OPTIONS[Number(dataArray[2])],
    date: dataArray[3].substring(0, 4) + "-" + dataArray[3].substring(4, 6) + "-" + dataArray[3].substring(6),
    winner: Number(dataArray[4]),
    firstName1: dataArray[5],
    lastName1: dataArray[6],
    firstName2: dataArray[7],
    lastName2: dataArray[8],
  }
  );

  function activateResults() {
    const [newBarData, newLineData]  = dataChartGenerator(dataObject, valueMenuPeriod);
    //While it loads, we get the arrays for the data.
    setIsWelcome(false)
    setDataBar(newBarData);
    setDataLine(newLineData);
    setIsLoading(true);
  }

  const [images, setImages] = useState({ image1: null, image2: null });

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
            The results we provide are accurate, rigorous and science-based.
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
  );
}
