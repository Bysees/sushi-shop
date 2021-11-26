const sushiItems = require('./sushi.json')
const rollsItems = require('./rolls.json')
const crypto = require('crypto')

function getItemsWithId(items, indetificator) {
  return items.map((item) => {
    item.id = crypto.randomBytes(4).toString(indetificator)
    return item
  })
}

const sushi = getItemsWithId(sushiItems.sushi, 'hex')
const rolls = getItemsWithId(rollsItems.rolls, 'hex')

module.exports = {
  sushi,
  rolls,
}
