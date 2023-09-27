import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import io from 'socket.io-client'
import axios from 'axios'

import { Message } from '../../types/Message'
import process from "process";
import { loader } from "next/dist/build/webpack/config/helpers";

interface Props {
  eventId: string;
}
export default function GeneralChatSection({ eventId } : Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const socket = io(process.env.NEXT_PUBLIC_BASE_URL!)
  const [isLoading, setLoading] = useState(true)



  async function loadMessages(){
    const endpoint = 'comments/where'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint;
    console.log('url')

    const messages : Message[] = await axios.post(url, {
        eventId
    }).then((res) => {
      console.log('msgs', res.data)
      return res.data
    }).catch((error) => {
      console.log('comment load error:', error)
    })

    return messages;
  }

  useEffect(() => {
    socket.on('chat', (message: Message) => {
      setMessages((messages) => [...messages, message])
    })
    return () => {
      //TODO: Verify if this is proper socket clean up
      socket.off('chat')
    }
  }, [socket])

  useEffect(() => {
    async function loader(){
      const eventComments = await loadMessages()
      setMessages(eventComments)
    }

    loader()
  },[])


  //TODO: On connection load messages into array

  return (
    <div className={'md:h-[525px] h-72  justify-end'}>

      <div className={'flex flex-col-reverse h-full w-full scroll-smooth overflow-scroll'}>
        <div className={''}>
        {messages.length ? (
          messages.map(({ message, time, miner_tag, auraCode }, index) => {
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
      <Input eventId={eventId} />
    </div>
  )
}
