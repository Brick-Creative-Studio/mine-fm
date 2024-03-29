import axios from 'axios'
import { User } from "../../types/User";
import process from "process";
import { Rsvp } from "../../types/Rsvp";


export default async function updateRsvp(rsvp: Rsvp) {
  const endpoint = 'rsvp/update'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  let updateRSVP;

  try {
    await axios.put(url, rsvp).then((res) => {
      console.log(res.data)
      updateRSVP = res.data
      return res.data
    })
  } catch (error) {
    console.log('update rsvp error:', error)
    return error
  }
  return updateRSVP;

}
