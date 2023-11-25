import React, { useEffect, useRef, useState } from 'react'

export default function MessageCell({
  message,
  auraCode,
  minerTag,
  time
}: {
  message: string
  auraCode: string,
  minerTag: string,
  time: string
}) {

  const convertTime = () => {
    return new Date(Date.parse(time)).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={'flex-col h-fit p-2 border-y-[.5px] border-x-0 border-solid border-[#808080] '}>

      <div className={' w-full flex items-center mx-2'}>
        <div className={'rounded-full w-[48px] h-[40px]'} style={{ background: `${auraCode}` }} />
        <div className={'container mx-2'}>
          <p className={'text-blue-500 -mb-2'}> { minerTag } </p>
          <p> { message }</p>
        </div>
      </div>
      <p className={'flex justify-end my-0 -mt-2 text-xs'}> { convertTime() } </p>
    </div>
  )
}
