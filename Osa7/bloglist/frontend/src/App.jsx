import { useState, useEffect, createRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { use } from 'react'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const notify = (message = 'success') => {
    dispatch(setNotification(message))
  }

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      notify(`Welcome back, ${user.name}`)
    } catch (error) {
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
    setUser(null)
    storage.removeUser()
    notify(`Bye, ${user.name}!`)
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
