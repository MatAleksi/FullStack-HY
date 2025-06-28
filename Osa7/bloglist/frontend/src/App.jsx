import { useState, useEffect, createRef } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { set, setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, login, logOut } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams,
  useNavigate
} from 'react-router-dom'
import { use } from 'react'

const Menu = ( { users, blogs, user } ) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Blogs blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogDetail blogs={blogs} user={user} />} />
        <Route path="/users/:id" element={<User users={users}/>} />
        <Route path="/users" element={<Users users={users}/>} />
      </Routes>
    </div>
  )
}

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                <a>{user.blogs.length}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  const notify = (message = 'success') => {
    dispatch(setNotification(message))
  }
  const dispatch = useDispatch()
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
    }
  }

  const handleVote = async (blog) => {
    dispatch(likeBlog(blog.id))
    notify(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleCreate = async (blog) => {
    dispatch(addBlog(blog))
    notify(`Blog created: ${blog.title}, ${blog.author}`)
    blogFormRef.current.toggleVisibility()
    setTimeout(() => {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }, 500)
  }

  const blogFormRef = createRef()

  return (
    <div>
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

const BlogDetail = ({ blogs, user }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const notify = (message = 'success') => {
    dispatch(setNotification(message))
  }

  const handleVote = async (blog) => {
    dispatch(likeBlog(blog.id))
    notify(`You liked ${blog.title} by ${blog.author}`)
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      notify(`Blog ${blog.title}, by ${blog.author} removed`)
      navigate('/')
      setTimeout(() => {
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
      }, 500)
    }
  }
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)
  if (!blog) {
    return <div>Loading...</div>
  }
  const checkOwnership = () => {
    console.log('blog.user', blog.user)
    console.log('user', user)
    if (blog.user.name !== user.name) {
      return false
    } else {
      return true
    }
  }
  return (
    <div>
      <h3>{blog.title} {blog.author}</h3>
      <a href={`${blog.url}`}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => handleVote(blog)}>like</button></p>
      <p>added by {blog.user.name}</p>
      {checkOwnership() && (
        <button onClick={() => handleDelete(blog)}>remove</button>
      )}
    </div>
  )
}

const App = () => {

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [])

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

  const handleLogout = () => {
    notify(`Bye, ${user.name}!`)
    dispatch(logOut())
  }

  const padding = {
    paddingRight: 5
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
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Menu users={users} blogs={blogs} user={user} />
    </div>
  )
}

export default App
