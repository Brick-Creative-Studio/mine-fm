import axios from 'axios'
import { Event } from "../../types/Event";


export default async function createEvent(event: Event) : Promise<Event | undefined> {
  const url = `https://minefm-server.herokuapp.com/event/create`
  try {
    await axios.post(url, event).then((res) => {
      console.log(res.data)
      return res.data
    })
  } catch (error) {
    console.log('create event error:', error)
    return
  }

}