import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { Message } from '../../types/Message'
import axios from 'axios'
import { useEventStore, useProfileStore } from '../../stores'
import io from 'socket.io-client'
import process from "process";

type Comment = {
  comment: string
  minerTag: string
  time: string
}

interface Props {
  eventId: string
}

export default function Input({ eventId }: Props) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  // const socket = io('https://minefm-server.herokuapp.com/livestream_chatroom')
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL
  const socket = io(baseURL!)
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
    const message: Message = {
      message: getValues('comment'),
      auraCode,
      eventId: eventId as string,
      userId: userId as string,
      miner_tag: m_tag as string,
      time: time,
    }


    socket.emit('chat', message)
    console.log('emitted', message)


    await createMessage(message)
    resetField('comment')
  }

  async function handleCreateNewRoom() {
    const data = {
      roomName: 'newRoom',
    }

    socket.emit('create_room', data)
    console.log('emitted', data)
  }

  return (
    <div className="flex flex-row justify-between bg-[#12002C] p-4 w-full h-fit items-center">
      <button className={'bg-transparent'} onClick={handleCreateNewRoom}>
        <div style={{ background: `${auraCode}`}} className={'rounded-full w-[40px] h-[40px]'} />
      </button>
      <input
        type={'text'}
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
