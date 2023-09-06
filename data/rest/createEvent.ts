import axios from 'axios'
import { Event } from "../../types/Event";
import process from "process";


export default async function createEvent(event: any) : Promise<Event | undefined> {
  const endpoint = 'event/create'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  let data : Event
  try {
    data = await axios.post(url, event).then((res) => {
      console.log(res.data)
      return res.data
    }).catch((error) => {
      console.log('fetch user error:', error)
    })
  } catch (error) {
    console.log('create event error:', error)
    return
  }
  return data;

}
