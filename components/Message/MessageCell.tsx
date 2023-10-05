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

  return (
    <div className={'flex-col h-fit py-0 border-y-[.5px] border-x-0 border-solid border-[#808080] '}>

      <div className={' w-full flex items-center'}>
        <div className={'rounded-full w-[32px] h-[32px] p-4 mx-2'} style={{ background: `${auraCode}` }} />
        <div className={'container'}>
          <p className={'text-blue-500 -mb-2'}> { minerTag } </p>
          <p> { message }</p>
        </div>
      </div>
      <p className={'flex justify-end my-0 -mt-2 text-xs'}> { time } </p>
    </div>
  )
}
