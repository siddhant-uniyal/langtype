import { useRef } from "react"
const useTimer = () => {
    
    const timer = useRef(0)

    const startTime = () => {

    }

    const incrementTime = () => {
        ++timer.current
    }

    const getTime = () => {
        return timer.current
    }

    const resetTime = () => {
        timer.current = 0
    }

    return {
        timer,
        startTime,
        incrementTime,
        getTime,
        resetTime
    }
}

export default useTimer