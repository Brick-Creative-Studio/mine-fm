import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import { Message } from "../../types/Message";

export default function GroupChatSection({}) {

  const [messages, setMessages] = useState<Message[]>([])

  return (
    <div className={'md:h-[493px] h-52  justify-end'}>

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
