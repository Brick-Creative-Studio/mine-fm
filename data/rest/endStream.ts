import axios from 'axios'
import { Event } from "../../types/Event";
import { Rsvp } from "../../types/Rsvp";

export default async function endStream(eventID: string, treasurySum: number){
  const endpoint = 'event/end'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  let data : Rsvp[]
  try {
    data = await axios.post(url, {
      id: eventID,
      treasury: treasurySum
    }).then((res) => {
      console.log(res.data)
      return res.data
    }).catch((error) => {
      console.log('Error ending event:', error)
    })
  } catch (error) {
    console.log('Error ending event:', error)
    return
  }
  return data;
}