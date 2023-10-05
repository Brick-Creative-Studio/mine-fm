import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { Message } from '../../types/Message'
import axios from 'axios'
import { useEventStore, useProfileStore } from '../../stores'
import io, { Socket } from "socket.io-client";
import process from "process";

type Comment = {
  comment: string
  minerTag: string
  time: string
}

interface Props {
  eventId: string,
  socket: Socket
}

export default function Input({ eventId, socket }: Props) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const [submitting, setSubmitting] = useState(false)
  const [isConnected, setIsConnected] = useState(socket.connected)

  const { aura, m_tag, id: userId } = useProfileStore((state) => state)
  const auraCode = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`


  const time = new Date(Date.now()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  async function createMessage(msg: Message) {
    const endpoint = 'comments/create'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint;

    const messages: Message = await axios.post(url, {
      userId,
      eventId,
      auraCode,
      message: msg.message,
      miner_tag: m_tag as string,
      time

    }).then((res) => {
      console.log(res.data)
      return res.data
    })

    return messages
  }


  async function handleSubmitNewMessage() {
    setSubmitting(true)

    const message: Message = {
      message: getValues('comment'),
      messenger : {
        auraCode : auraCode,
        userId: userId as string,
        miner_tag: m_tag as string,
        socketId: socket.id
      },
      roomName: eventId as string,
      timeSent: time,
    }


    socket.emit('chat', message)
    console.log('emitted', message)


    await createMessage(message).then(() => {
      resetField('comment')
      setSubmitting(false)
    }).catch((error) => {
      console.log('error posting message', error)
    })

  }


  return (
    <div className="flex flex-row justify-between bg-[#12002C] p-4 w-full h-fit items-center">
        <div style={{ background: `${auraCode}`}} className={'rounded-full mx-2 w-[40px] h-[40px]'} />
      <input
        type={'text'}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            e.preventDefault();
            handleSubmitNewMessage();
          }
        }}
        placeholder="send chat"
        className="w-3/4 px-2 py-4 border-0 rounded-md bg-fuchsia-950"
        {...register('comment', { required: true })}
      ></input>
      <button
        onClick={handleSubmitNewMessage}
        type="button"
        className={`bg-[#7DD934] ml-2 h-[36px] w-[36px] rounded-full cursor-pointer` }
      >
        <Image src={'/arrow-up.svg'} width={24} height={24} alt="submit comment" />
      </button>
    </div>
  )
}
