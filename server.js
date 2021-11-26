const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')
const db = require('./server/db.js')

const server = jsonServer.create()
const router = jsonServer.router(db)

//!prod
// const middlewares = jsonServer.defaults({
//   static: './build',
// })
// server.use(middlewares)
//!prod

const PORT = process.env.PORT || 3002

server.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  next()
})

const images = path.join(__dirname, 'server', 'images')

//! Создаю middlewares для каждой картинки.
fs.readdirSync(images).forEach((dir) => {
  fs.readdirSync(path.join(images, dir)).forEach((filename) => {
    const middleware = jsonServer.defaults({
      static: path.join(images, dir, filename),
    })
    server.use(`/picture/${filename}`, middleware)
  })
})

server.use('/api', router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})
