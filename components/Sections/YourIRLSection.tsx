import React from 'react'

interface Props {
  aura: string
}
export default function YourIRLSection({ aura }: Props) {

  return (
    <div className="mt-8 h-96 w-full p-4 ">
      <div className={'bg-[#1D0045]  border-[#B999FA] border-solid p-4 rounded-md'}>

        <p className={'text-[#B999FA]'}>You haven't attended any events yet. RSVP to an in-person MINE.FM event first.</p>
      </div>
    </div>
  )
}
