import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
     createAnecdote: (state, action) => {
        state.push(action.payload)
      },
    
      setAnecdotes: (state, action) => {
        return action.payload
      },
      replaceAnecdote: (state, action) => {
        const updatedAnecdote = action.payload
        return state.map(anecdote =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    }
  }
})

const { createAnecdote, setAnecdotes, replaceAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(votedAnecdote)
    dispatch(replaceAnecdote(updatedAnecdote))
  }
}


export default anecdoteSlice.reducer
