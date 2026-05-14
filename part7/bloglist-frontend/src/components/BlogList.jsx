import { Link } from 'react-router-dom'

const BlogList = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} — {blog.author} — {blog.likes} likes
          </Link>
        </div>
      ))}

    </div>
  )
}

export default BlogList
