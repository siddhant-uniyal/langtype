"use client"

import React, { ChangeEvent, MouseEvent, Ref, useEffect, useRef, useState } from "react"

import { generateAlgo } from "../utils/generateAlgo"

let done = false
let len = 0
let time = 0
let i:NodeJS.Timeout
export default function Home() {
  const [link , setLink] = useState("")
  const [timer , setTimer] = useState(0)
  // const [index , setIndex] = useState(0)
  let index = 0
  const myref = useRef<HTMLPreElement>(null)

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
    console.log(e.key)
    if(myref !== null && myref.current !== null && myref.current.textContent !== null){
      // console.log(myref.current.textContent[index])
      console.log(document.getElementById(`${index}`)?.textContent)
      const key = e.key == "Enter" ? "\n" : e.key
      // if(key === myref.current.textContent[index]){
      if(key === document.getElementById(`${index}`)?.textContent){
        console.log("ok")
        if(index == len - 1){
          clearInterval(i)
          if(document.getElementById("result") !== null){
            (document.getElementById("result") as HTMLElement).textContent = `CONGRATS , TIME TAKEN = ${time} seconds`
          }
        }
        if(document.getElementById(`${index}`) !== null){
          (document.getElementById(`${index}`) as HTMLElement).style.color = "red"
        }
        // setIndex((prev) => prev + 1)
        if(document.getElementById(`${index}`)?.textContent == "\n"){
          ++index;
          while(document.getElementById(`${index}`)?.textContent == " ") ++index;
        }
        else ++index
      }
      else console.log("bad")
    }
  }
  
  const handleLink = (e : ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }
  const handleClick = async (e : MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if(done) return
    i = setInterval(() => {setTimer(prev => prev + 1);++time} , 1000)
    console.log("CALLLLEDDD")
    // const res = await generateAlgo("C++") as string 
    // const res = "```cpp\nclass SegmentTree {\npublic:\n    int n;\n    vector<int> tree;\n    SegmentTree(vector<int> &a) {\n        n = a.size();\n        tree.resize(4 * n);\n        build(a, 0, 0, n - 1);\n    }\n    void build(vector<int> &a, int node, int start, int end) {\n        if (start == end) tree[node] = a[start];\n        else {\n            int mid = (start + end) / 2;\n            build(a, 2 * node + 1, start, mid);\n            build(a, 2 * node + 2, mid + 1, end);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        int p1 = query(2 * node + 1, start, mid, l, r);\n        int p2 = query(2 * node + 2, mid + 1, end, l, r);\n        return p1 + p2;\n    }\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) tree[node] = val;\n        else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) update(2 * node + 1, start, mid, idx, val);\n            else update(2 * node + 2, mid + 1, end, idx, val);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int l, int r) { return query(0, 0, n - 1, l, r); }\n    void update(int idx, int val) { update(0, 0, n - 1, idx, val); }\n};\n```" 
    // const res = "class SegmentTree {\npublic:\n    int n;\n    vector<int> tree;\n    SegmentTree(vector<int> &a) {\n        n = a.size();\n        tree.resize(4 * n);\n        build(a, 0, 0, n - 1);\n    }\n    void build(vector<int> &a, int node, int start, int end) {\n        if (start == end) tree[node] = a[start];\n        else {\n            int mid = (start + end) / 2;\n            build(a, 2 * node + 1, start, mid);\n            build(a, 2 * node + 2, mid + 1, end);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        int p1 = query(2 * node + 1, start, mid, l, r);\n        int p2 = query(2 * node + 2, mid + 1, end, l, r);\n        return p1 + p2;\n    }\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) tree[node] = val;\n        else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) update(2 * node + 1, start, mid, idx, val);\n            else update(2 * node + 2, mid + 1, end, idx, val);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int l, int r) { return query(0, 0, n - 1, l, r); }\n    void update(int idx, int val) { update(0, 0, n - 1, idx, val); }\n};\n" 
    const res = "void twoPointer(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left < right) {"
    // \n        int sum = arr[left] + arr[right];\n        if (sum == target) {\n            // pair found\n            left++;\n            right--;\n        } else if (sum < target) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n}"
    // console.log(res)
    len = res.length
    if(myref !== null && myref.current !== null){
      // myref.current.textContent = res
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
  }
}
  return <>
    <div>{timer}</div>
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
