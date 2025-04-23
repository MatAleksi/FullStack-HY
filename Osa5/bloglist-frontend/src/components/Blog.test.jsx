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
  }
  const user = {
    username: 'testuser',
    name: 'Test User',
  }
  const mockHandlerLike = vi.fn()
  const mockHandlerRemove = vi.fn()

  test('title is rendered', () => {
    render(<Blog blog={blog} user={user} handleLike={mockHandlerLike} handleRemove={mockHandlerRemove} />)
    expect(screen.getByText('Test Title, Test Author')).toBeDefined()
  })
})