import { Link } from 'react-router-dom'
import { Paper, Typography } from '@mui/material'


const BlogList = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Blogs
      </Typography>

      {blogs.map(blog => (
        <Paper
          key={blog.id}
          sx={{
            p: 2,
            mb: 2,
            transition: '0.2s ease',
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
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
