import React, { useEffect, useRef, useState } from 'react'
import MessageCell from '../Message/MessageCell'
import Input from '../Input/Input'

export default function GroupChatSection({}) {
  return (
    <div className={'flex flex-col w-full h-96 md:h-[561.5px] justify-end'}>

      <div className={'hover:scroll-auto overflow-scroll flex flex-col-reverse'}>
        {/*//TODO:add map function*/}
        <MessageCell />
        <MessageCell />
      </div>
      <Input />

    </div>
  )
}
