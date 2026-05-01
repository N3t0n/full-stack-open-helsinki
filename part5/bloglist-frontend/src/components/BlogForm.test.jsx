import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect, vi } from 'vitest'

test('Test Exercise 5.16', async () => {

    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')
    const sendButton = screen.getByText('add blog')

    await user.type(titleInput, 'Testing a form...')
    await user.type(authorInput, 'N3t0n')
    await user.type(urlInput, 'http://test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Testing a form...')
    expect(createBlog.mock.calls[0][0].author).toBe('N3t0n')
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com')
})
    