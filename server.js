const express = require('express')
const path = require('path')
const app = express()
const route = express()
const db = require('./server/db.js')

const PORT = process.env.PORT || 5000

app.use(
  '/picture',
  express.static(path.join(__dirname, 'server', 'images', 'rolls'))
)

app.use(
  '/picture',
  express.static(path.join(__dirname, 'server', 'images', 'sushi'))
)

route.get('/items', (req, res) => {
  res.json(db)
})

route.get('/sushi', (req, res) => {
  res.json(db.sushi)
})

route.get('/rolls', (req, res) => {
  res.json(db.rolls)
})

route.get('/sushi/:id', (req, res) => {
  const { id } = req.params
  let item = db.sushi.filter((item) => item.id === id)
  res.json(item)
})
app.use('/api', route)

if (process.env.NODE_ENV?.trim() === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
