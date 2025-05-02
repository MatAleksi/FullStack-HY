import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import login from './services/login'
import BlogForm from './components/BlogForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="alert">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState(null)
  const [updateState, setUpdateState] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [updateState])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setAlert(`Logged in as ${user.name}`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong password or username')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    console.log('luotu: ', returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setAlert(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setUpdateState(!updateState)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const updateLike = async (blogObject) => {
    try {
      console.log(blogObject)
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      const blogsUpdated = blogs.map(blog => blog.id !== blogObject.id ? blog : updatedBlog)
      setBlogs(blogsUpdated)
      setUpdateState(!updateState)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  const deleteBlog = async (blogObject) => {
    console.log('blogObject', blogObject)
    if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      try {
        const blogRemoved = await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setUpdateState(!updateState)
      } catch (error) {
        console.log('Error:', error)
      }
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">login</button>
    </form>
  )

  const logOut = () => (
    <button id="logoutButton" onClick={() => {
      setUser(null)
      window.localStorage.removeItem('loggedBloglistUser')
    }
    }>logout</button>
  )

  let bloglist = blogs.sort((a, b) => b.likes - a.likes)

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <Notification message={alert} />
        <h2>Log in to application</h2>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <Notification message={alert} />
      <h2>blogs</h2>
      <div>Logged in as {user.name} {logOut()}</div>
      <br></br>
      <BlogForm createBlog={addBlog}/>
      <br></br>
      {bloglist.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          addLike={updateLike}
          user={user}
          removeBlog={deleteBlog}/>
      )}
    </div>
  )
}

export default App