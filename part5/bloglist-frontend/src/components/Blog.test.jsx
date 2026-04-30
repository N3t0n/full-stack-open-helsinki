import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Blog testing with Vitest',
    author: 'N3t0n',
    url: 'https://example.com',
    likes: 5,
    user: {
      username: 'Manolitor',
      name: 'Manolito Gafotas'
    },
  }

  const user = {
    username: 'Manolitor',
    name: 'Manolito Gafotas'
  }

  render(<Blog blog={blog} user={user} addLike={vi.fn()} removeBlog={vi.fn()}/>)

  const element = screen.getByText('Blog testing with Vitest N3t0n')
  expect(element).toBeDefined()
})