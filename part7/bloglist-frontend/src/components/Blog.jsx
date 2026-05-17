import { Paper, Typography, Button, Box, Link } from '@mui/material'

const Blog = ({ user, blog, addLike, removeBlog }) => {
  
  if (!blog) {
    return null
  }

  const isOwner = user && blog.user.username === user.username


  return (

    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {blog.title}
      </Typography>

      <Typography variant="body1" color="text.secondary" gutterBottom>
        by {blog.author}
      </Typography>

      <Typography gutterBottom>
        <Link
          href={blog.url.startsWith('http') ? blog.url : `https://${blog.url}`}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {blog.url}
        </Link>
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography>
          {blog.likes} likes
        </Typography>

        {user && (
          <Button onClick={() => addLike(blog)}>like</Button>
        )}
      </Box>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        added by {blog.user.username}
      </Typography>

      {isOwner && (
        <Button variant="outlined" color="error" onClick={() => removeBlog(blog)}>
          remove
        </Button>
      )}
    </Paper>

  )
}

export default Blog
