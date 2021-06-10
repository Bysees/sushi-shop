import { IProductItem } from "../components/ProductPage/ProductItems/ProductItem/ProductItem";
import sushiImg from '../img/sushi_sake.jpg'

//! Массив просто чтобы где-то были прописаны названия
// const labels = ['new', 'hit', 'hot', 'vegan']

export const sushiData: IProductItem[] = [
  {
    id: 1,
    title: 'СУШИ, ЗАПЕЧЕННЫЕ ПОД СЫРНЫМ СОУСОМ ЛОСОСЬ (3 ШТ.)',
    price: 270,
    img: sushiImg,
    labels: ['new'],
  },
  {
    id: 2,
    title: 'СУШИ, ЛОСОСЬ (3 ШТ.)',
    price: 170,
    img: sushiImg,
    labels: ['hit'],
  },
  {
    id: 3,
    title: 'СУШИ, ЗАПЕЧЕННЫЕ (3 ШТ.)',
    price: 220,
    img: sushiImg,
    labels: ['hot', 'hit'],
  },
  {
    id: 4,
    title: 'СУШИ, ЛОСОСЬ (3 ШТ.)',
    price: 170,
    img: sushiImg,
    labels: ['hot'],
  },
  {
    id: 5,
    title: 'СУШИ, ЗАПЕЧЕННЫЕ (3 ШТ.)',
    price: 220,
    img: sushiImg,
    labels: ['vegan', 'new'],
  },
  {
    id: 6,
    title: 'СУШИ, ЛОСОСЬ (3 ШТ.)',
    price: 170,
    img: sushiImg,
    labels: [],
  },
  {
    id: 7,
    title: 'СУШИ, ЗАПЕЧЕННЫЕ (3 ШТ.)',
    price: 220,
    img: sushiImg,
    labels: ['hot'],
  },
]