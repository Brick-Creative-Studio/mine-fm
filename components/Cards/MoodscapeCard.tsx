import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface CardProps {
  id: string
}

export const MoodscapeCard: React.FC<CardProps> = ({ id }) => {
  return (
    <Link href={`/moodscape/${id}`} key={id}>
      <div className="w-64 h-fit rounded-lg bg-[#535353]/50 p-2">
        <div className="flex h-auto ml-1 border-solid border-[#EFE9DB] drop-shadow-lg rounded-lg mb-4 cursor-pointer relative aspect-square">
          <Image
            layout="fill"
            sizes="100vw"
            src={'/stock/bloomin_poster_square.png'}
            alt="cover art"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-row justify-between my-4">
          <div>Bloomin Moodscape</div>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="mr-4">@Somewhere Good</div>
          <div className="text-[#00FF00] ml-2">4/8/23</div>
        </div>
        <div className="flex flex-row justify-between mb-4">
          <div className="">Brooklyn, NY</div>
          <div className="text-[#00FF00] ml-2">5 - 8pm EST </div>
        </div>
        <div className="my-2 w-full h-0.5 bg-gray-500/75" />

        <div className="flex flex-row justify-evenly mt-2">
          <div className=" bg-gradient-to-r from-yellow-500 to-yellow-100 px-2 rounded-lg flex flex-col justify-center items-center">
            <p className="text-black"> Urgent </p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-300 px-2 rounded-lg flex flex-col justify-center items-center">
            <p className="text-black"> Uplift </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
