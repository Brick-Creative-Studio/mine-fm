import React, { useEffect, useRef, useState } from 'react'


export default function MessageCell({}){

  return (
    <div className={'flex-col h-32 p-2 border-y-2 border-x-0 border-solid border-white/50 bg-[#463850]/75'}>
      <div className={' w-full flex items-center mx-2'}>
        <div className={'rounded-full bg-red-600 w-[48px] h-[40px]'}/>
        <div className={'container mx-2'}>
          <p className={'text-blue-500 -mb-2'}> @miner-tag </p>
        <p> Here's some text for a brand new message </p>
        </div>
      </div>
      <p className={'flex justify-end my-0 -mt-2 text-xs'}> 2:32pm </p>
    </div>
  )
}