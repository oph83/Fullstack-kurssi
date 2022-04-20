const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let auth
beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({
    username: 'test',
    passwordHash
  })
  await user.save()

  const response = await api
    .post('/api/login/')
    .send({
      username: 'test',
      password: 'salasana'
    })

  auth = response.body.token
})

describe('some blogs tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('_id is named id', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(b => b.id)

    expect(contents).toBeDefined()
  })

  test('get blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('blogs', () => {
  test('blog added', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Test Guy',
      url: 'www.test.com',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${auth}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('Test title')
  })

  test('cant add blog without token', async () => {
    const newBlog = {
      title: 'Test title',
      author: 'Test Guy',
      url: 'www.test.com',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', 'bearer fakeToken')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain(
      'Test title'
    )
  })

  test('fails without all data', async () => {
    const newBlog = {
      author: 'Test Guy'
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${auth}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Likes defaults to zero', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Test Guy',
      url: 'www.test.com',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${auth}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[2].likes).toBe(0)
  })

  test('Delete blog', async () => {
    const newBlog = {
      title: 'Test',
      author: 'Test Guy',
      url: 'www.test.com',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${auth}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[2]
    console.log(blogToDelete)


    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${auth}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('update', () => {
  test('updatate a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `bearer ${auth}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).not.toEqual(blogToUpdate)
  })
})

describe('users', () => {
  test('new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test2',
      name: 'test guy2',
      password: 'salasana2',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('username needs to be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'test guy',
      password: 'test',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('fails if user is invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'test',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})