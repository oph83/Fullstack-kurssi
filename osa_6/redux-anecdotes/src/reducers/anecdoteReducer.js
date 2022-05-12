import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
    state.push(action.payload)
    },
    setAnecdotes(state, action) {
    return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    const anecdoteToVote = anecdotes.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
    await anecdoteService.updateVote(id, votedAnecdote)
    .then(returnedAnecdote => {
      dispatch(setAnecdotes(anecdotes.map(anecdote => anecdote.id !== id ? anecdote : returnedAnecdote)))
    })
  }
}

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer