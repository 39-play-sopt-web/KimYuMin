import { useState } from 'react'

export default function useHeader() {
  const [activeMenu, setActiveMenu] = useState('game')
  const [level, setLevel] = useState('1')

  function selectGame() {
    setActiveMenu('game')
  }

  function selectRanking() {
    setActiveMenu('ranking')
  }

  function changeLevel(event) {
    setLevel(event.target.value)
  }

  return { activeMenu, level, selectGame, selectRanking, changeLevel }
}
