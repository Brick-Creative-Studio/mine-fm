import React, { useEffect, useRef, useState } from 'react'
import MessageCell from "../Message/MessageCell";

export default function GeneralChatSection({}){

  return(
    <div className={'flex w-full h-full'}>

      <MessageCell/>

    </div>
    )

}