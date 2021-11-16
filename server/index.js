import jsonServer from 'json-server'
import fs from 'fs'
import path from 'path'
import db from './db.js'

const server = jsonServer.create()
const router = jsonServer.router(db())

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
server.listen(3001, () => {
  console.log('JSON Server is running')
})
