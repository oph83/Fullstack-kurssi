import React, { useState } from 'react'

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
       <h3>No feedback given</h3>
      </div>
    )
  }

  return (
    <div>
      <table>
        <tr>Statistics</tr>
        <tr><StatisticsLine name='good' value={props.good}/></tr>
        <tr><StatisticsLine name='neutral' value={props.neutral}/></tr>
        <tr><StatisticsLine name='bad' value={props.bad}/></tr>
        <tr><StatisticsLine name='all' value={props.all}/></tr>
        <tr><StatisticsLine name='average' value={props.average/props.all}/></tr>
        <tr><StatisticsLine name='positive' value={(props.good/props.all)*100} percent='%'/></tr>
      </table>
    </div>
  )
}

const StatisticsLine = props => <div>{props.name} {props.value} {props.percent}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(average + 0)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(average - 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button
        handleClick={handleGoodClick}
        text='good'
      />
      <Button
        handleClick={handleNeutralClick}
        text='neutral'
      />     
      <Button
        handleClick={handleBadClick}
        text='bad'
      /> 
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}/>          
    </div>
  )
}

export default App