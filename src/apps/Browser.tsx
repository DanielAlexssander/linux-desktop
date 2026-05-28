import { useState } from 'react'
import { Globe, RotateCw } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Browser() {
  const [url, setUrl] = useState('https://danielalexssander.github.io/Portfolio-React/')
  const [input, setInput] = useState(url)
  const [key, setKey] = useState(0)
  const { theme } = useTheme()
  const d = theme === 'dark'

  const navigate = () => {
    const target = input.startsWith('http') ? input : `https://${input}`
    setUrl(target)
    setInput(target)
    setKey((k) => k + 1)
  }

  return (
    <div className={`h-full flex flex-col ${d ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`flex items-center gap-2 px-3 py-2 border-b ${d ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
        <button onClick={() => setKey((k) => k + 1)} className={d ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}><RotateCw size={14} /></button>
        <div className={`flex-1 flex items-center gap-2 rounded px-2 py-1 ${d ? 'bg-gray-700' : 'bg-gray-100 border border-gray-200'}`}>
          <Globe size={12} className={d ? 'text-gray-400' : 'text-gray-500'} />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate()}
            className={`flex-1 bg-transparent text-xs outline-none ${d ? 'text-white' : 'text-gray-800'}`}
            placeholder="Digite uma URL..."
          />
        </div>
        <button onClick={navigate} className={`text-xs px-2 ${d ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`}>Ir</button>
      </div>
      <iframe
        key={key}
        src={url}
        className="flex-1 w-full border-0 bg-white"
        title="Browser"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      />
    </div>
  )
}
