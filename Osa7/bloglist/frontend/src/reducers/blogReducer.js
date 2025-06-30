import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like(state, action) {
      const id = action.payload
      const blog = state.find(b => b.id === id)
      const likedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const newState = state.map(blog => blog.id !== id ? blog : likedBlog)
      newState.sort((a, b) => b.likes - a.likes)
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

export const { like, add, set, update, remove } = blogSlice.actions

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

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogService.get(id)
    const updatedBlog = {
      ...blog,
      likes: blog.likes +1
    }
    const blogToLike = await blogService.update(id, updatedBlog)
    dispatch(like(blogToLike.id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(remove(id))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blogWithComment = await blogService.postComment(id, comment)
    dispatch(update(blogWithComment))
  }
}

export default blogSlice.reducer