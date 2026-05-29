import { useRef } from 'react'
import type { AppConfig } from '../types'

interface Props {
  app: AppConfig
  position: { x: number; y: number }
  onOpen: (appId: string) => void
  onMove: (appId: string, pos: { x: number; y: number }) => void
  onMoveGroup: (dx: number, dy: number) => void
  isSelected?: boolean
}

export default function DesktopIcon({ app, position, onOpen, onMove, onMoveGroup, isSelected }: Props) {
  const Icon = app.icon
  const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, dragging: false, lastX: 0, lastY: 0 })

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation()
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: position.x, origY: position.y, dragging: false, lastX: e.clientX, lastY: e.clientY }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d.startX && !d.startY) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.dragging && Math.abs(dx) + Math.abs(dy) > 5) d.dragging = true
    if (d.dragging) {
      if (isSelected) {
        const deltaX = e.clientX - d.lastX
        const deltaY = e.clientY - d.lastY
        d.lastX = e.clientX
        d.lastY = e.clientY
        onMoveGroup(deltaX, deltaY)
      } else {
        const x = Math.max(0, Math.min(d.origX + dx, window.innerWidth - 80))
        const y = Math.max(0, Math.min(d.origY + dy, window.innerHeight - 100 - 52))
        onMove(app.id, { x, y })
      }
    }
  }

  const onPointerUp = () => {
    const wasDragging = dragRef.current.dragging
    dragRef.current = { startX: 0, startY: 0, origX: 0, origY: 0, dragging: wasDragging, lastX: 0, lastY: 0 }
    setTimeout(() => { dragRef.current.dragging = false }, 0)
  }

  return (
    <div
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onClick={() => { if (!dragRef.current.dragging) onOpen(app.id) }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDragStart={(e) => e.preventDefault()}
      className={`flex flex-col items-center gap-1 p-1 rounded hover:bg-white/10 w-20 cursor-pointer select-none touch-none ${isSelected ? 'bg-blue-500/30 ring-1 ring-blue-400' : ''}`}
    >
      <Icon size={40} className="text-white drop-shadow" />
      <span className="text-white text-xs text-center drop-shadow leading-tight">{app.name}</span>
    </div>
  )
}
