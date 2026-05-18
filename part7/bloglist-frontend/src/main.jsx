import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#8b3a32',
    },
    secondary: {
      main: '#00695c',
    },
    background: {
      default: '#f4efe7',
      paper: '#fbf7f1',
    },
    text: {
      primary: '#2f241f',
      secondary: '#6e6258',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
)
