import { useState } from 'react'
import PropTypes from 'prop-types'

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
      return <button id="removeButton" onClick={() => removeBlog(blog)}>remove</button>
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button id="viewButton" onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes} likes <button id="likeButton" onClick={likeClicked}>like</button></p>
          <p>{blog.user.name}</p>
          <div>
            {showRemove()}
          </div>
        </div>
      )}
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  user: PropTypes.object,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog