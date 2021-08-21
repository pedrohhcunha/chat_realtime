const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = 3030

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const {createUser, deleteUser, getUser, getUsersInRoom} = require('./users')


io.on('connection', (socket) => {
    console.log('User connection!')

    socket.on('signin', (data, callback) => {
        const {error, user} = createUser(socket.id, data.name, data.room) 
        
        if(error) return callback(error)

        socket.emit('message', {
            user: 'Admin',
            text: `Welcome ${user.name}!`
        })

        socket.broadcast.to(user.room).emit('message', {
            user: 'Admin',
            text: `${user.name}, has joined!`
        })

        socket.join(user.room)

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', {
            user: user.name,
            text: message
        }, console.log('Mensagem enviada'))

        callback()
    })

    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        deleteUser(socket.id)

        socket.broadcast.to(user.room).emit('message', {
            user: 'Admin',
            text: `${user.name}, has left!`
        })

    })  
    socket.on('logout', () => {
        const user = getUser(socket.id)
        deleteUser(socket.id)
        
        socket.broadcast.to(user.room).emit('message', {
            user: 'Admin',
            text: `${user.name}, has left!`
        })
    })
})

app.use(router)

server.listen(PORT, () => console.log(`My server stay running on port: ${PORT}!`))
