import Blog from './Blog'

const BlogList = ({ blogs, user, onLike, onRemove }) => {
  return (
    <div>
      <h2>blogs</h2>

      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={onLike}
          removeBlog={onRemove}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
