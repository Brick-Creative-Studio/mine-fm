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
    <div className="flex flex-row justify-between bg-[#12002C] p-4 w-full h-fit items-center">
      <div className={'rounded-full bg-red-600 w-[40px] h-[40px]'}/>

      <input
        type={'text'}
        placeholder="send chat"
        className="w-3/4 px-2 py-4 border-0 rounded-md bg-fuchsia-950"
        {...register('comment', { required: true })}
      ></input>
      <button onClick={handleSubmitNewMessage} type="button" className="bg-[#7DD934] h-[36px] w-[36px] rounded-full ">
        <Image src={'/arrow-up.svg'} width={24} height={24} alt="submit comment" />
      </button>
    </div>
  )
}
