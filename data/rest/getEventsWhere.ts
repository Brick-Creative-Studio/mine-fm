import axios from 'axios'
import { Event } from "../../types/Event";
import process from "process";

export default async function getEventsWhere(requestParam: any): Promise<Event[] | undefined>{
  const endpoint = 'event/where'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  try {
    return await axios.post(url, requestParam).then((res) => {
      console.log('explore page event req',res)
      return res.data
    }).catch((error) => {
      console.log('get all events error:', error)
      return error
    })
  } catch (error) {
    console.log('get all events error:', error)
    return
  }
}