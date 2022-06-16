import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { initializeBlogs, likeBlog, removeBlog, createComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = () => {
  const [comment, setComment] = useState('')
  const id = useParams().id

  const dispatch = useDispatch()

  const newComment = (event) => {
    event.preventDefault()
    const commentObject = ({
      comment: comment,
    })
    setComment('')
    dispatch(createComment(id, commentObject))
    dispatch(setNotification(`a new comment ${comment} added`, 5000))
  }

  return (
    <div>

      <form onSubmit={newComment}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id='comment'
          />
        </div>
        <button id="comment-button" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

const Blog = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.loggedUser)
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const like = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(likeBlog(likedBlog))
    dispatch(setNotification(`blog ${blog.title} liked`, 5000))
  }

  const removeButton = () => {
    if (window.confirm(`Delete ${blog.title}`) === true) {
      dispatch(removeBlog(id))
      dispatch(setNotification(`Deleted ${blog.title}`, 5000))
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <div>
        <h3>{blog.title}</h3>
        <p>author: {blog.author}</p>
        <p>likes: {blog.likes} <button id='like-button' onClick={like}>like</button></p>
        <p>added by: {blog.user.name}</p>
        {user.username === blog.user.username ?
          <button id='remove-button' onClick={removeButton}>remove</button>
          : null
        }
        <h3>comments:</h3>
        <CommentForm />
        {blog.comments.map(comments =>
          <li key={comments._id}>
            {comments.comment}
          </li>)}
      </div>
    </div>
  )
}

export default Blog