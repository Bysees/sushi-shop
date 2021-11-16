const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')
const db = require('./server/db.js')

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults({
  static: './build',
})

const PORT = process.env.PORT || 3002

server.use(middlewares)
server.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  next()
})

const images = path.join('server/images')

//! пока оставлю хуёвый вложенный цикл, потом мб поменяю.
fs.readdirSync(images).forEach((dir) => {
  fs.readdirSync(`${images}/${dir}`).forEach((filename) => {
    const middleware = jsonServer.defaults({
      static: `${images}/${dir}/${filename}`,
    })
    server.use(`/picture/${filename}`, middleware)
  })
})

server.use('/api', router)
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})
