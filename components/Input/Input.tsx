import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'

type Comment = {
  comment: string
  minerTag: string
  time: string
}

export default function Input({}) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()

  return (
    <div className="flex flex-row h-12 w-full">
      <input
        type={'text'}
        placeholder="leave a comment here"
        className="w-full px-2 border-t-0"
        {...register('comment', { required: true })}
      ></input>
      <button type="button" className="bg-green-800 h-full w-12 ">
        <Image src={'/paper-plane.svg'} width={18} height={18} alt="submit comment" />
      </button>
    </div>
  )
}
