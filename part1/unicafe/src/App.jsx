import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(

      <button onClick={onClick}>
        {text}
      </button>
  
  )
}

const StatisticLine = ({text, value}) => {
    return (
      <p> {text} : {value} </p>
    )
  }

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total) * 100
  const positivePercentage = `${positive} %`
  
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }else {
    return (
      <div>
        <StatisticLine text="Good" value={good}/>
        <StatisticLine text="Neutral" value={neutral}/>
        <StatisticLine text="Bad" value={bad}/>
        <StatisticLine text="Total" value={total}/>
        <StatisticLine text="Average" value={average}/>
        <StatisticLine text="Positive" value={positivePercentage}/>

      </div>
    )
  
}
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <h2>Give feedback</h2>

      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />

      <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App