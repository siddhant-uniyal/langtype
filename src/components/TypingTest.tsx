import React, { useEffect, useRef, useState } from "react";
import {TypingTestProps } from "../types/types"
import useTimer from "@/hooks/useTimer";
import cn from "@/utils/cn";

const TypingTest = ({ data, handleFinish }: TypingTestProps) => {

  const timerDiv = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);
  const typed = useRef(false);
  const intervalId = useRef<NodeJS.Timeout>(null);
  const nline = useRef(0);


  const [ptr, setPtr] = useState(0);
  const [index, setIndex] = useState(0);

  const {timer , incrementTime , getTime , resetTime} = useTimer()

  useEffect(() => {
    document.addEventListener("keydown", handleType);
    const letterPos = document.getElementById(`${indexRef.current + ptr}`)?.getBoundingClientRect();
    const prePos = document.getElementById(`code-pre`)?.getBoundingClientRect();
    if(letterPos && prePos){
      const nx = letterPos.x - prePos.x
      const ny = letterPos.y - prePos.y
      console.log(nx , ny)
      if(caretRef.current){
        caretRef.current.style.left = `${String(Math.round(nx))}px`
        caretRef.current.style.top = `${String(Math.round(ny))}px`
      }
    }
  }, []);

  useEffect(() => {
      console.log(indexRef.current)
      const letterPos = document.getElementById(`${indexRef.current}`)?.getBoundingClientRect();
      const prePos = document.getElementById(`code-pre`)?.getBoundingClientRect();
      console.log(prePos);
      if(letterPos && prePos){
        const nx = letterPos.x - prePos.x
        const ny = letterPos.y - prePos.y
        console.log(nx , ny)
        if(caretRef.current){
          caretRef.current.style.left = `${String(Math.round(nx))}px`
          caretRef.current.style.top = `${String(Math.round(ny))}px`
        }
      }
  } , [index])

  const handleType = async(e: KeyboardEvent) => {
    // e.preventDefault();
    if (!typed.current && e.key === data.charAt(0)) {
      typed.current = true;
      intervalId.current = setInterval(() => {
        incrementTime();
        if (timerDiv && timerDiv.current) {
          timerDiv.current.textContent = String(getTime());
        }
      }, 1000);
    }
    const key = e.key === "Enter" ? "\n" : e.key;
    console.log(key);
    if (key === data.charAt(indexRef.current)) {
      if (key == "\n") {
        ++nline.current;
        if (nline.current % 8 === 0) {
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
    } else {
      const letter = document.getElementById(String(index))?.textContent;
      console.log(letter);
      console.log("bad");
    }
  };
  
  return (
    <div id="test" className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500 pl-4">
      <div ref={timerDiv} id="timer" className="text-4xl text-yellow-400 border-red-600">{getTime()}</div>
      <pre id="code-pre" className="text-[4vh] overflow-hidden border-purple-600 relative">
        {/* <span ref={caretRef} id="caret" className={("caret-class absolute h-[4vh] left-0 top-0") + (!typed.current ? " blink-animation" : "")}></span> */}
        <span ref={caretRef} id="caret" className={cn("caret-class absolute h-[4vh] left-0 top-0", !typed.current && "blink-animation")}></span>
        {data.slice(ptr).split("").map((el, idx) => {
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
