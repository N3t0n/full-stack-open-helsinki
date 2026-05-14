import { useState } from 'react'

const Blog = ({ user, blog, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)


  const handleVisibility = () => {
    setVisible(!visible)
  }

  const isOwner = user && blog.username === user.username

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
      <div className='blogDetails' style={{ display: visible ? '' : 'none' }}>
        {blog.url} <br />
        {blog.likes} likes <button onClick={() => addLike(blog)}>like</button>
        <br />
        {blog.user.username}
      </div>
      <button onClick={handleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
        {isOwner && (
          <button onClick={() => removeBlog(blog)}>remove</button>
        )}
    </div>

  )
}

export default Blog