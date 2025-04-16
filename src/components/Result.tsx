import { ResultsType } from '@/types/types'
import React from 'react'

const Result = ({size , time} : ResultsType) => {
    console.log(size , time)
  return (
    <div>Result : {size} {time}</div>
  )
}

export default Result