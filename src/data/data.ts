//! Массив просто чтобы где-то были прописаны названия
// const labels = ['new', 'hit', 'hot', 'vegan']

export interface Istructure {
  weight: number
  protein: number
  fat: number
  carbohydrates: number
  calorie: number
  ingredients: string[]
}

export interface Idata {
  id: number
  title: string
  price: number
  img: string
  labels: string[]
  //! key не должен приходить с сервера, потом поменять логику
  key?: string
  structure: Istructure
}

//@ts-ignore
window.sushiData = sushiData