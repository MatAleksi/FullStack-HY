import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

const NewBlog = ({ doCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          type="text"
          data-testid="title"
          value={title}
          onChange={handleTitleChange}
        />
        <p></p>
        <TextField
          label="URL"
          type="text"
          data-testid="url"
          value={url}
          onChange={handleUrlChange}
        />
        <p></p>
        <TextField
          label="Author"
          type="text"
          data-testid="author"
          value={author}
          onChange={handleAuthorChange}
        />
        <p></p>
        <Button type="submit" variant="contained">Create</Button>
        <p></p>
      </form>
    </div>
  )
}

export default NewBlog
