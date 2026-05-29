# 🐧 Linux Desktop

Um portfólio interativo que simula um ambiente de desktop Linux, construído com React e TypeScript.

**[🔗 Demo ao vivo](https://danielalexssander.github.io/linux-desktop/)**

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4)
![Vite](https://img.shields.io/badge/Vite-8-646CFF)

## ✨ Funcionalidades

- **Sistema de janelas** — arrastar, redimensionar, minimizar, maximizar e fechar
- **Ícones no desktop** — arrastáveis com seleção em grupo (rubber-band)
- **Taskbar** — lista de janelas abertas com ações rápidas
- **Menu de contexto** — reset de ícones, configurações e about
- **Tema claro/escuro** — com persistência em localStorage

## 🖥️ Aplicações

| App | Descrição |
|-----|-----------|
| Portfolio | Navegador embutido com o portfólio principal |
| Calculadora | Calculadora funcional |
| README.txt | Arquivo de texto com informações |
| Lixeira | Gerenciador de arquivos descartados |
| Video | Player de vídeo |
| Configurações | Ajustes de tema (acessível via menu de contexto) |

## 🚀 Rodando localmente

```bash
git clone https://github.com/DanielAlexssander/linux-desktop.git
cd linux-desktop
npm install
npm run dev
```

## 🛠️ Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |
| `npm run lint` | Lint com ESLint |

## 📦 Tecnologias

- [React](https://react.dev/) — UI
- [TypeScript](https://www.typescriptlang.org/) — Tipagem
- [Vite](https://vite.dev/) — Build tool
- [Tailwind CSS](https://tailwindcss.com/) — Estilização
- [react-rnd](https://github.com/bokuweb/react-rnd) — Janelas arrastáveis/redimensionáveis
- [Lucide React](https://lucide.dev/) — Ícones

## 📁 Estrutura

```
src/
├── apps/           # Aplicações do desktop
├── assets/         # Imagens e ícones
├── components/     # Desktop, Window, Taskbar, DesktopIcon
├── context/        # ThemeContext
└── types/          # Tipos TypeScript
```

## 🌐 Deploy

Deploy automático via GitHub Actions para GitHub Pages a cada push na branch `main`.
