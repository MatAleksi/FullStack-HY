import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('')  
    const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
        title: title,
        author: author,
        url: url
    })

    setTitle('')
    setAuthor('')   
    setUrl('')
  }

  const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

  return (
    <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateBlogVisible(!createBlogVisible)}>create</button>
        </div>
        <div style={showWhenVisible}>
            <div>
            <h2>Create a new blog</h2>

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
            </div>
        </div>
    </div>
  )
}

export default BlogForm