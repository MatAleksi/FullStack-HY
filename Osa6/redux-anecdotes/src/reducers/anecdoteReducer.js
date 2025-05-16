import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)
      return newState
    },
    add(state, action) {
      state.push(action.payload)
    },
    append(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { vote, add, append, set } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(set(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create({
      content: content,
      id: getId(),
      votes: 0
    })
    dispatch(append(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const anecdoteToVote = await anecdoteService.update(id, updatedAnecdote)
    dispatch(vote(anecdoteToVote.id))
  }
}

export default anecdoteSlice.reducer