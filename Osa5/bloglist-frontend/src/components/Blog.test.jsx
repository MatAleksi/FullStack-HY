import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import React from 'react'


describe('<Blog />', () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 0,
    user:{
      username: 'testuser',
      name: 'Test User',
    }
  }

  const user = {
    username: 'testuser',
    name: 'Test User',
  }

  const mockHandlerLike = vi.fn()
  const mockHandlerRemove = vi.fn()

  test('Title is rendered', () => {
    render(<Blog blog={blog} user={user} addLike={mockHandlerLike} removeBlog={mockHandlerRemove} />)
    expect(screen.getByText('Test Title, Test Author')).toBeDefined()
    expect(screen.queryByText('http://testurl.com')).toBeNull()
    expect(screen.queryByText('0 likes')).toBeNull()
  })

  test('Url and likes are rendered when the view button is clicked', async () => {
    const buttonClick = userEvent.setup()
    render(<Blog blog={blog} user={user} addLike={mockHandlerLike} removeBlog={mockHandlerRemove} />)
    const button = screen.getByText('view')
    await buttonClick.click(button)

    expect(screen.getByText('http://testurl.com')).toBeDefined()
    expect(screen.getByText('0 likes')).toBeDefined()
  })

  test('Like button adds likes', async () => {
    const buttonClick = userEvent.setup()
    render(<Blog blog={blog} user={user} addLike={mockHandlerLike} removeBlog={mockHandlerRemove} />)
    const button = screen.getByText('view')
    await buttonClick.click(button)

    const likeButton = screen.getByText('like')
    await buttonClick.click(likeButton)
    await buttonClick.click(likeButton)

    expect(screen.queryByText('2 likes')).toBeDefined()
  })
})