export type addItemType = {
  id: string
  price: number
}

export type SubtractItemType = addItemType
export type RemoveItemType = { id: string }

export type IOrderedItemsType = {
  id: string
  totalPrice: number
  count: number
}

export type BasketState = {
  totalCount: number
  amount: number
  orderedItems: IOrderedItemsType[]
}

export type orderedItemType = {
  img: string
  title: string
  price: number
  totalPrice: number
  count: number
}
