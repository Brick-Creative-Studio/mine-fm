import React, { useEffect, useRef, useState } from 'react'
import MessageCell from "../Message/MessageCell";
import Input from '../Input/Input'
import io from 'socket.io-client'
import axios from "axios";

import { Message } from "../../types/Message";

export default function GeneralChatSection({}){
  const [messages, setMessages] = useState<Message[]>([])
  const socket = io('https://minefm-server.herokuapp.com/')


  useEffect(() => {
    const server = `https://minefm-server.herokuapp.com/comments/create`

    socket.on('message', (message: Message) => {
      setMessages((messages) => [...messages, message])
      console.log('msgs obj', ...messages)
      //handleNewMessage(message.message)
    })
    return () => {
      socket.off('message')
    }
  }, [socket])



  return(
    <div className={'flex flex-col w-full h-96 md:h-[561.5px] '}>
      <div className={'hover:scroll-auto overflow-scroll flex flex-col-reverse'}>
        {/*//TODO:add map function*/}

      </div>
      <Input />
    </div>
    )

}