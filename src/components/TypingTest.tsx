import React, { useEffect, useRef, useState } from "react";
import { ResultsType } from "../types/types"

type TypingTestProps = {
  data: string;
  handleFinish: ({ size, time }: ResultsType) => void;
};
const TypingTest = ({ data, handleFinish }: TypingTestProps) => {
  const timerDiv = useRef<HTMLDivElement>(null);
  const timer = useRef(0);
  const [ptr, setPtr] = useState(0);
  const indexRef = useRef(0);
  const typed = useRef(false);
  const intervalId = useRef<NodeJS.Timeout>(null);
  const nline = useRef(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.addEventListener("keydown", handleType);
  }, []);

  const handleType = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!typed.current && e.key === data.charAt(0)) {
      typed.current = true;
      intervalId.current = setInterval(() => {
        ++timer.current;
        if (timerDiv && timerDiv.current) {
          timerDiv.current.textContent = String(timer.current);
        }
      }, 1000);
    }
    const key = e.key === "Enter" ? "\n" : e.key;
    console.log(key);
    if (key === data.charAt(indexRef.current)) {
      if (key == "\n") {
        ++nline.current;
        if (nline.current % 10 === 0) {
          setPtr(indexRef.current + 1);
        }
        ++indexRef.current;
        while (data.charAt(indexRef.current) === " ") ++indexRef.current;
      } else ++indexRef.current;

      setIndex(indexRef.current);

      if (indexRef.current === data.length) {
        clearInterval(intervalId.current as NodeJS.Timeout);
        setIndex(0);
        timer.current = 0;
        typed.current = false;
        if (timerDiv && timerDiv.current) {
          timerDiv.current.textContent = "0";
        }
        handleFinish({ size: data.length, time: timer.current });
      }
    } else {
      const letter = document.getElementById(String(index))?.textContent;
      console.log(letter);
      console.log("bad");
    }
  };

  return (
    <div
      id="test"
      className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500"
    >
      <div
        ref={timerDiv}
        id="timer"
        className="text-4xl pl-4 text-yellow-400 border-red-600"
      >
        {timer.current}
      </div>
      <pre className="text-[4vh] overflow-hidden border-purple-600">
        {data
          .slice(ptr)
          .split("")
          .map((el, idx) => {
            // return (
            //   <span key={idx}>
            //     {idx + ptr === indexRef.current && (
            //       <span id="caret" className="caret-class"></span>
            //     )}
            //     <span
            //       id={String(idx + ptr)}
            //       className={
            //         idx + ptr >= indexRef.current ? "muted" : "correct-letter"
            //       }
            //     >
            //       {el}
            //     </span>
            //   </span>
            // );
            return (
              <span key={idx} id={String(idx+ptr)} className={idx + ptr >= indexRef.current ? "muted" : "correct-letter"}>
                {idx + ptr == indexRef.current && <span id="caret" className="caret-class"></span>}
                {el}
              </span> 
            )
          })}
      </pre>
    </div>
  );
};

export default TypingTest;
