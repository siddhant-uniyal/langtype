import { InputScreenProps } from '@/types/types'
import React, { useState } from 'react'
const InputScreen = ({handleStart} : InputScreenProps) => {
    const [algoInput , setAlgoInput] = useState("")

    const handleClick = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // const data = "hlass SegmentTree {\npublic:\n    int n;\n    vector<int> tree;\n    SegmentTree(vector<int> &a) {\n        n = a.size();\n        tree.resize(4 * n);\n        build(a, 0, 0, n - 1);\n    }\n    void build(vector<int> &a, int node, int start, int end) {\n        if (start == end) tree[node] = a[start];\n        else {\n            int mid = (start + end) / 2;\n            build(a, 2 * node + 1, start, mid);\n            build(a, 2 * node + 2, mid + 1, end);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        int p1 = query(2 * node + 1, start, mid, l, r);\n        int p2 = query(2 * node + 2, mid + 1, end, l, r);\n        return p1 + p2;\n    }\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) tree[node] = val;\n        else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) update(2 * node + 1, start, mid, idx, val);\n            else update(2 * node + 2, mid + 1, end, idx, val);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int l, int r) { return query(0, 0, n - 1, l, r); }\n    void update(int idx, int val) { update(0, 0, n - 1, idx, val); }\n};"
        // const data = "}\n    void build(vector<int> &a, int node, int start, int end) {\n        if (start == end) tree[node] = a[start];\n        else {\n            int mid = (start + end) / 2;\n            build(a, 2 * node + 1, start, mid);\n            build(a, 2 * node + 2, mid + 1, end);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int node, int start, int end, int l, int r) {\n        if (r < start || end < l) return 0;\n        if (l <= start && end <= r) return tree[node];\n        int mid = (start + end) / 2;\n        int p1 = query(2 * node + 1, start, mid, l, r);\n        int p2 = query(2 * node + 2, mid + 1, end, l, r);\n        return p1 + p2;\n    }\n    void update(int node, int start, int end, int idx, int val) {\n        if (start == end) tree[node] = val;\n        else {\n            int mid = (start + end) / 2;\n            if (start <= idx && idx <= mid) update(2 * node + 1, start, mid, idx, val);\n            else update(2 * node + 2, mid + 1, end, idx, val);\n            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];\n        }\n    }\n    int query(int l, int r) { return query(0, 0, n - 1, l, r); }\n    void update(int idx, int val) { update(0, 0, n - 1, idx, val); }\n};"
        const data = "hello\nbro\ntoday\ntomorrow"
        handleStart(data)
    }
    const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        setAlgoInput(e.target.value)
    }
    return (
        <div id="test" className="grow flex flex-col justify-center items-center gap-y-4 border border-red-300">
            <input type="text" value={algoInput} onChange={handleInput} placeholder="Enter algorithm..." className='bg-slate-500 text-black w-[50%] h-8 outline-none pl-2'></input>
            <button type="button" onClick={handleClick} className="bg-slate-500 text-black p-2 rounded-md hover:cursor-pointer hover:opacity-80">Click me</button>
        </div>
    )
}

export default InputScreen