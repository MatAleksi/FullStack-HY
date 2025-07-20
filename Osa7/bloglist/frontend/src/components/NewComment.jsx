import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'

const NewComment = ({ doCreate }) => {
  const [comment, setComment] = useState('')

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate(comment)
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
            size="small"
          />
        </div>
        <Button variant="outlined" sx={{ marginTop:1 }} type="submit">add comment</Button>
      </form>
    </div>
  )
}

export default NewComment