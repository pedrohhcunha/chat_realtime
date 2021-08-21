const users = []

const createUser = (id, name, room) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    const userExist = users.find(user => user.room === room && user.name === name)

    if(!userExist){
        let user =  {
            id: id,
            name: name,
            room: room
        }
        users.push(user)
        return {user}

    } else {
        return {error: "User already exists"}
    }
}

const deleteUser = id => {
    const indexUser = users.findIndex(user => user.id === id)

    if(indexUser !== -1){
        return users.splice(indexUser, 1)[0]
    } else {
        return {error: "User don't exists"}
    }
}

const getUser = id => users.find(user => user.id === id)

const getUsersInRoom = room => users.filter(user => user.room === room) 

module.exports = {createUser, deleteUser, getUser, getUsersInRoom}