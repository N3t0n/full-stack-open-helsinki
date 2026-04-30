import { useState } from "react"

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => {
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (

    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <div style={{ display: visible ? '' : 'none' }}>
        {blog.url} <br />
        {blog.likes} likes <button>like</button><br />
        {blog.user.username}
      </div>
      <button onClick={handleVisibility}>
        {visible ? 'hide' : 'view'}
      </button>
    </div>

  )
}

export default Blog