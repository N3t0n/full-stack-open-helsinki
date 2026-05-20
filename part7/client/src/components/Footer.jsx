import { Box, Typography, Link } from '@mui/material'

const Footer = () => {
  return (
    <Box sx={{ mt: 6, py: 3 }}>
      <Typography variant="body2" color="text.secondary">
        Developed by{' '}
        <Link
          href="https://github.com/N3t0n"
          color="secondary"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          N3t0n
        </Link>{' '}
        · 2026
      </Typography>
    </Box>
  )
}

export default Footer
