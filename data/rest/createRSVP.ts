import axios from 'axios'


export default async function createRSVP(eventID: string, userID: string, address: string, purchaseTime: Date) {
  const endpoint = 'rsvp/create'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  const rsvpData = {
    userID: userID,
    eventID: eventID,
    walletAddress: address,
    entranceTime: purchaseTime,
  }
  try {
    return await axios.post(url, rsvpData).then((res) => {
      console.log(res.data)
      return res.data
    }).catch((error) => {
      console.log('error creating rsvp:', error)
    })
  } catch (error) {
    console.log('error creating rsvp:', error)
    return
  }
}
