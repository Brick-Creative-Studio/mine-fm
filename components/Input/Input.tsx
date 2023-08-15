import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'
import { Message } from "../../types/Message";
import axios from "axios";
import { useProfileStore } from "../../stores";
import io from 'socket.io-client'
import createComment from "../../data/rest/createComment";

type Comment = {
  comment: string
  minerTag: string
  time: string
}

export default function Input({}) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  const socket = io('https://minefm-server.herokuapp.com/')
  const { aura, m_tag, id } = useProfileStore((state) => state) ;

  const time = new Date(Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  async function handleSubmitNewMessage (){
    const message: Message = {
      message: getValues('comment'),
      aura: aura,
      minerTag: m_tag!,
      time: time
    }

    socket.emit('chat', message)
    const server = `https://minefm-server.herokuapp.com/comments/create`

    const eventMessage = {}
    //await createComment(eventMessage)
    resetField('comment')

  }



  return (
    <div className="flex flex-row w-full h-fit">
      <input
        type={'text'}
        placeholder="leave a comment here"
        className="w-full px-2 py-4 border-1"
        {...register('comment', { required: true })}
      ></input>
      <button onClick={handleSubmitNewMessage} type="button" className="bg-green-800 h-full w-12 ">
        <Image src={'/paper-plane.svg'} width={18} height={18} alt="submit comment" />
      </button>
    </div>
  )
}
