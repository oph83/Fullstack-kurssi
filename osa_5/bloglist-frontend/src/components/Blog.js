import { useState } from 'react'

const Blog = ({ blog, like, removeButton, user }) => {
  const [viewBlog, setViewBlog] = useState(true)

  const toggleBlog = () => {
    setViewBlog(!viewBlog)
  }

  return (
    <div className='blog'>
      { viewBlog ?
        <div>
          {blog.title} {blog.author} <button id='view-button' onClick={toggleBlog}>view</button>
        </div> :
        <div>
          <button id='hide-button' onClick={toggleBlog}>hide</button>
          <p>title: {blog.title}</p>
          <p>author: {blog.author}</p>
          <p>url: {blog.url}</p>
          <p>likes: {blog.likes} <button id='like-button' onClick={like}>like</button></p>
          <p>added by: {blog.user.name}</p>
          {user.username === blog.user.username ?
            <button id='remove-button' onClick={removeButton}>remove</button>
            : null
          }
        </div>
      }
    </div>
  )}

export default Blog