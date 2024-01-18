import axios from 'axios'
import { Rsvp } from '../../types/Rsvp'
import process from 'process'

export default async function getRSVPsWhere(userId: string) {
  const endpoint = `rsvp/findAllWhere/${userId}`
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  let data
  try {
    return await axios.get(url).then((res) => {
      data = res.data
      return data
    })
  } catch (error) {
    console.log('get all rsvps by user error:', error)
  }
  return data
}
