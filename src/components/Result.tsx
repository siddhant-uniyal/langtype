import { ResultsType } from '@/types/types'
import React from 'react'

const Result = ({size , time} : ResultsType) => {
    console.log(size , time)
  return (
    <div className='flex-1'>
      <div>CPM : {Math.round(size/time)}</div>
      <div>Time : {time}</div>
    </div>
  )
}

export default Result