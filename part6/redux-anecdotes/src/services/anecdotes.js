const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

 return await response.json()
}

const createNew = async content => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, votes: 0 }),
    })
    if (!response.ok) {
    throw new Error('Failed to create a new Anecdote ')
  }
  
  return await response.json()
}

export default { getAll, createNew }
