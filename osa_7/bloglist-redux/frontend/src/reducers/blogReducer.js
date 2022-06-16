import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    setBlog(state, action) {
      const blog = action.payload

      return state.map(b => b.id === blog.id ? blog : b)
    }
  }
})

export const { appendBlog, setBlogs, setBlog, removedBlog } = blogSlice.actions

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch(setBlog(updatedBlog))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const createdBlog = await blogService.create(newBlog)
    dispatch(appendBlog(createdBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(initializeBlogs())
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createComment = (id, newObject) => {
  return async (dispatch) => {
    await blogService.newComment(id, newObject)
    dispatch(initializeBlogs())
  }
}

export default blogSlice.reducer