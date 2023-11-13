import React from 'react'

interface Props {
  aura: string
}
export default function YourIRLSection({ aura }: Props) {

  return (
    <div className="m-8 h-96">
      <p className={'bg-black/50 p-2 rounded-md'}>

        You haven't attended any events yet. RSVP to an in-person MINE.FM event first.

      </p>
    </div>
  )
}
