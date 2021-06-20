import { ReactNode } from 'react'

interface IList<T> {
  items: T[]
  renderItem: (item: T, index?: number, array?: T[]) => ReactNode
  className?: string
}

function List<T>({ items, renderItem, className }: IList<T>) {
  return <ul className={className}>{items.map(renderItem)}</ul>
}

export default List
