import { useState } from 'react'

export default function useHeader() {
  const [activeMenu, setActiveMenu] = useState('game')

  function selectGame() {
    setActiveMenu('game')
  }

  function selectRanking() {
    setActiveMenu('ranking')
  }

  return { activeMenu, selectGame, selectRanking }
}
