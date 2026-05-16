import { TextField, Button, Box } from '@mui/material'

const LoginForm = ({ username, password, handleSubmit, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>

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
