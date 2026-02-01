import React, { useEffect, useRef, useState } from 'react'

export default function StatCounter({ value = 0, label, suffix = '', prefix = '', precision = 0 }){
  const [display, setDisplay] = useState('0')
  const animationRef = useRef(null)

  useEffect(()=>{
    const target = Number(value)
    if(Number.isNaN(target)){
      setDisplay(value)
      return
    }
    const start = 0
    const duration = 1400
    const startTime = performance.now()
    const isDecimal = target !== Math.floor(target)

    const update = (time)=>{
      const progress = Math.min((time - startTime) / duration, 1)
      const current = start + (target - start) * progress
      const formatted = isDecimal
        ? current.toFixed(Math.max(1, precision))
        : Math.round(current).toLocaleString()
      setDisplay(formatted)
      if(progress < 1){
        animationRef.current = requestAnimationFrame(update)
      }
    }

    animationRef.current = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animationRef.current)
  }, [value, precision])

  return (
    <div>
      <span className="stat-number">
        {prefix}{display}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}
