import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'

interface CardProps {
  id: string
}

export const EventCard: React.FC<CardProps> = ({ id }) => {

  return (
    <Link href={`/moodscape/${1}`} key={1}>
      <div className='flex flex-col w-72 h-fit rounded-lg bg-[#463850]/75'>

        <div className="flex h-auto rounded-lg cursor-pointer relative aspect-square w-full">
          <Image
            layout="fill"
            sizes="100vw"
            src={'https://mine-fm.infura-ipfs.io/ipfs/bafybeiba2fhfax54zl2viol57i3egdeybt4xrgjsluieqau22r7k5i4kvq'}
            alt="cover art"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col px-4">
          <p className="text-[#00FF00] font-thin mt-2 my-2">4.8.23</p>
          <p className={'text-xl my-auto'}>Bloomin Moodscape</p>
          <p className="text-lg my-1">@Somewhere Good</p>
          <p className="text-[#00FF00] my-auto">5 - 8pm EST </p>
        </div>
        <div className="mt-2 w-full h-0.5 bg-gray-500/75" />

        <div className="flex flex-row justify-evenly my-2">
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
