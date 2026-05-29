import { useState, useEffect, type ReactNode } from 'react'
import wallpaper from '../assets/desktop.png'
import lixeiraIcon from '../assets/icons/lixeira.png'
import calculadoraIcon from '../assets/icons/calculadora.png'
import txtIcon from '../assets/icons/txt.png'
import portfolioIcon from '../assets/icons/portfolio.png'

const imagesToPreload = [wallpaper, lixeiraIcon, calculadoraIcon, txtIcon, portfolioIcon]

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

export default function Loading({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    Promise.all(imagesToPreload.map(preloadImage)).then(() => setReady(true))
  }, [])

  if (ready) return <>{children}</>

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#202020]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <span className="text-white/70 text-sm">Carregando...</span>
      </div>
    </div>
  )
}
