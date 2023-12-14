import axios from 'axios'
import process from "process";
import { Event } from "../../types/Event";



export default async function updateEvent(eventData: any) {
  const endpoint = 'event'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  let event;

  try {
    await axios.put(url, eventData).then((res) => {
      console.log(res.data)
      event = res.data
      return res.data
    })
  } catch (error) {
    console.log('create event error:', error)
    return error
  }
  return event;

}
