import { useState, useEffect, createRef } from 'react'

import Login from './components/Login'
import Blog from './components/Blog'
import NewBlog from './components/NewBlog'
import NewComment from './components/NewComment'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { set, setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog, commentBlog } from './reducers/blogReducer'
import { initializeUser, login, logOut } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams,
  useNavigate
} from 'react-router-dom'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Tab,
  styled,
  AppBar,
  Toolbar,
  Button,
  Box,
  Card,
} from '@mui/material'

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "white",
  },'&:nth-of-type(even)': {
    backgroundColor: "lightgrey",
  },
}))

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <StyledTableRow>
              <TableCell></TableCell>
              <TableCell><h3>blogs created</h3></TableCell>
            </StyledTableRow>
            {users.map(user => (
              <StyledTableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  <a>{user.blogs.length}</a>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
      <Card variant="outlined" sx={{ m:1, p:2 }}>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {user.blogs.map(blog => (
                <StyledTableRow key={blog.id}>{blog.title}</StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  )
}

const Blogs = ({ blogs }) => {
  const notify = (message = 'success') => {
    dispatch(setNotification(message))
  }
  const dispatch = useDispatch()

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <StyledTableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

  const handleComment = async (comment) => {
    console.log('comment', comment)
    dispatch(commentBlog(id, comment))
    dispatch(setNotification(`Comment added: ${comment}`))
  }

  const blog = blogs.find(b => b.id === id)
  if (!blog) {
    return <div>Loading...</div>
  }
  const checkOwnership = () => {
    console.log('blog', blog)
    if (blog.user.name !== user.name) {
      return false
    } else {
      return true
    }
  }
  return (
    <div>
      <Card variant="outlined" sx={{ m:1, p:2 }}>
        <h2>{blog.title} by {blog.author}</h2>
        <a href={`${blog.url}`}>{blog.url}</a>
        <p>{blog.likes} likes <Button variant="outlined" onClick={() => handleVote(blog)}>like</Button></p>
        <b>Added by {blog.user.name} </b>
        {checkOwnership() && (
          <Button variant="outlined" color="error" onClick={() => handleDelete(blog)}>remove</Button>
        )}
        <h3>comments</h3>
        <NewComment doCreate={handleComment} />
        <ul>
          {blog.comments.map((comment, id) => (
            <li key={id}>{comment}</li>
          ))}
        </ul>
      </Card>
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
      <Container maxWidth={false}>
        <div>
          <h2>Blogs</h2>
          <Notification/>
          <Login doLogin={handleLogin} />
        </div>
      </Container>
    )
  }
  return (
    <Container maxWidth={false}>
      <div>
        <h2>Blogs</h2>
        <Notification/>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" variant="outlined" sx={{ m:1 }} component={Link} to="/">blogs</Button>
              <Button color="inherit" variant="outlined" sx={{ m:1 }} component={Link} to="/users">users</Button>             
              <Box sx={{ flexGrow: 1 }} />
              Logged in as {user.name}
              <Button color="error" variant="contained" sx={{ m:1 }} onClick={handleLogout}>logout</Button>
            </Toolbar>
          </AppBar>
        </div>
        <Menu users={users} blogs={blogs} user={user} />
      </div>
    </Container>
  )
}

export default App
