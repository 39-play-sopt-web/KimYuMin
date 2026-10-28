import { useState } from 'react'

export default function useMenu() {
  const [activeMenu, setActiveMenu] = useState('game')

  function selectGame() {
    setActiveMenu('game')
  }

  function selectRanking() {
    setActiveMenu('ranking')
  }

  return { activeMenu, selectGame, selectRanking }
}
