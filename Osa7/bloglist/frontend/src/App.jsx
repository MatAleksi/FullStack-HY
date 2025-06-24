import { useState, useEffect, createRef } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, login, logOut } from './reducers/userReducer'

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  const blogFormRef = createRef()

  const notify = (message = 'success') => {
    dispatch(setNotification(message))
  }

  const handleLogin = async (credentials) => {
    try {
      dispatch(login(credentials))
      notify(`Welcome back, ${credentials.username}`)
    } catch (error) {
      console.error('Login failed:', error)
      notify('Wrong credentials')
    }
  }

  const handleCreate = async (blog) => {
    dispatch(addBlog(blog))
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    dispatch(initializeBlogs())
    blogFormRef.current.toggleVisibility()
  }

  const handleVote = async (blog) => {
    dispatch(likeBlog(blog.id))
    notify(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleLogout = () => {
    notify(`Bye, ${user.name}!`)
    dispatch(logOut())
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification/>
        <Login doLogin={handleLogin} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog doCreate={handleCreate} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default App
