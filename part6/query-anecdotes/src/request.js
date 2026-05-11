
const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }
  return response.json()
}

export const createAnecdote = async (content) => {
  const requirements = content.length >= 5

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ content, votes: 0 })
  }
  if (!requirements) {
    throw new Error('Anecdote must be at least 5 characters long')
  }
  const response = await fetch(baseUrl, options)
  if (!response.ok) {
    throw new Error('Failed to create anecdote')
  }
  return await response.json()
}


export const voteAnecdote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 })
  }
  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
  if (!response.ok) {
    throw new Error('Failed to vote anecdote')
  }
  return await response.json()
}