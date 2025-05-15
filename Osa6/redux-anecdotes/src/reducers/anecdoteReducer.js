import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    },
    add(state, action) {
      const newAnecdote = action.payload
      anecdotesAtStart.push(newAnecdote)
      state.push({
        content: newAnecdote,
        id: getId(),
        votes: 0
      })
    },
    append(state, action) {
      state.push(action.payload)
    }
  }
})

export const { vote, add, append } = anecdoteSlice.actions
export default anecdoteSlice.reducer