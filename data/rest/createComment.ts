import axios from "axios";
import { Message } from "../../types/Message";


export default async function createComment(comment: any) {
  const url = `https://minefm-server.herokuapp.com/comments/create`
  let data = undefined;

  const customConfig = {
    headers: {
      "Content-Type": "application/json",
    },
  };

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