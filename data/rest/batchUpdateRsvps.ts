import axios from 'axios'
import { User } from "../../types/User";
import process from "process";
import { Rsvp } from "../../types/Rsvp";


export default async function batchUpdateRsvps(rsvps: Rsvp[]): Promise<Rsvp[]> {
  const endpoint = 'rsvp/group-update'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  let updateRSVPs: Rsvp[] = [];

  try {
    await axios.put(url, rsvps).then((res) => {
      console.log(res.data)
      updateRSVPs = res.data
    })
  } catch (error) {
    console.log('update rsvp error:', error)
    return updateRSVPs
  }
  return updateRSVPs;

}
