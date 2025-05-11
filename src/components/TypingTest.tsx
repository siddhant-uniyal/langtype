import React, { useEffect, useRef, useState } from "react";
import {TypingTestProps } from "../types/types"
import useTimer from "@/hooks/useTimer";
import cn from "@/utils/cn";

const positionCaret = (indexRef : React.RefObject<number> , caretRef : React.RefObject<HTMLSpanElement | null>) => {
    const letterPos = document.getElementById(`${indexRef.current}`)?.getBoundingClientRect();
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

const TypingTest = ({ data , handleFinish }: TypingTestProps) => {

  // console.log(data)

  const timerDiv = useRef<HTMLDivElement>(null);
  const typingDiv = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const typed = useRef(false);
  const intervalId = useRef<NodeJS.Timeout>(null);
  const nline = useRef(0);

  const [ptr, setPtr] = useState(0);
  const [index, setIndex] = useState(0);
  const [xdata , setData] = useState(data);
  const {timer , incrementTime , getTime , resetTime} = useTimer()

  useEffect(() => {
    typingDiv.current?.focus()
  }, []);

  useEffect(() => {
      positionCaret(indexRef , caretRef)
  } , [index])

  const handleType = async(e: React.KeyboardEvent<HTMLDivElement>) => {

    if(e.key === "Tab" || e.key === "/"){
      e.preventDefault()
      if(e.key === "Tab"){
        return
      }
    }

    if(e.key.length > 1 && !(e.key === "Backspace" || e.key === "Enter")){
      return
    }

    if(e.key === "Backspace" && indexRef.current > 0){
      console.log(indexRef.current)
      console.log(xdata)
      const ndata = xdata.slice(0 , indexRef.current - 1) + xdata.slice(indexRef.current)
      console.log(ndata);
      setData(ndata)
      --indexRef.current 
      setIndex(indexRef.current)
    }

    if (!typed.current && e.key === data.charAt(0)) {
      typed.current = true;
      intervalId.current = setInterval(() => {
        incrementTime();
        if(timerDiv && timerDiv.current) {
          timerDiv.current.textContent = String(getTime());
        }
      }, 1000);
    }
    const key = e.key === "Enter" ? "\n" : e.key;
    // console.log(key);

    if (key === data.charAt(indexRef.current)) {
      if (key == "\n") {
        ++nline.current;
        if (nline.current % threshold === 0) {
          setPtr(indexRef.current + 1);
        }
        ++indexRef.current;
        while (data.charAt(indexRef.current) === " ") ++indexRef.current;
      } else ++indexRef.current;

       setIndex(indexRef.current);

      if (indexRef.current === data.length) {
        clearInterval(intervalId.current as NodeJS.Timeout);
        setIndex(0);
        typed.current = false;
        if (timerDiv && timerDiv.current) {
          timerDiv.current.textContent = "0";
        }
        handleFinish({ size: data.length, time: getTime() });
      }
    } else if(key.length === 1){
      console.log("wrong key : " , e.key , "index : " , indexRef.current)
      setData(xdata.slice(0 , indexRef.current) + key + xdata.slice(indexRef.current))
      ++indexRef.current
      setIndex(indexRef.current)
    }
  };
  
  return (
    <div id="test" className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500 pl-4">
      <div ref={timerDiv} id="timer" className="text-4xl text-yellow-400 border-red-600">{getTime()}</div>
      <div ref={typingDiv} tabIndex={0} onKeyDown={handleType}>
      <pre id="code-pre" className="text-[4vh] overflow-hidden border-purple-600 relative">
        <span ref={caretRef} id="caret" className={cn("caret-class absolute h-[4vh] left-0 top-0", !typed.current && "blink-animation")}></span>
        {xdata.slice(ptr).split("").map((el, idx) => {
            return (
              <span key={idx + ptr} id={String(idx+ptr)} className={(idx + ptr >= indexRef.current ? "muted" : "correct-letter")}>
                {el}
              </span> 
            )
          })}
      </pre>
      </div>
    </div>
  );
};

export default TypingTest;
