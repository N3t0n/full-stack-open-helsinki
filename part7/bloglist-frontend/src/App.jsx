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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const blogFormRef = useRef()
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
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Do you want to remove blog "${blog.title}"?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
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

  const padding = {
    padding: 5
  }
  return (
    <>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/blogs">Blogs</Link>

        {user === null ? (
          
          <Link style={padding} to="/login">Login</Link>
        ) : (
          <>
            <Link style={padding} to="/create">Create</Link>
            <span style={padding}>{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        <Notification message={errorMessage} type="error" />
        <Notification message={successMessage} type="success" />
      </div>

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
    </>
  )
}

export default App
