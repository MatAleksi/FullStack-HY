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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

  const addBlog = (blogObject) => {
    const returnedBlog = blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setAlert(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const logOut = () => (
    <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
      }
    }>logout</button>
  )

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
      <BlogForm createBlog ={addBlog}/>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App