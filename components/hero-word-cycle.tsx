'use client'

import { useState, useEffect } from 'react'

const WORDS = ['Sales', 'Support', 'Operations', 'Compliance']

export function HeroWordCycle() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: 'inline-block',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0px)' : 'translateY(8px)',
        transition: 'opacity 300ms ease, transform 300ms ease',
      }}
    >
      <span style={{ color: '#863DFF', fontWeight: 700 }}>{WORDS[index]}</span>
      <span style={{ color: '#9896B0', fontWeight: 400 }}>.</span>
    </span>
  )
}
