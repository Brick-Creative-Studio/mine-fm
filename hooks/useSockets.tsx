import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import { useMsgStore } from 'stores/useMsgStore'
import { Message } from 'types/Message'

const socket = io('https://minefm-server.herokuapp.com/')

export const useSockets = () => {
  const { messages, setMessages } = useMsgStore((state) => state)
  const [msg, setMsgString] = useState('')

  useEffect(() => {
    socket.on('message', (message: Message) => {

        setMessages(message)
    })
  })
  return {
    socket,
    setMessages,
    messages
  }
  
}
