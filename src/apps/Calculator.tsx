import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [reset, setReset] = useState(false)
  const { theme } = useTheme()
  const d = theme === 'dark'

  const input = (val: string) => {
    if (reset) { setDisplay(val); setReset(false) }
    else setDisplay(display === '0' ? val : display + val)
  }

  const operate = (nextOp: string) => {
    const curr = parseFloat(display)
    if (prev !== null && op) {
      const result = op === '+' ? prev + curr : op === '-' ? prev - curr : op === '×' ? prev * curr : prev / curr
      setPrev(result)
      setDisplay(String(result))
    } else {
      setPrev(curr)
    }
    setOp(nextOp)
    setReset(true)
  }

  const equals = () => {
    if (prev === null || !op) return
    const curr = parseFloat(display)
    const result = op === '+' ? prev + curr : op === '-' ? prev - curr : op === '×' ? prev * curr : prev / curr
    setDisplay(String(result))
    setPrev(null)
    setOp(null)
    setReset(true)
  }

  const clear = () => { setDisplay('0'); setPrev(null); setOp(null) }

  const btn = (label: string, action: () => void, cls = '') => (
    <button onClick={action} className={`p-2 rounded text-sm font-bold hover:brightness-110 ${cls || (d ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800')}`}>
      {label}
    </button>
  )

  return (
    <div className={`h-full p-3 flex flex-col gap-2 ${d ? 'bg-gray-900' : 'bg-white'}`}>
      <div className={`text-right text-2xl p-3 rounded font-mono min-h-[48px] ${d ? 'bg-black text-white' : 'bg-gray-100 text-gray-900 border border-gray-200'}`}>
        {display}
      </div>
      <div className="grid grid-cols-4 gap-1 flex-1">
        {btn('C', clear, 'bg-red-600 text-white')}
        {btn('±', () => setDisplay(String(-parseFloat(display))), d ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800')}
        {btn('%', () => setDisplay(String(parseFloat(display) / 100)), d ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800')}
        {btn('÷', () => operate('÷'), 'bg-orange-500 text-white')}
        {btn('7', () => input('7'))}
        {btn('8', () => input('8'))}
        {btn('9', () => input('9'))}
        {btn('×', () => operate('×'), 'bg-orange-500 text-white')}
        {btn('4', () => input('4'))}
        {btn('5', () => input('5'))}
        {btn('6', () => input('6'))}
        {btn('-', () => operate('-'), 'bg-orange-500 text-white')}
        {btn('1', () => input('1'))}
        {btn('2', () => input('2'))}
        {btn('3', () => input('3'))}
        {btn('+', () => operate('+'), 'bg-orange-500 text-white')}
        {btn('0', () => input('0'))}
        {btn('.', () => { if (!display.includes('.')) setDisplay(display + '.') })}
        {btn('=', equals, 'bg-green-600 text-white col-span-2')}
      </div>
    </div>
  )
}
