import React from 'react'
import Image from 'next/future/image'

export default function EventMoods({}) {
  return (
    <div className="flex flex-col w-full m-8">
      <div className="flex h-fit mb-8 rounded-lg h-32 border-solid border-white bg-[#535353]/50">
        <div className="h-full w-32 relative bg-gradient-to-r from-yellow-500 to-yellow-100 rounded-lg">
            <Image alt={'keith-headshot'} src={"/stock/keithcharles-headshot.jpeg"} className={'opacity-50'} fill />
        </div>
        <div className="m-2 ml-4">
          <p> Curator: Keith Charles </p>
          <p> Mood: Urgent </p>
        </div>
      </div>
      <div className="flex h-32 rounded-lg border-solid border-white bg-[#535353]/50">
        <div className="h-full relative w-32 bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg">
            <Image alt={'blue-headshot'} src={"/stock/stonie-blue-headshot.jpg"} className={'opacity-50'} fill />
            {/*<div className="h-full w-32 justify-self-end bg-gradient-to-r from-blue-500 to-blue-300 rounded-lg"/>*/}

        </div>
        <div className="m-2 ml-4">
          <p> Curator: Stonie Blue </p>
          <p> Mood: Uplift </p>
        </div>
      </div>
    </div>
  )
}
