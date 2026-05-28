import { Rnd } from 'react-rnd'
import { useState, useRef, useEffect } from 'react'
import { Minus, Square, Minimize , X } from 'lucide-react'
import type { WindowState, AppConfig } from '../types'
import { useTheme } from '../context/ThemeContext'

interface Props {
  state: WindowState
  app: AppConfig
  onClose: (id: string) => void
  onMinimize: (id: string) => void
  onFocus: (id: string) => void
  onToggleMaximize: (id: string) => void
}

export default function Window({ state, app, onClose, onMinimize, onFocus, onToggleMaximize }: Props) {
  const centerX = Math.round((window.innerWidth - app.defaultSize.width) / 2)
  const centerY = Math.round((window.innerHeight - 52 - app.defaultSize.height) / 2)
  const [size, setSize] = useState(app.defaultSize)
  const [pos, setPos] = useState({ x: centerX, y: centerY })
  const prevRef = useRef({ size, pos })
  const [phase, setPhase] = useState<'move' | 'grow' | 'done'>('move')
  const smallW = 40
  const smallH = 40
  const [animStyle, setAnimStyle] = useState({
    left: state.iconOrigin.x - smallW / 2,
    top: state.iconOrigin.y - smallH / 2,
    width: smallW,
    height: smallH,
  })

  useEffect(() => {
    // Phase 1: move to center (keep small)
    requestAnimationFrame(() => {
      setAnimStyle({
        left: (window.innerWidth - smallW) / 2,
        top: (window.innerHeight - 52 - smallH) / 2,
        width: smallW,
        height: smallH,
      })
    })
    // Phase 2: grow at center
    const t1 = setTimeout(() => {
      setPhase('grow')
      setAnimStyle({
        left: centerX,
        top: centerY,
        width: app.defaultSize.width,
        height: app.defaultSize.height,
      })
    }, 200)
    // Phase 3: done
    const t2 = setTimeout(() => setPhase('done'), 450)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (state.isMinimized) return null

  const Content = app.component
  const isMax = state.isMaximized
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (phase !== 'done') {
    return (
      <div
        className={`absolute rounded-lg shadow-2xl overflow-hidden transition-all duration-200 ease-out ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
        style={{ ...animStyle, zIndex: state.zIndex }}
      >
        <div className={`h-7 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`} />
      </div>
    )
  }

  return (
    <Rnd
      size={isMax ? { width: window.innerWidth, height: window.innerHeight - 52 } : size}
      position={isMax ? { x: 0, y: 0 } : pos}
      disableDragging={isMax}
      enableResizing={!isMax}
      bounds="parent"
      onDragStop={(_, d) => setPos({ x: d.x, y: d.y })}
      onResizeStop={(_, __, ref, ___, position) => {
        setSize({ width: parseInt(ref.style.width), height: parseInt(ref.style.height) })
        setPos(position)
      }}
      minWidth={200}
      minHeight={150}
      dragHandleClassName="window-handle"
      style={{ zIndex: state.zIndex }}
      onMouseDown={() => onFocus(state.id)}
    >
      <div
        className={`flex flex-col h-full overflow-hidden ${isMax ? '' : 'rounded-md'}`}
        style={{
          background: isDark ? 'rgba(30, 30, 30, 0.50' : 'rgba(255, 255, 255, 0.4)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(7px)',
          WebkitBackdropFilter: 'blur(7px)',
          border: isDark ? '1px solid rgba(30, 30, 30, 0.21)' : '1px solid rgba(200, 200, 200, 0.6)',
        }}
      >
        <div className={`window-handle flex items-center justify-between px-3 py-1.5 cursor-move select-none ${isDark ? 'bg-white/5 border-b border-white/10' : 'bg-gray-100/50 border-b border-gray-200'}`}>
          <span className={`text-xs font-medium truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{app.name}</span>
          <div className="flex gap-1.5">
            <button onClick={() => onMinimize(state.id)} className={`w-7 h-7 rounded-sm hover:pb-0.5 hover:border ${isDark ? 'border-gray-400' : 'border-gray-300 hover:bg-gray-200'} hover:brightness-125 flex items-center justify-center`}><Minus color={isDark ? 'white' : '#333'} size={15} /></button>
            <button onClick={() => {
              if (!isMax) prevRef.current = { size, pos }
              else { setSize(prevRef.current.size); setPos(prevRef.current.pos) }
              onToggleMaximize(state.id)
            }} className={`w-7 h-7 rounded-sm hover:pb-0.5 hover:border ${isDark ? 'border-gray-400' : 'border-gray-300 hover:bg-gray-200'} hover:brightness-125 flex items-center justify-center`}>{isMax ? <Minimize color={isDark ? 'white' : '#333'} size={15} /> : <Square color={isDark ? 'white' : '#333'} size={15} />}</button>
            <button onClick={() => onClose(state.id)} className={`w-7 h-7 rounded-sm hover:pb-0.5 hover:border ${isDark ? 'border-gray-400' : 'border-gray-300 hover:bg-red-100'} hover:brightness-125 flex items-center justify-center`}><X color={isDark ? 'white' : '#333'} size={15} /></button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Content />
        </div>
      </div>
    </Rnd>
  )
}
