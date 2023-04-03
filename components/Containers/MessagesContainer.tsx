import React, { ReactElement } from 'react'

interface MsgContainerProps {
  messages: Messages[] | undefined
  eventTitle?: string 
}

type Messages = {
    message: string,
    time: string,
    mTag: string
}

export const MessagesContainer: React.FC<MsgContainerProps> = ({
    messages,
    eventTitle,
}) => {

    function handleNewMessage(){
        messages
    }

    return (
        <div>

        </div>
    )
}

export default MessagesContainer;
