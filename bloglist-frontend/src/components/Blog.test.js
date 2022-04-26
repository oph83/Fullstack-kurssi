import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test',
    author: 'Test Guy'
  }

  render(<Blog blog={blog} />)

  const element = screen.findAllByText('Test Guy', 'Test')

  expect(element).toBeDefined()

})

test('get url and likes after button is pressed', async () => {
  const blog = {
    title: 'Test',
    author: 'Guy',
    url: 'www.eioo.com',
    likes: 0,
    user: {
      name: 'Keijo'
    },
  }
  const username = {
    user: {
      username : 'Keijo'
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleBlog={mockHandler} user={username}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const element = screen.findAllByText('www.eioo.com', 0)
  expect(element).toBeDefined()

})

test('likes are pressed twice', async () => {
  const blog = {
    title: 'Test',
    author: 'Guy',
    url: 'www.eioo.com',
    likes: 0,
    user: {
      name: 'Keijo'
    },
  }
  const username = {
    user: {
      username : 'Keijo'
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} toggleBlog={mockHandler} like={mockHandler} user={username}/>
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  const element = screen.findAllByText('www.eioo.com', 2)
  expect(mockHandler.mock.calls).toHaveLength(2)
  expect(element).toBeDefined()
})