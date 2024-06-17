"use client";

import { useEffect, useState } from "react";
import { HACKING_PHRASES } from "../../../../generalParameters";
import "../../styles/HackingEffect.css";
import "../../styles/LoadingEffect.css";


export default function HackingEffect({ setIsLoading, setShowResults }) {
  const numberOfLinesToShow = 25;
  const speedChange = 100;
  const [codeLines, setCodeLines] = useState(Array(numberOfLinesToShow).fill(''));
  const [counter, setCounter] = useState(1);
  const [extension, setExtension] = useState([".jpg", ".mp3", "mpg"]);
  const numberStablePhrases = HACKING_PHRASES.length;
  const ratioPhrasesToLines = 10;
  const counterLimit = ratioPhrasesToLines * numberStablePhrases;
  const [indexHackingPhrase, setIndexHackingPhrase] = useState(0);

  useEffect(() => {    
    if (counter < counterLimit) {
      const timer = setTimeout(() => {
        if (counter % ratioPhrasesToLines === 0) {
          setIndexHackingPhrase(prev => prev + 1);
        }
        setCounter(prev => prev + 1);

        let randomNumber = Math.random();
        let extension_index = randomNumber > 0.6 ? 0 : randomNumber > 0.3 ? 1 : 2;
        let str = '';
        let length_string = Math.floor(Math.random() * 31) + 30;
        for (let i = 0; i < length_string; i++) {
          let char = Math.floor(Math.random() * 58) + 65;
          str += String.fromCharCode(char);
        }
        const newLine = `c://${str}${extension[extension_index]}`;
        let newArray = [newLine, ...codeLines];
        let final = newArray.slice(0, newArray.length - 1);
        setCodeLines(final);
      }, speedChange);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setShowResults(true);
    }
  }, [counter, counterLimit, ratioPhrasesToLines, setIndexHackingPhrase, setCounter, setIsLoading, setShowResults, extension, codeLines]);

  return (
    <div className="full-box-background">
      <div id="hacking-effect">
        <h3>Getting your private information</h3>

        <div id="hacking-loading">
          <div className="progress" style={{"--progress": `${Math.round((counter / counterLimit) * 100)}%`}}>
            <div className="bar">
              <div className="progress-value"></div>
            </div>
            <div id="text-progress">
              {Math.round((counter / counterLimit) * 100)}%
            </div>
          </div>
        </div>

        <div id="stable-phrase">
          <h4>
            {HACKING_PHRASES[indexHackingPhrase]}...{" "}
            <span className="blink-effect"> / </span>{" "}
          </h4>
        </div>

        <div id="changing-lines">
          {codeLines.map((element, index) => (
            <p className="hack-line" key={index}>
              {element}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
