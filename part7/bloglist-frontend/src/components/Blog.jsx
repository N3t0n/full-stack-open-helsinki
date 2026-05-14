const Blog = ({ user, blog, addLike, removeBlog }) => {
  
  if (!blog) {
    return null
  }

  const isOwner = user && blog.user.username === user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div className="blogSummary">
        {blog.title} {blog.author}
      </div>
      <div className='blogDetails'>
        {blog.url} <br />
        {blog.likes} likes <button onClick={() => addLike(blog)}>like</button>
        <br />
        {blog.user.username}
      </div>
        {isOwner && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
    </div>

  )
}

export default Blog
