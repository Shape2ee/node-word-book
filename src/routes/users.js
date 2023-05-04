import { readDB, writeDB } from "../dbController.js";

const getUsers = () => readDB('users')
const setUsers = (data) => writeDB('users', data)

const usersRoute = [
  {
    method: 'get',
    route: '/users',
    handler: (req, res) => {
      const users = getUsers()
      res.send(users)
    }
  },
  {
    method: 'get',
    route: '/users/:id',
    handler: ({ params: {id} }, res) => {
      const users = getUsers()
      const user = users[id]
      if (!user) throw Error('사용자가 없습니다.')
      res.send(user)
    }
  },
]

export default usersRoute