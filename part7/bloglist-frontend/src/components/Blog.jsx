const Blog = ({ user, blog, addLike, removeBlog }) => {
  
  if (!blog) {
    return null
  }

  const isOwner = user && blog.user.username === user.username


  return (

    <div >
      <div className="blogSummary">
        <h1>{blog.author}: {blog.title}</h1>
      </div>
      <div className='blogDetails'>
        {blog.url} <br />
        {blog.likes} likes
        {user && (
          <button onClick={() => addLike(blog)}>like</button>
        )}
        <br />
        added by: {blog.user.username}
      </div>
        {isOwner && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
    </div>

  )
}

export default Blog
