import { TextField, Button, Box, Typography } from '@mui/material'

const LoginForm = ({ username, password, handleSubmit, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <Typography variant="h4" component="h2" gutterBottom>
        Log in to application
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <TextField
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>login</Button>
      </Box>
    </div>
  )}

export default LoginForm
