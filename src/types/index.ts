import type { FC } from 'react'

export interface AppConfig {
  id: string
  name: string
  icon: FC<{ size?: number; className?: string }>
  component: FC
  defaultSize: { width: number; height: number }
  showOnDesktop?: boolean
}

export interface WindowState {
  id: string
  appId: string
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  iconOrigin: { x: number; y: number }
}
