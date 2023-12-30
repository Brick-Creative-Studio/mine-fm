import React from 'react'
import Image from 'next/image'
import { useProfileStore } from "../../stores";
import RsvpModal from "../Modals/RsvpModal";
import { Event } from "../../types/Event";
import { getFetchableUrl } from 'packages/ipfs-service'
import useSWR, { Fetcher } from 'swr'
import axios from 'axios'
import process from "process";

import { Attendee } from "../../types/Attendee";


interface CardProps {
  streamEvent: Event
}


export const LivestreamCard: React.FC<CardProps> = ({ streamEvent }) => {
  const attendeeEndpoint = `attendee/${streamEvent.id}`
  const url = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint

  const listFetcher : Fetcher<Attendee[], string>  = api => axios.get(api).then((res) => {
    return res.data
  }).catch((error) => {
    console.log('error fetching stream data:', error)
  })

  const { data: attendanceData, error } = useSWR(url, listFetcher)



  const formatDate =  new Date(`${streamEvent.startDate}`).toLocaleDateString() +
    ' ' + new Date(`${streamEvent.startDate}`).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  let f = formatDate


  return (
    // <Link href={`/livestream/${streamEvent}`} key={streamEvent.id}>
      <div className='flex flex-col w-72 h-fit rounded-lg bg-[#1D0045]'>

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
          <p className={'text-xl text-[#B999FA] my-auto'}>{streamEvent.title}</p>
          <p className="text-lg my-1 text-[#FF8500]">{streamEvent.organizer}</p>
          <p className="text-[#B999FA] font-thin mt-2 my-2"> {formatDate} </p>

          </div>
          <RsvpModal streamEvent={streamEvent} rsvpList={attendanceData!} />

        </div>

        <div className=" w-full h-0.5 bg-[#FF8500]" />

        <div className="flex flex-row justify-between my-2">
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0 text-[#B999FA] font-light "> # of Attendees </p>
            {/*seperate api call to get event size*/}
            <p className="m-0 mt-1 self-start text-[#B999FA] "> {attendanceData?.length} </p>
          </div>
          <div className="flex flex-col justify-center mx-2">
            <p className="m-0 text-[#B999FA] font-light"> Entrance Fee </p>
            <p className="m-0 mt-1 self-start text-[#B999FA]"> {streamEvent.startingPrice} eth </p>
          </div>
        </div>

      </div>
    // </Link>
  )
}
