import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    lineHeight: 0.5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeClicked = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    addLike(updatedBlog) 
  }

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={likeClicked}>like</button></p>
          <p>{blog.user.name}</p>
        </div>
      )}
  </div>
)}

export default Blog