import { Box, Typography, Link } from '@mui/material'

const Home = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Typography variant="h3" gutterBottom>
        BlogList
      </Typography>

      <Typography variant="body1" paragraph>
        BlogList is a fullstack application built to put into practice the concepts
        covered throughout the{' '}
        <Link href="https://fullstackopen.com" target="_blank" rel="noopener noreferrer">
          Full Stack Open
        </Link>{' '}
        course. It brings together authentication, routing, protected actions,
        blog creation, detail views, and interaction with posts in a single project.
      </Typography>

      <Typography variant="body1" paragraph>
        The application currently allows users to sign in, browse blogs, open
        individual entries, like posts, create new blogs, and remove the ones
        they own.
      </Typography>

      <Typography variant="body1" paragraph>
        The project continues to evolve beyond the original exercises while staying
        focused on applying the ideas learned throughout the course in a more
        coherent and polished application. Built with{' '}
        <strong>React, React Router, Node.js, Express, MongoDB, and JWT authentication</strong>.
      </Typography>

      <Link
        href="https://github.com/N3t0n/full-stack-open-helsinki"
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        sx={{ mt: 2, display: 'inline-block' }}
      >
        View source on GitHub
      </Link>
    </Box>
  )
}

export default Home
