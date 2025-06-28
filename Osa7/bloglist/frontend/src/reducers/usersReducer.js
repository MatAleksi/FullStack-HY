import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    appendUser(state, action) {
      state.push(action.payload)
    },
  }
})

export const { setUsers, appendUser } = usersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await blogService.getUsers()
    dispatch(setUsers(users))
  }
}

export default usersSlice.reducer