import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Image from 'next/image'

type Comment = {
  miner_tag: string
  comment: string
  timestamp: string
}

export default function EventComments({}) {
  return (
    <form>
      <div className="flex flex-col m-8  border-solid border-white h-96 px-2 bg-slate-100/75 text-black w-5/6 rounded-xl">
        <h3> Comments </h3>
        <div className="h-full border-solid border-black/50 rounded-lg overflow-y-scroll"></div>
        <div className="flex flex-row h-12 w-full mb-2  ">
          <input
            type={'text'}
            placeholder="leave a comment here"
            className="h-full w-full px-2 rounded-lg"
            
          ></input>
          <button type='button' className="bg-green-800 h-full w-12 rounded-lg">
            <Image src={'/paper-plane.svg'} width={18} height={18} alt="submit comment" />
          </button>
        </div>
      </div>
    </form>
  )
}
