import { useState } from 'react'
import { TextField, Button, Box } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }
  return (
    <div>
      <h2>Add a new blog</h2>

      <Box component="form" onSubmit={addBlog} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <TextField
          label="Title"
          placeholder='title'
          value={newBlog.title}
          onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          margin="normal"
        />
        <TextField
          label="Author"
          placeholder='author'
          value={newBlog.author}
          onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          margin="normal"
        />
        <TextField
          label="URL"
          placeholder='url'
          value={newBlog.url}
          onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          add blog
        </Button>
      </Box>
    </div>
  )
}

export default BlogForm
