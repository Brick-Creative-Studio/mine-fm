import axios from 'axios'
import { Event } from "../../types/Event";
import { User } from "../../types/User";

export default async function getUserBy(walletAddress: string): Promise<User | undefined>{
  const endpoint = 'user/user'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  let user;
  try {
    user = await axios.post(url, {
      walletAddress: walletAddress
    }).then((res) => {
      return res.data
    })
  } catch (error) {
    console.log('get all events error:', error)
    return user
  }
  return user;
}