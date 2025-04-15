"use client"

import React, { ChangeEvent, MouseEvent, Ref, useEffect, useRef, useState } from "react"

import { generateAlgo } from "../utils/generateAlgo"

let done = false
let len = 0
let time = 0
let i:NodeJS.Timeout
export default function Home() {
  const [link , setLink] = useState("")
  const timer = useRef(0)
  const index = useRef(0)
  const divTimer = useRef<HTMLDivElement>(null)
  const myref = useRef<HTMLPreElement>(null)
  // console.log(index)
  // useEffect(()=>{
  //   setInterval(() => {setTimer(prev => prev + 1)} , 1000)
  // } , [])

  useEffect(()=>{
    document.body.addEventListener("keydown" , handleKey)
    return (()=>{
      document.body.removeEventListener("keydown" , handleKey)
    })
  },[])

  const handleKey = (e : KeyboardEvent) => {
    // console.log(e.key)
    if(myref !== null && myref.current !== null && myref.current.textContent !== null){
      // console.log(myref.current.textContent[index])
      // console.log(document.getElementById(`${index.current}`)?.textContent)
      const key = e.key == "Enter" ? "\n" : e.key
      // if(key === myref.current.textContent[index]){
      if(key === document.getElementById(`${index.current}`)?.textContent){
        // console.log("ok")
        if(index.current == len - 1){
          clearInterval(i)
          if(document.getElementById("result") !== null){
            (document.getElementById("result") as HTMLElement).textContent = `CONGRATS , TIME TAKEN = ${timer.current} seconds`
          }
        }
        if(document.getElementById(`${index.current}`) !== null){
          (document.getElementById(`${index.current}`) as HTMLElement).style.color = "red"
        }
        // setIndex((prev) => prev + 1)
        if(document.getElementById(`${index.current}`)?.textContent == "\n"){
          index.current++
          while(document.getElementById(`${index.current}`)?.textContent == " ") index.current++;
        }
        else index.current++
      }
      else console.log("bad")
    }
  }
  
  const handleLink = (e : ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }
  const handleClick = async (e : MouseEvent<HTMLButtonElement>) => {
    if(done) return
    // i = setInterval(() => {setTimer(prev => prev + 1);++time} , 1000)
    i = setInterval(() => {
      ++timer.current;
      if(divTimer !== null && divTimer.current !== null){
        divTimer.current.textContent = String(timer.current)
      }
    } , 1000)
    console.log("CALLLLEDDD")
    // const res = "void twoPointer(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left < right) {"
    const res = "hello\n    bro"
    len = res.length
    if(myref !== null && myref.current !== null){
      myref.current.textContent = ""
      const l = res.split("")
      for(let i = 0 ; i < l.length ; ++i){
        const el = document.createElement("span")
        el.id = String(i)
        el.textContent = l[i]
        myref.current?.appendChild(el)
      }
      //   myref.current.appendChild = document.createElement("span" , {
      //       textContent : "hello"
      // })
      done = true
      // setIndex(0)
  }
}
  return <>
    <div id="timer" ref={divTimer}>{timer.current}</div>
    <div> ENTER ALGO :  </div>
    <input type="text" className="bg-white text-black" value={link} onChange={handleLink}></input>
    <button type="button" className="bg-white text-black" onClick={handleClick}>CLICK ME</button>
    {/* <div ref={myref} id="code"></div> */}
    <div>
      <pre ref={myref} className="bg-blue-800"></pre>
    </div>
    <div id="result"></div>
  </>
}
