import React, { useEffect, useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { MessagesContainer } from 'components/Containers/MessagesContainer'
import Image from 'next/image'
import io from 'socket.io-client'
import { Message } from 'types/Message'

type Comment = {
  comment: string,
  aura: string,
  minerTag: string
}

export const CommentCell: React.FC<Comment> = ({ comment, aura, minerTag}) => {
  return(
      <div className="flex w-full h-16 bg-transparent rounded-xl border-solid border-r-0 border-gray-400">
        {comment}
      </div>
      )
}

export default function EventComments({}) {
  const { register, handleSubmit, getValues, resetField } = useForm<Comment>()
  const socket = io('https://minefm-server.herokuapp.com/')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmitNewMessage = () => {
    const message: Message = {
      message: getValues('comment'),
      mTag: '',
      aura: '',
    }

    socket.emit('message', message)
    // resetField('comment')


  }

  useEffect(() => {
    
    socket.on('message', (message: Message) => {
      console.log('message submitted', getValues('comment'))
        setMessages((messages) => [...messages, message])
      resetField('comment')

      console.log('msgs obj', ...messages)
      //handleNewMessage(message.message)
    })
    return () => {
      socket.off('message')
    }
  }, [socket])

  return (
    <form>
      <div className="flex flex-col m-8 md:w-full sm:w-full border-solid border-white h-96 px-2 bg-slate-100/75 text-black w-5/6 rounded-xl">
        <h3> Share a message with the DJs </h3>
        <div className="h-full items-center justify-center border-solid border-black/50 rounded-lg bg-blue-50/75 overflow-y-scroll">
          <div className={'w-full'} >
            {messages.length ? (
              messages.map(({ message, mTag, aura }, index) => {
                return (
                    <CommentCell key={index} comment={message} aura={aura} minerTag={mTag}/>
                )
              })
            ) : (
                <div className={'flex items-center justify-center h-full w-full'}>
                  <p >No comments added yet</p>

                </div>
            )}
          </div>
          {/* <MessagesContainer messages={} eventTitle={} /> */}
        </div>

        <div className="flex flex-row h-12 w-full mb-2  ">
          <input
            type={'text'}
            placeholder="leave a comment here"
            className="h-full w-full px-2 rounded-lg"
            {...register('comment', { required: true })}
          ></input>
          <button
            type="button"
            onClick={handleSubmitNewMessage}
            className="bg-green-800 h-full w-12 rounded-lg"
          >
            <Image src={'/paper-plane.svg'} width={18} height={18} alt="submit comment" />
          </button>
        </div>
      </div>
    </form>
  )
}
