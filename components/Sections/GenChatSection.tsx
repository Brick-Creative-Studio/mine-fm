import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import io from 'socket.io-client'
import axios from 'axios'

import { Message } from '../../types/Message'


export default function GeneralChatSection({}) {
  const [messages, setMessages] = useState<Message[]>([])
  // const socket = io('https://minefm-server.herokuapp.com/')
  const socket = io('http://localhost:3002')

  useEffect(() => {
    socket.on('chat', (message: Message) => {
      setMessages((messages) => [...messages, message])
    })
    return () => {
      //TODO: Verify if this is proper socket clean up
      socket.off('chat')
    }
  }, [socket])

  //TODO: On connection load messages into array

  return (
    <div className={'md:h-[525px] h-72  justify-end'}>

      <div className={'flex flex-col-reverse h-full w-full scroll-smooth overflow-scroll'}>
        <div className={''}>
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
      </div>
      <Input />
    </div>
  )
}
