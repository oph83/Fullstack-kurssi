const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Test1',
    author: 'Test Guy',
    url: 'www.test.com',
    likes: 1,
  },
  {
    title: 'Test2',
    author: 'Test Guy2',
    url: 'www.test2.com',
    likes: 2
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}