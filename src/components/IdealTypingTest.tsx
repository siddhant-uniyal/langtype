
import React, { useEffect, useRef, useState } from "react";
import {TypingTestProps } from "../types/types"
import useTimer from "@/hooks/useTimer";

const TypingTest = ({ data, handleFinish }: TypingTestProps) => {

  const {timer , incrementTime , getTime , resetTime} = useTimer()


    const positionCaret = () => {

    }

    const getIndex = () => {
        return 1
    }
    const handleKey = () => {

    }

    const startTimer = () => {

    }

    const handleTextAndIndex = () => {

    }
    const stopTimer = () => {

    }

  useEffect(() => {
    document.addEventListener("keydown", handleType);
    positionCaret();
  }, []);

  useEffect(() => {
    positionCaret()
  } , [])

  const handleType = async(e: KeyboardEvent) => {
    handleKey()
    startTimer()
    const key = e.key === "Enter" ? "\n" : e.key;
    if (key === data.charAt(getIndex())) {
       handleTextAndIndex();
      if (getIndex() === data.length) {
        stopTimer();
        handleFinish({ size: data.length, time: getTime() });
      }
    }   
};

  return (
    <div
      id="test"
      className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500 pl-4"
    >
      <div
        ref={timerDiv}
        id="timer"
        className="text-4xl text-yellow-400 border-red-600"
      >
        {getTime()}
      </div>
      <pre id="code-pre" className="text-[4vh] overflow-hidden border-purple-600 relative">
        <span ref={caretRef} id="caret" className={("caret-class absolute h-[4vh] left-0 top-0") + (!typed.current ? " blink-animation" : "")}></span>
        {data
          .slice(ptr)
          .split("")
          .map((el, idx) => {
            return (
              <span key={idx + ptr} id={String(idx+ptr)} className={(idx + ptr >= indexRef.current ? "muted" : "correct-letter")}>
                {el}
              </span> 
            )
          })}
      </pre>
    </div>
  );
};

export default TypingTest;
