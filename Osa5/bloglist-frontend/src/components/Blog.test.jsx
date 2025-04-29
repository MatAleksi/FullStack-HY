import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'
import React from 'react'


describe('Blog tests', () => {
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
    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
  test('Creating blog works', async () => {
    const addBlog = vi.fn()
    const mouseClick = userEvent.setup()

    render(<BlogForm createBlog={addBlog}/>)

    const createButton = screen.getByText('create')
    await mouseClick.click(createButton)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const submit = screen.getByText('submit')

    await mouseClick.type(titleInput, 'Test Title2')
    await mouseClick.type(authorInput, 'Test Author2')
    await mouseClick.type(urlInput, 'http://testurl2.com')
    await mouseClick.click(submit)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Test Title2')
    expect(addBlog.mock.calls[0][0].author).toBe('Test Author2')
    expect(addBlog.mock.calls[0][0].url).toBe('http://testurl2.com')
  })
})