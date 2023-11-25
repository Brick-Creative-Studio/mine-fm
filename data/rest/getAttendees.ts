import process from "process";
import { Attendee } from "../../types/Attendee";
import axios from "axios";
import { User } from "../../types/User";

export default async function getAttendees(eventID: string){
  const attendeeEndpoint = `attendee/${eventID}`
  const attendeeURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint

  const attendeesList: Attendee[] | null = eventID
    ? await axios
      .get(attendeeURL)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error fetching stream data:', error)
      })
    : null

  const attendees: User[] | null = attendeesList
    ? await Promise.all(
      attendeesList.map(async (attendee) => {
        return await axios
          .post(userURL, {
            id: attendee.userID,
          })
          .then((res) => {
            return res.data
          })
          .catch((error) => {
            console.log('error fetching stream data:', error)
          })
      })
    )
    : null

  console.log('swr run list', attendees)


  return attendees
}
