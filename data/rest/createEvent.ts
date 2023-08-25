import axios from 'axios'
import { Event } from "../../types/Event";


export default async function createEvent(event: any) : Promise<Event | undefined> {
  const url = `https://minefm-server.herokuapp.com/event/create`
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
