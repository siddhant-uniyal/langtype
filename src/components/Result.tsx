import React from 'react'

type ResultProps = {
    "size" : number,
    "time" : number
}
const Result = ({size , time} : ResultProps) => {
    console.log(size , time)
  return (
    <div>Result : {size} {time}</div>
  )
}

export default Result