import { ThemeProvider } from './context/ThemeContext'
import Desktop from './components/Desktop'

export default function App() {
  return (
    <ThemeProvider>
      <Desktop />
    </ThemeProvider>
  )
}
