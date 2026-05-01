import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog  
  
  beforeEach(() => {
    blog = {
      title: 'Blog testing with Vitest',
      author: 'N3t0n',
      url: 'https://example.com',
      likes: 5,
      user: {
        username: 'Manolito',
        name: 'Manolito Gafotas',
      }
    }
  })

test('Test Exercise 5.13', () => {
  
  render(<Blog blog={blog} user={blog.user} />)

  const summary = screen.getByText('Blog testing with Vitest N3t0n')
  expect(summary).toBeVisible()

  const details = document.querySelector('.blogDetails')
  expect(details).not.toBeVisible()
  expect(details).toHaveTextContent('https://example.com')
  expect(details).toHaveTextContent('5 likes')
})

test('Test Exercise 5.14', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={blog.user}/>)
  
  const user = userEvent.setup()
  const button = screen.getByText('view')
  const details = document.querySelector('.blogDetails')

  expect(details).not.toBeVisible()

  await user.click(button)

  expect(details).toBeVisible()
  expect(details).toHaveTextContent('https://example.com')
  expect(details).toHaveTextContent('5 likes')
})

})