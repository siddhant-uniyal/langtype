import React, { useEffect, useRef, useState } from "react";
import {TypingTestProps } from "../types/types"
import useTimer from "@/hooks/useTimer";
import cn from "@/utils/cn";

const positionCaret = (index : number , caretRef : React.RefObject<HTMLSpanElement | null>) => {
    const letterPos = document.getElementById(`${index}`)?.getBoundingClientRect();
    const prePos = document.getElementById(`code-pre`)?.getBoundingClientRect();
    if(letterPos && prePos){
      const nx = letterPos.x - prePos.x
      const ny = letterPos.y - prePos.y
      if(caretRef.current){
        caretRef.current.style.transform = `translate(${Math.round(nx)}px,${Math.round(ny)}px)`
      }
    }
}

const threshold = 8

const TypingTest = ({ ogText , handleFinish }: TypingTestProps) => {

  const timerDiv = useRef<HTMLDivElement>(null);
  const typingDiv = useRef<HTMLPreElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const intervalId = useRef<NodeJS.Timeout>(null);
  const nline = useRef(0);

  const [ptr, setPtr] = useState(0);
  const [index, setIndex] = useState(0);
  const [currText , setCurrText] = useState(ogText);
  const {timer , incrementTime , getTime , resetTime} = useTimer()

  useEffect(() => {
    typingDiv.current?.focus()
  }, []);

  useEffect(() => {
      positionCaret(index , caretRef)
  } , [index])

  const handleType = async(e: React.KeyboardEvent<HTMLPreElement>) => {

    if(e.key === "Tab" || e.key === "/"){
      e.preventDefault()
      if(e.key === "Tab"){
        return
      }
    }

    if(e.key.length > 1 && !(e.key === "Backspace" || e.key === "Enter")){
      return
    }

    if(e.key === "Backspace" && index > 0){
      if(currText.slice(0 , index) === ogText.slice(0 , index)) return
      const ncurrText = currText.slice(0 , index - 1) + currText.slice(index)
      setCurrText(ncurrText)
      setIndex(index - 1)
      return
    }

    if (index === 0 && e.key === ogText.charAt(0)) {
      intervalId.current = setInterval(() => {
        incrementTime();
        if(timerDiv && timerDiv.current) {
          timerDiv.current.textContent = String(getTime());
        }
      }, 1000);
    }

    const key = e.key === "Enter" ? "\n" : e.key;

    if (key === ogText.charAt(index) && currText.slice(0 , index) === ogText.slice(0 , index)) {
      let currInd = index;
      if (key == "\n") {
        ++nline.current;
        if (nline.current % threshold === 0) {
          setPtr(index + 1);
        }
        ++currInd;
        while (currText.charAt(currInd) === " "){
          ++currInd
        }
      } else ++currInd

      setIndex(currInd)

      if (currInd === ogText.length && currText === ogText) {
        clearInterval(intervalId.current as NodeJS.Timeout);
        setIndex(0);
        if (timerDiv && timerDiv.current) {
          timerDiv.current.textContent = "0";
        }
        handleFinish({ size: ogText.length, time: getTime() });
      }
    } else if(key.length === 1){
      setCurrText(currText.slice(0 , index) + key + currText.slice(index))
      setIndex(index + 1)
    }
  };
  
  return (
    <div id="test" className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500 pl-4">
      <div ref={timerDiv} id="timer" className="text-4xl text-yellow-400 border-red-600">{getTime()}</div>
        <pre ref={typingDiv} tabIndex={0} onKeyDown={handleType} id="code-pre" className="text-[4vh] overflow-hidden border-purple-600 relative">
          <span ref={caretRef} id="caret" className={cn("caret-class absolute h-[4vh] left-0 top-0", (index === 0) && "blink-animation")}></span>
          {currText.slice(ptr).split("").map((el, idx) => {
              return (
                <span key={idx + ptr} id={String(idx+ptr)} className={(idx + ptr >= index ? "muted" : (currText.slice(0 , idx + ptr + 1) === ogText.slice(0 , idx + ptr + 1) ? "correct-letter" : "incorrect-letter"))}>
                  {el}
                </span> 
              )
            })}
        </pre>
    </div>
  );
};

export default TypingTest;
