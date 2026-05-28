import { useTheme } from '../context/ThemeContext'

export default function TextFile() {
  const { theme } = useTheme()
  const d = theme === 'dark'

  return (
    <div className={`h-full p-4 font-mono text-sm overflow-auto ${d ? 'bg-gray-950 text-green-400' : 'bg-white text-green-400'}`}>
      <pre>{`# Linux Desktop Web OS
# README.txt

Bem-vindo ao Linux Desktop Web OS!

Este projeto simula um ambiente de desktop Linux
no navegador usando React 19 + Tailwind CSS 4 + react-rnd.

## Apps disponíveis:
- Lixeira: Gerenciar arquivos excluídos
- Calculadora: Operações matemáticas básicas
- Player de Vídeo: Assistir vídeos do YouTube
- Portfolio: Navegador com iframe do portfólio
- Configurações: Tema dark/light
- README: Este arquivo

## Funcionalidades:
- Janelas arrastáveis e redimensionáveis
- Minimizar, maximizar e fechar janelas
- Ícones arrastáveis com seleção múltipla
- Taskbar com relógio e menus de contexto
- Tema dark/light persistido no localStorage
- Animação de abertura de janelas

## Como adicionar novos apps:
1. Crie o componente em src/apps/
2. Registre no src/apps/index.tsx
3. Pronto! Aparece automaticamente na desktop.

## Stack:
React 19 | TypeScript | Vite 8 | Tailwind CSS 4

Desenvolvido com ❤️ por Daniel Rossinatti`}</pre>
    </div>
  )
}
