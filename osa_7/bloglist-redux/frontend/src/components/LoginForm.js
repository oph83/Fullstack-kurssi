import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </Form.Group>
        <Button variant="primary" id="login-button" type="submit">
          login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm