import React, { useEffect, useRef, useState } from 'react'

export default function MessageCell({
  message,
  aura,
  minerTag,
  time
}: {
  message: string
  aura: {
    direction : string,
    colorOne : string,
    colorTwo : string,
    colorThree : string,
  }
  minerTag: string,
  time: string
}) {
  const gradient = `linear-gradient(to ${aura?.direction}, ${aura?.colorOne}, ${aura?.colorTwo}, ${aura?.colorThree})`

  return (
    <div className={'flex-col h-fit p-2 border-y-2 border-x-0 border-solid border-white/50 bg-[#463850]/75'}>

      <div className={' w-full flex items-center mx-2'}>
        <div className={'rounded-full w-[48px] h-[40px]'} style={{ background: `${gradient}` }} />
        <div className={'container mx-2'}>
          <p className={'text-blue-500 -mb-2'}> { minerTag } </p>
          <p> { message }</p>
        </div>
      </div>
      <p className={'flex justify-end my-0 -mt-2 text-xs'}> { time } </p>
    </div>
  )
}
