import { useState, useEffect, use } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })


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

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNewBlog({ title: '', author: '', url: '' })
    setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} was added`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }
  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
       <Notification message={errorMessage} type="error" />

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
    </div>
  )
  
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      <p>{user.name} logged-in</p>
      <button onClick={handleLogout}>logout</button>
      <div>
      <form onSubmit={handleAddBlog}>
        <h2>Add new blog</h2>
        <input type="text" placeholder="title" value={newBlog.title} onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })} />
        <input type="text" placeholder="author" value={newBlog.author} onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })} />
        <input type="text" placeholder="url" value={newBlog.url} onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })} />
        <button type="submit">add blog</button>
      </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  
  return (
    <div>
    
      {user === null ? loginForm() : blogList()}

    </div>
  )
}

export default App
