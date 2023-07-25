import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import RsvpModal from "../Modals/RsvpModal";
import { Event } from "../../types/Event";
import { getFetchableUrl } from 'packages/ipfs-service'


interface CardProps {
  streamEvent: Event
}


export const LivestreamCard: React.FC<CardProps> = ({ streamEvent }) => {
  const baseURL = 'https://mine-fm.infura-ipfs.io/'
  const posterUrl =  baseURL + streamEvent.posterURL
  const formatDate = new Date(streamEvent.startDate).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 16)
  let f = formatDate


  return (
    // <Link href={`/livestream/${streamEvent}`} key={streamEvent.id}>
      <div className='flex flex-col w-72 h-fit rounded-lg bg-[#463850]/75'>

        <div className="flex h-auto rounded-lg cursor-pointer relative aspect-square w-full">
          <Image
            layout="fill"
            sizes="100vw"
            src={getFetchableUrl(streamEvent.posterURL)!!}
            alt="cover art"
            className="rounded-lg"
          />
        </div>
        <div className={'flex justify-between'}>
        <div className="flex flex-col px-2">
          <p className={'text-xl my-auto'}>{streamEvent.title}</p>
          <p className="text-lg my-1">Hosted by {streamEvent.organizer}</p>
          <p className="text-[#00FF00] font-thin mt-2 my-2"> {formatDate} </p>

        </div>
          <RsvpModal streamEvent={streamEvent} />

        </div>

        <div className="mt-2 w-full h-0.5 bg-gray-500/75" />

        <div className="flex flex-row justify-between my-2">
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0"> # of Attendees </p>
            {/*seperate api call to get event size*/}
            <p className="m-0 mt-1 text-green-200 self-start"> Unknown </p>
          </div>
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0"> Entrance Fee </p>
            <p className="m-0 mt-1 text-green-200 self-start"> .01 eth </p>
          </div>
        </div>

      </div>
    // </Link>
  )
}
