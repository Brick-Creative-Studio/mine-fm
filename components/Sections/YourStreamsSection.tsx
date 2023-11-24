import React from 'react'

interface Props {
  aura: string
}
export default function YourStreamsSection({ aura }: Props) {
  return (
    <div  className="mt-8 h-96 w-full ">
      <div className={'bg-[#1D0045] border-[#B999FA] border-solid p-4 rounded-md '}>

        <p className={'text-[#B999FA]'}>You haven't attended any livestreams yet. RSVP to a paid livestream event to
          retrieve a memory card.</p>
      </div>
    </div>
  )
}
