import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'

interface CardProps {
  id: string
}

export const LivestreamCard: React.FC<CardProps> = ({ id }) => {

  return (
    <Link href={`/livestream/${id}`} key={1}>
      <div className='flex flex-col w-72 h-fit rounded-lg bg-[#463850]/75'>

        <div className="flex h-auto rounded-lg cursor-pointer relative aspect-square w-full">
          <Image
            layout="fill"
            sizes="100vw"
            src={'/stock/stonie-test-poster.jpeg'}
            alt="cover art"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col px-2">
          <p className={'text-xl my-auto'}>Bloomin Moodscape</p>
          <p className="text-lg my-1">@Somewhere Good</p>
          <p className="text-[#00FF00] font-thin mt-2 my-2">4.8.23 / 5pm EST</p>

        </div>
        <div className="mt-2 w-full h-0.5 bg-gray-500/75" />

        <div className="flex flex-row justify-between my-2">
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0"> # of Attendees </p>
            <p className="m-0 mt-1 text-green-200 self-start"> 40+ </p>
          </div>
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0"> Entrance Fee </p>
            <p className="m-0 mt-1 text-green-200 self-start"> .01 eth </p>
          </div>
        </div>

      </div>
    </Link>
  )
}
