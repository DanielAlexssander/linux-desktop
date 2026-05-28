import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw, Settings, Info } from 'lucide-react'
import { apps } from '../apps'
import { useTheme } from '../context/ThemeContext'
import type { WindowState } from '../types'
import DesktopIcon from './DesktopIcon'
import Window from './Window'
import Taskbar from './Taskbar'
import wallpaper from '../assets/desktop.png'

let nextZ = 1
let nextId = 1

const desktopApps = apps.filter((a) => a.showOnDesktop !== false)

const initialPositions: Record<string, { x: number; y: number }> = Object.fromEntries(
  desktopApps.map((app, i) => [app.id, { x: 16, y: 16 + i * 80 }])
)

export default function Desktop() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [windows, setWindows] = useState<WindowState[]>([])
  const [iconPositions, setIconPositions] = useState(initialPositions)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [selBox, setSelBox] = useState<{ x: number; y: number; w: number; h: number } | null>(null)
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null)
  const [taskbarMenu, setTaskbarMenu] = useState<{ x: number; y: number } | null>(null)
  const [appMenu, setAppMenu] = useState<{ x: number; id: string } | null>(null)
  const dragStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const pos = iconPositions['browser'] || { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    setWindows([{ id: String(nextId++), appId: 'browser', isMinimized: false, isMaximized: false, zIndex: nextZ++, iconOrigin: { x: pos.x + 40, y: pos.y + 40 } }])
  }, [])

  const openApp = useCallback((appId: string) => {
    setCtxMenu(null)
    setTaskbarMenu(null)
    const existing = windows.find((w) => w.appId === appId)
    if (existing) {
      setWindows((prev) => prev.map((w) => w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextZ++ } : w))
      return
    }
    const pos = iconPositions[appId]
    setWindows((prev) => [...prev, { id: String(nextId++), appId, isMinimized: false, isMaximized: false, zIndex: nextZ++, iconOrigin: { x: pos.x + 40, y: pos.y + 40 } }])
  }, [iconPositions, windows])

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: true } : w))
  }, [])

  const focusWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, zIndex: nextZ++ } : w))
  }, [])

  const toggleMaximize = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => w.id === id ? { ...w, isMinimized: false, zIndex: nextZ++ } : w))
  }, [])

  const closeAll = useCallback(() => {
    setWindows([])
  }, [])

  const moveIcon = useCallback((appId: string, pos: { x: number; y: number }) => {
    setIconPositions((prev) => ({ ...prev, [appId]: pos }))
  }, [])

  const moveGroup = useCallback((dx: number, dy: number) => {
    setIconPositions((prev) => {
      const next = { ...prev }
      selected.forEach((id) => {
        const p = prev[id]
        next[id] = {
          x: Math.max(0, Math.min(p.x + dx, window.innerWidth - 80)),
          y: Math.max(0, Math.min(p.y + dy, window.innerHeight - 100 - 52)),
        }
      })
      return next
    })
  }, [selected])

  const getSelectionRect = (startX: number, startY: number, currX: number, currY: number) => {
    const x = Math.min(startX, currX)
    const y = Math.min(startY, currY)
    const w = Math.abs(currX - startX)
    const h = Math.abs(currY - startY)
    return { x, y, w, h }
  }

  const intersects = (box: { x: number; y: number; w: number; h: number }, iconPos: { x: number; y: number }) => {
    const iconW = 80, iconH = 80
    return !(iconPos.x + iconW < box.x || iconPos.x > box.x + box.w || iconPos.y + iconH < box.y || iconPos.y > box.y + box.h)
  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    setCtxMenu(null)
    setTaskbarMenu(null)
    setAppMenu(null)
    dragStart.current = { x: e.clientX, y: e.clientY }
    setSelected(new Set())
    setWindows((prev) => prev.map((w) => ({ ...w, isMinimized: true })))
  }

  const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    e.preventDefault()
    setTaskbarMenu(null)
    setAppMenu(null)
    setCtxMenu({ x: e.clientX, y: e.clientY })
  }

  const resetIcons = () => {
    setIconPositions(initialPositions)
    setCtxMenu(null)
  }

  const openAbout = () => {
    const origin = ctxMenu || { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    setWindows((prev) => [...prev, { id: String(nextId++), appId: 'readme', isMinimized: false, isMaximized: false, zIndex: nextZ++, iconOrigin: origin }])
    setCtxMenu(null)
  }

  const openSettings = () => {
    const existing = windows.find((w) => w.appId === 'settings')
    if (existing) {
      setWindows((prev) => prev.map((w) => w.id === existing.id ? { ...w, isMinimized: false, zIndex: nextZ++ } : w))
    } else {
      const origin = ctxMenu || { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      setWindows((prev) => [...prev, { id: String(nextId++), appId: 'settings', isMinimized: false, isMaximized: false, zIndex: nextZ++, iconOrigin: origin }])
    }
    setCtxMenu(null)
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStart.current) return
    const rect = getSelectionRect(dragStart.current.x, dragStart.current.y, e.clientX, e.clientY)
    setSelBox(rect)
    const sel = new Set<string>()
    desktopApps.forEach((app) => {
      if (intersects(rect, iconPositions[app.id])) sel.add(app.id)
    })
    setSelected(sel)
  }

  const onMouseUp = () => {
    dragStart.current = null
    setSelBox(null)
  }

  return (
    <div className="h-screen w-screen flex flex-col" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div
        className="flex-1 relative"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onContextMenu={onContextMenu}
      >
        {desktopApps.map((app) => (
          <DesktopIcon key={app.id} app={app} position={iconPositions[app.id]} onOpen={openApp} onMove={moveIcon} onMoveGroup={moveGroup} isSelected={selected.has(app.id)} />
        ))}
        {windows.map((w) => {
          const app = apps.find((a) => a.id === w.appId)!
          return (
            <Window
              key={w.id}
              state={w}
              app={app}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
              onToggleMaximize={toggleMaximize}
            />
          )
        })}
        {selBox && (
          <div
            className="absolute border border-blue-400 bg-blue-400/20 pointer-events-none"
            style={{ left: selBox.x, top: selBox.y, width: selBox.w, height: selBox.h }}
          />
        )}
        {ctxMenu && createPortal(
          <div
            className={`fixed backdrop-blur-md rounded-lg py-1 shadow-xl min-w-[180px] ${isDark ? 'bg-gray-900/95 border border-white/15' : 'bg-white/95 border border-gray-200'}`}
            style={{ left: Math.min(ctxMenu.x, window.innerWidth - 200), top: Math.min(ctxMenu.y, window.innerHeight - 150), zIndex: 99999 }}
          >
            <button onClick={resetIcons} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><RotateCcw size={14} />Reset Icons</button>
            <button onClick={openSettings} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><Settings size={14} />Configurações</button>
            <button onClick={openAbout} className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-800 hover:bg-black/5'}`}><Info size={14} />About Linux Desktop</button>
          </div>,
          document.body
        )}
      </div>
      <Taskbar windows={windows} apps={apps} onRestore={restoreWindow} onClose={closeWindow} onMinimize={minimizeWindow} onCloseAll={closeAll} ctxMenu={taskbarMenu} setCtxMenu={setTaskbarMenu} appMenu={appMenu} setAppMenu={setAppMenu} onCloseDesktopMenu={() => setCtxMenu(null)} />
    </div>
  )
}
