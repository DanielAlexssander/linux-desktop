import { Monitor, Palette, Info } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`h-full flex flex-col p-4 overflow-auto ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-lg font-bold mb-4">Configurações do Sistema</h2>
      <div className="space-y-3">
        <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Monitor size={20} />
          <div>
            <p className="text-sm font-medium">Display</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Resolução: {window.innerWidth}x{window.innerHeight}</p>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="flex items-center gap-3 mb-3">
            <Palette size={20} />
            <p className="text-sm font-medium">Aparência</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 ${theme === 'dark' ? 'border-blue-400' : 'border-transparent'}`}
            >
              <div className="w-12 h-8 rounded bg-gray-800 border border-gray-600" />
              <span className="text-xs">Dark</span>
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg border-2 ${theme === 'light' ? 'border-blue-400' : 'border-transparent'}`}
            >
              <div className="w-12 h-8 rounded bg-gray-100 border border-gray-300" />
              <span className="text-xs">Light</span>
            </button>
          </div>
        </div>
        <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <Info size={20} />
          <div>
            <p className="text-sm font-medium">Sobre</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Linux Desktop Web OS v1.0</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>React + Vite + Tailwind</p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Created by Daniel Rossinatti</p>
          </div>
        </div>
      </div>
    </div>
  )
}
