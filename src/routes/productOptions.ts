import { IDataItems, IDataItemWithKey } from './../store/types/productItems'

export function getProductItems(items: IDataItems<IDataItemWithKey>) {
  interface IproductItem {
    title: string
    path: string
    items: IDataItemWithKey[]
  }

  const productItems: IproductItem[] = []
  let title: string = ''
  let path: string = ''
  let item: keyof IDataItems<IDataItemWithKey>

  for (item in items) {
    if (item === 'sushi') {
      title = 'Суши всех видов'
      path = '/sushi'
    }
    if (item === 'rolls') {
      title = 'Роллы с новым вкусом'
      path = '/rolls'
    }
    productItems.push({
      title,
      path,
      items: items[item],
    })
  }

  return productItems
}
