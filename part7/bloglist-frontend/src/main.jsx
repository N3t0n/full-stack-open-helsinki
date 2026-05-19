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
      main: '#003566',
    },
    secondary: {
      main: '#9a5b2a',
    },
    background: {
      default: '#f7f6f2',
      paper: '#fffdf8',
    },
    text: {
      primary: '#0f1720',
      secondary: '#5f6772',
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
