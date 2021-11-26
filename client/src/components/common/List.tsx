import { AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'

interface IList<T> {
  items: T[]
  renderItem: (item: T, index: number, array: T[]) => ReactNode
  className?: string
  animate?: boolean
}

function List<T>({ items, renderItem, className, animate = false }: IList<T>) {
  const itemsList = animate ? (
    <AnimatePresence>{items.map(renderItem)}</AnimatePresence>
  ) : (
    items.map(renderItem)
  )

  return <ul className={className}>{itemsList}</ul>
}

export default List
