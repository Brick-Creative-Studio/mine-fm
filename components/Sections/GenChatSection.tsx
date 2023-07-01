import React, { useEffect, useRef, useState } from 'react'
import MessageCell from "../Message/MessageCell";
import Input from '../Input/Input'

export default function GeneralChatSection({}){

  return(
    <div className={'flex flex-col w-full  mb-2'}>
      <div className={'hover:scroll-auto h-64 overflow-scroll flex flex-col-reverse'}>
        {/*//TODO:add map function*/}
        <MessageCell />
        <MessageCell />
        <MessageCell />
        <MessageCell />
        <MessageCell />
        <MessageCell />
        <MessageCell />
        <MessageCell />
      </div>
      <Input />
    </div>
    )

}