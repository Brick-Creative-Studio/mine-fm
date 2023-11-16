import React from 'react'

interface Props {
  aura: string
}
export default function YourMoodSection({ aura }: Props) {
  return (
    <div  className="m-8 h-96 ">
      <p className={'bg-black/50 p-2 rounded-md'}>

        You haven't attended any livestreams yet. RSVP to a paid livestream event to
        retrieve a memory card.
      </p>
    </div>
  )
}
