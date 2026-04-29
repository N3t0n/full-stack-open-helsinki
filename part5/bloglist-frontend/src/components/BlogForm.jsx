const BlogForm = ({
  onSubmit,
  newBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <div>
      <h2>Add a new blog</h2>

      <form onSubmit={onSubmit}>
        <div>
          title
          <input
            value={newBlog.title}
            onChange={handleTitleChange}
          />
        </div>

        <div>
          author
          <input
            value={newBlog.author}
            onChange={handleAuthorChange}
          />
        </div>

        <div>
          url
          <input
            value={newBlog.url}
            onChange={handleUrlChange}
          />
        </div>

        <button type="submit">add blog</button>
      </form>
    </div>
  )
}

export default BlogForm
