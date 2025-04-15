import React, { useEffect, useRef, useState } from 'react'
import Result from './result'
import Start from './start'
const spanWrap = (data : string , offset : number , caretIdx : number) => {
    const x =  data.split("").map((el , idx) => (idx === caretIdx ? `<span id="caret" class="caret-class"></span>` : ``) + `<span id="${idx + offset}" class="muted">${el}</span>`).join("")
    return x
}
const Test = () => {
    const [started , setStarted] = useState(false)
    const [finished , setFinished] = useState(false)
    const typed = useRef(false)
    const timer = useRef(0)
    const indexRef = useRef(0)
    const [index , setIndex] = useState(0)
    const nline = useRef(0)
    const [ptr , setPtr] = useState(0)
    const timerDiv = useRef<HTMLDivElement>(null)
    const intervalId = useRef<NodeJS.Timeout>(null)
    const data = "hello\nbro\ntoday\ntomorrow\n"
    // const data = "void twoPointer(int arr[], int n, int target) {\n    int left = 0, right = n - 1;\n    while (left < right) {"    const y = '<span id="caret" class="caret-class"></span>'
    // const data = "class SegmentTree {\npublic:\n    int n;\n    vector<int> tree;\n    SegmentTree(vector<int> &a) {\n        n = a.size();\n        tree.resize(4 * n);\n        build(a, 0, 0, n - 1);\n    }\n    void build(vector<int> &a, int node, int start, int end) {\n        if (start == end) tree[node] = a[start];\n        else {\n            int mid = (start + end) / 2;\n            build(a, 2 * node + 1, start, mid);\n            build(a, 2 * node + 2, mid + 1, end);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        int p1 = query(2 * node + 1, start, mid, l, r);\n        int p2 = query(2 * node + 2, mid + 1, end, l, r);\n        return p1 + p2;\n    }\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) tree[node] = val;\n        else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) update(2 * node + 1, start, mid, idx, val);\n            else update(2 * node + 2, mid + 1, end, idx, val);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int l, int r) { return query(0, 0, n - 1, l, r); }\n    void update(int idx, int val) { update(0, 0, n - 1, idx, val); }\n};"
    useEffect(()=>{
        if(!started) return
        document.addEventListener("keydown" , handleType)
    } , [started])

    const handleClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setStarted(true)
    }

    const handleType = (e : KeyboardEvent) => {
        if(!typed.current && e.key === data.charAt(0)){
            typed.current = true
            intervalId.current = setInterval(()=>{
                ++timer.current
                if(timerDiv && timerDiv.current){
                    timerDiv.current.textContent = String(timer.current)
                }
            } , 1000)
        }
        const key = e.key === "Enter" ? "\n" : e.key
        if(key === data.charAt(indexRef.current)){
            if(key == "\n"){
                ++nline.current
                if(nline.current%10 === 0){
                    setPtr(indexRef.current + 1)
                }
                ++indexRef.current
                while(data.charAt(indexRef.current) === " ") ++indexRef.current
            }
            else ++indexRef.current

            setIndex(indexRef.current)


            if(indexRef.current === data.length){
                clearInterval(intervalId.current as NodeJS.Timeout)
                setFinished(true)
                setIndex(0)
                timer.current = 0
                typed.current = false
                if(timerDiv && timerDiv.current){
                    timerDiv.current.textContent = "0"
                }
            }
        }
        else{
            const letter = document.getElementById(String(index))?.textContent
            console.log(letter)
            console.log("bad")
        }
    }

  return (
        <>
        {!started && !finished &&(
            <div id="test" className="grow flex flex-col justify-center items-center gap-y-4 border border-red-300">
                <input type="text" placeholder="Enter algorithm..." className='bg-slate-500 text-black w-[50%] h-8 outline-none pl-2'></input>
                <button type="button" onClick={handleClick} className="bg-slate-500 text-black p-2 rounded-md hover:cursor-pointer hover:opacity-80">Click me</button>
            </div>
            )
        }
        {started && !finished && (
            <div id="test" className="flex-1 min-h-0 flex flex-col gap-y-4 border-blue-500">
                <div ref={timerDiv} id="timer" className="text-4xl pl-4 text-yellow-400 border-red-600">{timer.current}</div> 
                <pre className='text-[4vh] overflow-hidden border-purple-600'>
                    {
                        data.slice(ptr).split("").map((el , idx)=>{
                        return(
                            <span key={idx}>
                                {idx + ptr === indexRef.current && <span id="caret" className ="caret-class"></span>}
                                <span id={String(idx + ptr)} className={idx + ptr >= indexRef.current ? "muted" : "correct-letter"}>{el}</span>
                            </span>
                        )
                    })  
                    }
                </pre>
            </div>
        )}
        
        {
            finished && (
                <Result size={data.length} time={timer.current}></Result>
            )
        }

        </>
  )
}

export default Test