import axios from "axios";
import { Message } from "../../types/Message";
import * as process from "process";


export default async function createComment(comment: any) {
  let data = undefined;
  const endpoint = 'comments/create'
  const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

  try {
    data = await axios.post(url, comment).then((res) => {
      console.log(res.data)
      return res.data
    }).catch((error) => {
      console.log('create comment error:', error)
    })
  } catch (error) {
    console.log('create comment error:', error)
    return
  }
  return data;
}