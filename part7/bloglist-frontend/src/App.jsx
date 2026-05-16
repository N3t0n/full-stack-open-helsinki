import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Home from './components/Home'
import BlogList from './components/BlogList'
import { Routes, Route, Link, useNavigate, useMatch, Navigate } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Box } from '@mui/material'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const navigate = useNavigate()

  const match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/blogs')
    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    navigate('/blogs')
  }
  useEffect(() => {
    const loggedUserJSON =
      window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleAddBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
    navigate('/blogs')
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to remove blog "${blog.title}"?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      navigate('/blogs')
    }
  }

  const loginView = () => (
    <LoginForm
      password={password}
      username={username}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handleSubmit={handleLogin}
    />
   
  )

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  

  const addLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    const returnedBlog = await blogService.update(blog.id, updatedBlog)

    setBlogs(blogs.map(b => b.id === blog.id ? returnedBlog : b))
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>

          {user !== null && (
            <Button color="inherit" component={Link} to="/create">
              Create
            </Button>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {user === null ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <span style={{ marginLeft: 10, marginRight: 10 }}>
                {user.username}
              </span>

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blogs"
          element={
            <BlogList
              blogs={sortedBlogs}
              user={user}
              onLike={addLike}
              onRemove={removeBlog}
            />
          }
        />
        <Route
          path="/create"
          element={
            user
              ? <BlogForm createBlog={handleAddBlog} />
              : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={loginView()} />
        <Route path="/blogs/:id" element={
          <Blog
            blog={blog}
            user={user}
            addLike={addLike}
            removeBlog={removeBlog}
          />
        } />
      </Routes>
    </Container>
  )
}

export default App
