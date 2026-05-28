import { Video, Settings as SettingsIcon } from 'lucide-react'
import type { AppConfig } from '../types'
import Trash from './Trash'
import TextFile from './TextFile'
import CalculatorApp from './Calculator'
import VideoPlayer from './VideoPlayer'
import Browser from './Browser'
import Settings from './Settings'
import lixeiraIcon from '../assets/icons/lixeira.png'
import calculadoraIcon from '../assets/icons/calculadora.png'
import txtIcon from '../assets/icons/txt.png'
import portfolioIcon from '../assets/icons/portfolio.png'

const ImgIcon = (src: string, alt: string) => ({ size = 24 }: { size?: number; className?: string }) => (
  <img src={src} width={size} height={size} alt={alt} />
)

export const apps: AppConfig[] = [
  { id: 'trash', name: 'Lixeira', icon: ImgIcon(lixeiraIcon, 'Lixeira'), component: Trash, defaultSize: { width: 600, height: 500 } },
  { id: 'readme', name: 'README.txt', icon: ImgIcon(txtIcon, 'README'), component: TextFile, defaultSize: { width: 500, height: 400 } },
  { id: 'calculator', name: 'Calculadora', icon: ImgIcon(calculadoraIcon, 'Calculadora'), component: CalculatorApp, defaultSize: { width: 280, height: 380 } },
  { id: 'browser', name: 'Portfolio', icon: ImgIcon(portfolioIcon, 'Portfolio'), component: Browser, defaultSize: { width: 1300, height: 650 } },
  { id: 'video', name: 'Video', icon: Video, component: VideoPlayer, defaultSize: { width: 640, height: 400 } },
  { id: 'settings', name: 'Configurações', icon: SettingsIcon, component: Settings, defaultSize: { width: 500, height: 500 }, showOnDesktop: false },
]
