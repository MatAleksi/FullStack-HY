import { useState } from 'react'

const Blog = ({ blog, addLike, user, removeBlog }) => {
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

  const showRemove = () => {
    const blogToBeRemoved = blog
    if(user === undefined) {
      return null
    }
    console.log(user.username)
    console.log(blogToBeRemoved.user.username)
    if(blogToBeRemoved.user.username === user.username) {
      return <button onClick={() => removeBlog(blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div> 
        {blog.title}, {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button onClick={likeClicked}>like</button></p>
          <p>{blog.user.name}</p>
          <div>
          {showRemove()}
          </div>
        </div>
      )}
  </div>
)}

export default Blog