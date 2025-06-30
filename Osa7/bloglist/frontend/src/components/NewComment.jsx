import React, { useState } from 'react'

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
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default NewComment