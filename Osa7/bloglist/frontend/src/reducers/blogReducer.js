import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const blog = state.find(b => b.id === id)
      const votedBlog = {
        ...blog,
        votes: blog.votes + 1
      }
      const newState = state.map(blog => blog.id !== id ? blog : votedBlog)
      newState.sort((a, b) => b.votes - a.votes)
      return newState
    },
    add(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    },
    update(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },
    remove(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }
  }
})

export const { vote, add, set, update, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const addBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create({
      title: content.title,
      author: content.author,
      url: content.url,
    })
    dispatch(add(newBlog))
  }
}

export const voteBlog = (id) => {

}

export const deleteBlog = (id) => {

}

export default blogSlice.reducer