const express = require('express')
require('dotenv').config()
const { dbConnection } = require('../database/config')
const cors = require('cors')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app)
        this.sckt = require('socket.io')(this.server)

        this.paths = {
            auth: '/api'
        }

        this.connectToDB()
        this.addMiddlewares()
        this.setRoutes()
    }

    async connectToDB() {
        await dbConnection()
    }

    addMiddlewares() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    setRoutes() {
        this.app.use(this.paths.auth, require('../routes/router'))
    }

    sockets() {
        this.sckt.on('connection', socket => {
            console.log('Cliente Conectado', socket.addMiddlewares)
            socket.on('disconnect', () => {
                console.log('Cliente Desconectado')
            })
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', process.env.PORT)
        })
    }
}

module.exports = Server