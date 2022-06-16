import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

import loginService from './services/login'
import loggedUserService from './services/loggedUser'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { loginUser, logoutUser } from './reducers/loggedUserReducer'

import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams
} from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Blog app</h1>
    <p>This single page app is list of blogs</p>
  </div>
)

const Users = ({ users }) => (
  <div>
    <h1>Users</h1>
    <h3>blogs created</h3>
    <ul>
      {users.map(user => <li key={user.id}> <Link to={`/users/${user.id}`}>{user.name}</Link> {user.blogs.length}</li>)}
    </ul>

  </div>
)

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  console.log(user)
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

const Blogs = ({ user, blogFormRef }) => (
  <div>
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm blogFormRef={blogFormRef}/>
    </Togglable>
    <BlogList user={user}/>
  </div>
)


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const blogFormRef = useRef()

  const user = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const login = async (username, password) => {
    loginService.login({
      username, password,
    }).then(user => {
      loggedUserService.setUser(user)
      dispatch(loginUser(user))
      dispatch(setNotification(`${user.name} logged in!`, 5000))
    }).catch(() => {
      dispatch(setNotification('wrong username/password', 'alert', 5000))
    })
  }

  const logout = () => {
    dispatch(logoutUser())
    loggedUserService.clearUser()
    dispatch(setNotification('good bye!', 5000))
  }

  const padding = {
    padding: 5
  }

  if (user === null) {
    return <div className="container">
      <Notification/>
      <LoginForm onLogin={login} />
    </div>
  }

  return (
    <div className="container">

      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <p>{user.name} logged in <button id="logout-button" onClick={logout}>logout</button></p>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Notification/>

      <Routes>
        <Route path="/blogs" element={<Blogs user={user} blogFormRef={blogFormRef}/>} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={user ? <Users users={users}/> : <Navigate replace to="/login" />} />
        <Route path="/users/:id" element={user ? <User users={users}/> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginForm onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </div>
  )
}

export default App