import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { Message } from '../../types/Message'
import axios from 'axios'
import { useEventStore, useProfileStore } from '../../stores'
import io from 'socket.io-client'
import createComment from '../../data/rest/createComment'

type Comment = {
  comment: string
  minerTag: string
  time: string
}

export default function Input({}) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  // const socket = io('https://minefm-server.herokuapp.com/livestream_chatroom')
  const socket = io('http://localhost:3002')
  const { aura, m_tag, id: userId } = useProfileStore((state) => state)
  const { id: eventId, title, posterUrl } = useEventStore((state) => state)

  const time = new Date(Date.now()).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  async function handleSubmitNewMessage() {
    const message: Message = {
      message: getValues('comment'),
      aura: aura,
      minerTag: m_tag!,
      time: time,
    }

    const auraCode = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`

    socket.emit('chat', message)
    console.log('emitted', message)
    const server = `https://minefm-server.herokuapp.com/comments/create`

    const eventMessage = {
      userId: 'd0b91814-560b-4075-82a5-a2366649b383',
      eventId: '41037306-8a64-4ea4-a1e8-25fac50195d8',
      auraCode,
      message: message.message,
    }
    await createComment(eventMessage)
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
        <div className={'rounded-full bg-red-600 w-[40px] h-[40px]'} />
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
        className="bg-[#7DD934] h-[36px] w-[36px] rounded-full "
      >
        <Image src={'/arrow-up.svg'} width={24} height={24} alt="submit comment" />
      </button>
    </div>
  )
}
