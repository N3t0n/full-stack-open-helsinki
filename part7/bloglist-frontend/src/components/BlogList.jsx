import { Link } from 'react-router-dom'

const BlogList = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      <h2>Blogs</h2>

      {blogs.map(blog => (
        <div key={blog.id}>
          <ul>
            <li>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} — {blog.author} — {blog.likes} likes
              </Link>
            </li>
          </ul>
        </div>
      ))}

    </div>
  )
}

export default BlogList
