import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import io, { Socket } from "socket.io-client";
import axios from 'axios'
import { Message } from '../../types/Message'
import process from "process";
import { Comment } from "../../types/Comment";

interface Props {
  eventId: string;
  socket: Socket,
}
export default function GeneralChatSection({ eventId, socket } : Props) {
  const [comments, setComments] = useState<Comment[]>([])



  async function loadMessages(){
    const endpoint = 'comments/where'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint;

    const messages : Comment[] = await axios.post(url, {
        eventId
    }).then((res) => {
      return res.data
    }).catch((error) => {
      console.log('comment load error:', error)
    })

    return messages;
  }

  useEffect(() => {

    socket.on('chat', (message: Message) => {
      console.log('chatReceived', message)
      const comment = {
        message: message.message,
        auraCode: message.messenger.auraCode,
        eventId: message.roomName,
        miner_tag: message.messenger.miner_tag,
        time: message.timeSent
      }
      setComments((comments) => [...comments, comment])
    })

  }, [socket])

  useEffect(() => {
    async function loader(){
      const eventComments = await loadMessages()
      setComments(eventComments)
    }

    loader()
  },[])


  return (
    <div className={'md:h-[525px] h-96  justify-end'}>

      <div className={'flex flex-col-reverse  h-full w-full scroll-smooth overflow-scroll'}>
        <div className={''}>
        {comments.length ? (
          comments.map(({ message, auraCode, time, miner_tag }, index) => {
            return (
              <MessageCell
                key={index}
                time={time}
                message={message}
                auraCode={auraCode}
                minerTag={miner_tag}
              />
            )
          })
        ) : (
          <div className={'flex items-center justify-center h-full w-full'}>
            <p> No messages added yet </p>
          </div>
        )}
        </div>
      </div>
      <Input socket={socket} eventId={eventId} />
    </div>
  )
}
