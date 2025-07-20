import { useState } from 'react'
import { Button, TextField } from '@mui/material'

const Login = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <TextField
        label="Username"
        type="text"
        data-testid="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <p></p>
      <TextField
        label="Password"
        type="password"
        value={password}
        data-testid="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p></p>
      <Button type="submit" variant="contained" color="primary"> Login </Button>
    </form>
  )
}

export default Login
