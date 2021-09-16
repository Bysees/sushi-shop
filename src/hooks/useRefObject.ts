import { useEffect, useRef, useState } from 'react'
export function useRefObject<T>() {
  const ref = useRef<T | null>(null)
  const [, setRef] = useState(false)

  useEffect(() => {
    if (ref.current) setRef(true)
  }, [])

  return ref
}
