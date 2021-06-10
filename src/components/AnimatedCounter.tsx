import React, { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'

interface ICounter {
  count: number
}

function AnimatedCounter({ count }: ICounter) {
  const nodeRef = useRef<any>()
  const prevCountRef = useRef<any>(0)

  useEffect(() => {
    prevCountRef.current = count
  })
  const prevCount = prevCountRef.current

  let from = prevCount
  let to = count

  useEffect(() => {
    const node: any = nodeRef?.current

    const controls = animate(from, to, {
      duration: 0.5,
      onUpdate(value) {
        node.textContent = value.toFixed(2)
      },
    })

    return () => controls.stop()
  }, [from, to])

  return <span ref={nodeRef} />
}

export default AnimatedCounter
