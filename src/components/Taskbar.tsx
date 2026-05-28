import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Monitor, Wifi, Volume2, Battery, XCircle, Maximize2, Minus, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import type { WindowState, AppConfig } from '../types'

interface Props {
  windows: WindowState[]
  apps: AppConfig[]
  onRestore: (id: string) => void
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onCloseAll: () => void
  ctxMenu: { x: number; y: number } | null
  setCtxMenu: (v: { x: number; y: number } | null) => void
  appMenu: { x: number; id: string } | null
  setAppMenu: (v: { x: number; id: string } | null) => void
  onCloseDesktopMenu: () => void
}

export default function Taskbar({ windows, apps, onRestore, onClose, onMinimize, onCloseAll, ctxMenu, setCtxMenu, appMenu, setAppMenu, onCloseDesktopMenu }: Props) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const formatted = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const date = time.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className="h-13 flex items-center px-3 gap-3 relative"
      style={{
        background: isDark ? 'rgba(39, 39, 39, 0.78)' : 'rgba(255, 255, 255, 0.78)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(9.3px)',
        WebkitBackdropFilter: 'blur(9.3px)',
        border: isDark ? '1px solid rgba(39, 39, 39, 0.21)' : '1px solid rgba(200, 200, 200, 0.6)',
      }}
      onContextMenu={(e) => { e.preventDefault(); setAppMenu(null); onCloseDesktopMenu(); setCtxMenu({ x: e.clientX, y: e.clientY }) }}
      onClick={() => { setCtxMenu(null); setAppMenu(null); onCloseDesktopMenu() }}
    >
      <div className="flex items-center gap-1 py-1 rounded cursor-default">
        <Monitor size={20} className={isDark ? 'text-white' : 'text-gray-800'} />
      </div>

      <div className={`h-5 w-px mx-1 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />

      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {windows.map((w) => {
          const app = apps.find((a) => a.id === w.appId)!
          const Icon = app.icon
          return (
            <button
              key={w.id}
              onClick={() => onRestore(w.id)}
              onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); setCtxMenu(null); onCloseDesktopMenu(); setAppMenu({ x: e.clientX, id: w.id }) }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-all ${isDark ? 'text-white' : 'text-gray-800'} ${
                w.isMinimized
                  ? `opacity-50 hover:opacity-80 ${isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'}`
                  : `${isDark ? 'bg-white/10 border border-white/10 hover:bg-white/15' : 'bg-black/5 border border-gray-200 hover:bg-black/10'} shadow-inner`
              }`}
            >
              <Icon size={13} />
              <span className="max-w-24 truncate">{app.name}</span>
              {!w.isMinimized && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 ml-1" />}
            </button>
          )
        })}
      </div>

      <div className={`h-5 w-px mx-1 ${isDark ? 'bg-white/20' : 'bg-gray-300'}`} />

      <div className="flex items-center gap-2 px-2 py-1 rounded">
        <Wifi size={13} className={isDark ? 'text-white' : 'text-gray-700'} />
        <Volume2 size={13} className={isDark ? 'text-white' : 'text-gray-700'} />
        <Battery size={13} className={isDark ? 'text-white' : 'text-gray-700'} />
      </div>

      <div className="flex flex-col items-end px-2 py-0.5 rounded cursor-default">
        <span className={`text-sm font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-800'}`}>{formatted}</span>
        <span className={`text-xs leading-tight ${isDark ? 'text-white/60' : 'text-gray-500'}`}>{date}</span>
      </div>

      {ctxMenu && createPortal(
        <div
          className={`fixed backdrop-blur-md rounded-lg py-1 shadow-xl min-w-[160px] ${isDark ? 'bg-gray-900/95 border border-white/15' : 'bg-white/95 border border-gray-200'}`}
          style={{ left: Math.min(ctxMenu.x, window.innerWidth - 180), bottom: 56, zIndex: 99999 }}
        >
          <button onClick={(e) => { e.stopPropagation(); onCloseAll(); setCtxMenu(null) }} disabled={windows.length === 0} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm disabled:opacity-40 disabled:pointer-events-none ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><XCircle size={14} />Close All Apps</button>
        </div>,
        document.body
      )}
      {appMenu && createPortal(
        <div
          className={`fixed backdrop-blur-md rounded-lg py-1 shadow-xl min-w-[140px] ${isDark ? 'bg-gray-900/95 border border-white/15' : 'bg-white/95 border border-gray-200'}`}
          style={{ left: Math.min(appMenu.x, window.innerWidth - 160), bottom: 56, zIndex: 99999 }}
        >
          {(() => {
            const w = windows.find((w) => w.id === appMenu.id)
            return <>
              <button onClick={(e) => { e.stopPropagation(); onRestore(appMenu.id); setAppMenu(null) }} disabled={!w?.isMinimized} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm disabled:opacity-40 disabled:pointer-events-none ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><Maximize2 size={14} />Restaurar</button>
              <button onClick={(e) => { e.stopPropagation(); onMinimize(appMenu.id); setAppMenu(null) }} disabled={w?.isMinimized} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm disabled:opacity-40 disabled:pointer-events-none ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><Minus size={14} />Minimizar</button>
              <button onClick={(e) => { e.stopPropagation(); onClose(appMenu.id); setAppMenu(null) }} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-400 ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}><X size={14} />Fechar</button>
            </>
          })()}
        </div>,
        document.body
      )}
    </div>
  )
}
