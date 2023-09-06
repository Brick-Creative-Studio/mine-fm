import axios from 'axios'
import { Event } from "../../types/Event";
import process from "process";

export default async function getAllEvents(): Promise<Event[] | undefined>{
  const endpoint = 'event'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  let data;
  try {
    await axios.get(url).then((res) => {
      data = res.data;
      console.log('onSuccess', data)

      return data;
    }).catch((error) => {
      console.log('get all events error:', error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the
        // browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      return error
    })
  } catch (error) {
    console.log('get all events error:', error)
    return
  }
  return data
}