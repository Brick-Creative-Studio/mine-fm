import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import { Message } from "../../types/Message";

export default function GroupChatSection({}) {

  const [messages, setMessages] = useState<Message[]>([])

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
