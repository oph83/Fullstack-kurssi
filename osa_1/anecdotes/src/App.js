import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.click}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients', 
  ]
  
  const [selected, setSelected] = useState(0)
  
  const randomAnecdotes = () => {
    const len = anecdotes.length;
    setSelected(Math.floor(Math.random() * len))
  }

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const setVoteAt = (value) => setVotes(value)
  const updateVote = (index) => {
    let copy = [...votes]
    copy[index] += 1
    console.log(copy)
    return copy
  }

  const clickVote = () => {
    setVoteAt(updateVote(selected))
  }

  const mostVotes = Math.max(...votes)
  const mostVotedAnecdote = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <h3>{anecdotes[selected]}</h3>
      <h3>Has {votes[selected]} votes</h3>
      <Button
        click={clickVote}
        text='Vote'
      />
      <Button
        click={randomAnecdotes}
        text='Next anecdote'
      />
      <h1>Anecdote with most votes</h1>
      <h3>{anecdotes[mostVotedAnecdote]}</h3>
      <h3>Has {mostVotes} votes</h3>
    </div>
  )
}

export default App