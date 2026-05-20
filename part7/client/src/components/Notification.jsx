import { Alert } from '@mui/material'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <Alert severity={type}>
      {message}
    </Alert>
  )
}

export default Notification