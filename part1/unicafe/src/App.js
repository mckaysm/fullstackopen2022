import { useState } from 'react'



const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = (good * 1 + bad * -1) / all
  const positive = good / all * 100
  if (good || bad || neutral) 
  {
    return (
      <table>
        <tbody>
        <StatisticsLine text='Good' value={good}/>
        <StatisticsLine text='Neutral' value={neutral}/>
        <StatisticsLine text='Bad' value={bad}/>
        <StatisticsLine text='All' value={all}/>
        <StatisticsLine text='Average' value={average}/>
        <StatisticsLine text='Positive' value={positive}/>
        </tbody>
      </table>
    )
  }
  return (
    <p>No feedback given</p>
  )
}

const StatisticsLine = ({text, value}) => {
  return <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => {setGood(good + 1)}} text='Good'/>
      <Button onClick={() => {setNeutral(neutral + 1)}} text='Neutral'/>
      <Button onClick={() => {setBad(bad + 1)}} text='Bad'/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App