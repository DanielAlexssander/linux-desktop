import { ThemeProvider } from './context/ThemeContext'
import Desktop from './components/Desktop'
import Loading from './components/Loading'

export default function App() {
  return (
    <ThemeProvider>
      <Loading>
        <Desktop />
      </Loading>
    </ThemeProvider>
  )
}
