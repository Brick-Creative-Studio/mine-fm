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


export const PostStreamCard: React.FC<CardProps> = ({ streamEvent }) => {
  const attendeeEndpoint = `attendee/${streamEvent?.id}`
  const url = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint

  const listFetcher : Fetcher<Attendee[], string>  = api => axios.get(api).then((res) => {
    return res.data
  }).catch((error) => {
    console.log('error fetching stream data:', error)
  })

  const { data, error } = useSWR(url, listFetcher)



  const formatDate = new Date(streamEvent?.startDate).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 16)
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
          <p className="text-[#B999FA] font-light mt-2 my-2"> Total Payout </p>

        </div>
        <button
          className={'flex justify-center items-center cursor-pointer rounded-tl-lg h-10 w-32 bg-[#FF8500] self-end'}
        >

          <h2 className={'text-[#1D0045] text-[20px] my-0 mr-1'}>.06 ETH</h2>

        </button>
      </div>

      <div className=" w-full h-0.5 bg-[#FF8500]" />

      <div className="flex flex-row justify-between my-2">
        <div className="flex flex-col justify-center mx-2">
          <p className="m-0 text-[#FF8500] font-light "> Time Joined </p>
          {/*seperate api call to get event size*/}
          <p className="m-0 mt-1 self-start text-[#B999FA] "> 5:02 pm EST</p>
        </div>
        <div className="flex flex-col justify-center mx-2">
          <p className="m-0 text-[#FF8500] font-thin"> Time Elapsed </p>
          <p className="m-0 mt-1 self-start text-[#B999FA]"> 1hr 50 min </p>
        </div>
      </div>

    </div>
    // </Link>
  )
}
