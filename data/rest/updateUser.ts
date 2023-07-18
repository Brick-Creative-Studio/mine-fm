import axios from 'axios'
import { User } from "../../types/User";


export default async function updateUser(user: User) {
  const url = `https://minefm-server.herokuapp.com/user/`
  try {
    await axios.put(url, user).then((res) => {
      console.log(res.data)
      return res.data
    })
  } catch (error) {
    console.log('create event error:', error)
    return
  }

}
