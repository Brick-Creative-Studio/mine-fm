import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import io from 'socket.io-client'
import axios from 'axios'

import { Message } from '../../types/Message'

export default function GeneralChatSection({}) {
  const [messages, setMessages] = useState<Message[]>([])
  const socket = io('https://minefm-server.herokuapp.com/')

  useEffect(() => {
    const server = `https://minefm-server.herokuapp.com/comments/create`

    socket.on('chat', (message: Message) => {
      setMessages((messages) => [...messages, message])
    })
    return () => {
      socket.off('chat')
    }
  }, [socket])

  return (
    <div className={'md:h-[493px] h-52 flex-col justify-end'}>
      <div className={'flex flex-col-reverse justify-end h-full w-full'}>
        {messages.length ? (
          messages.map(({ message, time, minerTag, aura }, index) => {
            return (
              <MessageCell
                key={index}
                time={time}
                message={message}
                aura={aura}
                minerTag={minerTag}
              />
            )
          })
        ) : (
          <div className={'flex items-center justify-center h-full w-full'}>
            <p> No messages added yet </p>
          </div>
        )}
      </div>
      <Input />
    </div>
  )
}
