



const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = {
        title: title,
        author: author,
        url: url,
      }
      await blogService.create(blog)
      setAlert(`A new blog ${title} by ${author} added`)
      setTimeout(() => {
        setAlert(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Something went wrong')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
}

const blogForm = (props) => {
    return (
        <form onSubmit={addBlog}>
        <div>
            title
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            />
        </div>
        <div>
            author
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
            url
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <button type="submit">create</button>
        </form>      
    )
}

export default blogForm