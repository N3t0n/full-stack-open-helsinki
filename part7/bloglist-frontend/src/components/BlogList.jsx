import { Link } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'


const BlogList = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      <h2>Blogs</h2>

      {blogs.map(blog => (
        <Paper key={blog.id} sx={{ p: 2, mb: 2 }}>
          <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" gutterBottom>{blog.title}</Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            by {blog.author} • {blog.likes} likes
          </Typography>
        </Paper>
      ))}

    </div>
  )
}

export default BlogList
