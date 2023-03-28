import React from 'react'
import { MoodscapeCard } from 'components/Cards/MoodscapeCard'

export default function Explore({}) {
  return (
    <div className="flex flex-col mt-28 mx-32">
      <div>
        <h2> Moodscapes </h2>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col">
          <h3 className="mx-8"> Explore </h3>
          <div className="w-auto h-0.5 bg-sky-500/75" />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-500/75" />

      <div className="grid grid-cols-4 gap-4 p-4">
        <MoodscapeCard id={'1'} />
      </div>
    </div>
  )
}
