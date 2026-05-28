import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { Image, FileText, Archive, Film } from 'lucide-react'

const iconMap: Record<string, typeof FileText> = {
  jpg: Image, png: Image, docx: FileText, txt: FileText, zip: Archive, mp4: Film,
}

const initialFiles = [
  { name: 'foto_antiga.jpg', size: '2.4 MB', period: 'Última semana' },
  { name: 'notas.txt', size: '4 KB', period: 'Última semana' },
  { name: 'documento.docx', size: '156 KB', period: 'Último mês' },
  { name: 'video.mp4', size: '128 MB', period: 'Último mês' },
  { name: 'backup.zip', size: '45.2 MB', period: 'Mais antigos' },
]

export default function Trash() {
  const [files, setFiles] = useState(initialFiles)
  const { theme } = useTheme()
  const d = theme === 'dark'

  const periods = [...new Set(files.map((f) => f.period))]

  return (
    <div className={`h-full flex flex-col ${d ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className={`flex justify-between items-center px-3 py-2 border-b ${d ? 'border-gray-700' : 'border-gray-200'}`}>
        <span className="font-bold text-sm">Lixeira ({files.length} itens)</span>
        <button onClick={() => setFiles([])} disabled={files.length === 0} className="px-2 py-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white rounded text-xs">
          Esvaziar
        </button>
      </div>
      {files.length === 0 ? (
        <p className={`flex-1 flex items-center justify-center ${d ? 'text-gray-500' : 'text-gray-400'}`}>A lixeira está vazia</p>
      ) : (
        <div className="flex-1 overflow-auto p-3 space-y-4">
          {periods.map((period, i) => (
            <div key={period}>
              {i > 0 && <div className={`mb-3 border-t ${d ? 'border-gray-700' : 'border-gray-200'}`} />}
              <p className={`text-xs font-semibold mb-2 ${d ? 'text-gray-400' : 'text-gray-500'}`}>{period}</p>
              <div className="grid grid-cols-3 gap-2">
                {files.filter((f) => f.period === period).map((f) => {
                  const ext = f.name.split('.').pop() || ''
                  const Icon = iconMap[ext] || FileText
                  return (
                    <div key={f.name} className={`flex flex-col items-center gap-1 p-3 rounded-lg cursor-default ${d ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                      <Icon size={36} className={d ? 'text-gray-300' : 'text-gray-500'} />
                      <span className="text-xs text-center truncate w-full">{f.name}</span>
                      <span className={`text-[10px] ${d ? 'text-gray-500' : 'text-gray-400'}`}>{f.size}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
