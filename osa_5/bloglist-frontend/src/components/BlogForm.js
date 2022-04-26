import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = () => {
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={newTitle}
            onChange={handleTitleChange}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={newAuthor}
            onChange={handleAuthorChange}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={newUrl}
            onChange={handleUrlChange}
            placeholder='url'
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm