import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
  )
}

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ anecdotes, filter }) => {
      return anecdotes.filter(a => a.content.toString().toLowerCase().includes(filter.toLowerCase()))
    })
  const sortedAnecdotes = [...anecdotes].sort(function (a, b) {
    return b.votes - a.votes
  })

  return(
    <div>
    {sortedAnecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          {dispatch(vote(anecdote.id)); dispatch(setNotification(`you voted '${anecdote.content}'`, 5000))}
        }
      />
    )}
  </div>
  )
}

export default AnecdotesList