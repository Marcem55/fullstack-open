import { useState } from 'react'

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  border: '1px solid black',
  padding: '2px',
  margin: '6px',
}

const Blog = ({ blog, addLike, deleteBlog, allowDelete }) => {
  const [showDetails, setShowDetails] = useState()

  const handleLike = () => {
    addLike(blog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  return (
    <div
      style={
        showDetails
          ? { border: '1px solid black', padding: '2px', margin: '6px' }
          : containerStyles
      }
      data-testid="blog-div-test"
    >
      <p data-testid="blog-title-author">
        {blog.title} BY {blog.author}
      </p>
      {showDetails && (
        <div data-testid="hide-section">
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          {allowDelete && <button onClick={handleDelete}>remove</button>}
        </div>
      )}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
    </div>
  )
}

export default Blog
