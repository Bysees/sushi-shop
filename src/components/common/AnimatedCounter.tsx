import React, { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

interface ICounter {
  count: number
}

function AnimatedCounter({ count }: ICounter) {
  const spanRef = useRef<HTMLElement | null>(null)
  const prevCountRef = useRef<number>(0)

  useEffect(() => {
    prevCountRef.current = count
  }, [count])
  const prevCount = prevCountRef.current

  useEffect(() => {
    const controls = animate(prevCount, count, {
      duration: 0.5,
      onUpdate(value) {
        if (spanRef.current) {
          spanRef.current.textContent = value.toFixed(2)
        }
      },
    })
    return () => controls.stop()
  }, [prevCount, count])

  return <span ref={spanRef} />
}

export default AnimatedCounter
