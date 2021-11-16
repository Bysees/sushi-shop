import sushiItems from './sushi.json'
import rollsItems from './rolls.json'
import crypto from 'crypto'

function getItemsWithId(items, indetificator) {
  return items.map((item) => {
    item.id = crypto.randomBytes(4).toString(indetificator)
    return item
  })
}

const sushi = getItemsWithId(sushiItems.sushi, 'hex')
const rolls = getItemsWithId(rollsItems.rolls, 'hex')

const items = {
  sushi,
  rolls,
}

export default () => {
  return {
    items,
  }
}
