//! Массив просто чтобы где-то были прописаны названия
// const labels = ['new', 'hit', 'hot', 'vegan']

export interface IDataItemStructure {
  weight: number
  protein: number
  fat: number
  carbohydrates: number
  calorie: number
  ingredients: string[]
}

export interface IDataItem {
  id: string
  title: string
  price: number
  img: string
  labels: string[]
  structure: IDataItemStructure
}

export interface IDataItemWithKey extends IDataItem {
  key: string
}

export interface IDataItems<T> {
  sushi: T[]
  rolls: T[]
}
