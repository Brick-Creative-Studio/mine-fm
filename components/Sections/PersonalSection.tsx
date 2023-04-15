import React from 'react'
import { MoodscapeCard } from 'components/Cards/MoodscapeCard'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore } from '../../stores'

export default function PersonalSection({}) {
  const { signerAddress: address } = useLayoutStore()

  return (
    <div className="flex flex-col m-8 ">
      <div className="flex w-full rounded-lg h-56 border-solid border-white bg-[#535353]/50 p-4">
        <div className=" h-32 w-32 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full" />
        <div className="m-2 ml-4">
          <p> Miner Tag: Blobitty </p>
          <p> Moody Votes Recieved: 0 </p>
          <Link
            href={{
              pathname: `/profile/${address}`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <p>View Profile</p>
              <Image
                src={'/chevron-right.svg'}
                width={32}
                height={32}
                alt="gallery button"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
