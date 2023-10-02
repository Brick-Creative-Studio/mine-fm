import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'
import { Message } from "../../types/Message";
import { Event } from "../../types/Event";

interface Props {
  event : Event
}
export default function GroupChatSection({ event } : Props) {

  const [messages, setMessages] = useState<Message[]>([])

  return (
    <div className={'md:h-[493px] h-52  justify-end'}>

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
      <Input eventId={event.id!} />
    </div>
  )
}
