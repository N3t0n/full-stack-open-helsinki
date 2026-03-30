import { useState } from 'react'

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = (props.good / total) * 100
  
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }else {
    return (
      <div>
        <p>Good: {props.good}</p>
        <p>Neutral: {props.neutral}</p>
        <p>Bad: {props.bad}</p>
        <p>Total: {total}</p>
        <p>Average: {average}</p>
        <p>Positive: {positive} %</p>
      </div>
    )
  
}
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>

      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>

      <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App