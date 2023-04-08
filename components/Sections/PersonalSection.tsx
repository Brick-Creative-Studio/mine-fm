import React from 'react'
import { MoodscapeCard } from 'components/Cards/MoodscapeCard'

export default function PersonalSection({}) {
  return (
    <div className="flex flex-col m-8 ">
      <div className="flex w-full rounded-lg h-56 border-solid border-white bg-[#535353]/50 p-4">
        <div className=" h-32 w-32 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
        <div className="m-2 ml-4">
          <p> Miner Tag: Blobitty </p>
          <h2> Moody Votes Recieved: 0 </h2>
            <p> View Profile  </p>

        </div>
      </div>{' '}
    </div>
  )
}
