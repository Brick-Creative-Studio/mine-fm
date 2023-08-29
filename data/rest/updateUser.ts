import axios from 'axios'
import { User } from "../../types/User";
import process from "process";


export default async function updateUser(user: any) {
  const endpoint = 'user/'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  try {
    await axios.put(url, user).then((res) => {
      console.log(res.data)
      user = res.data
      return res.data
    })
  } catch (error) {
    console.log('create event error:', error)
    return error
  }

}
