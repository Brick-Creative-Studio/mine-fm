import React from "react";
import { PostStreamCard } from "../../../components/Cards/PostStreamCard";
import { GetServerSideProps } from "next";
import process from "process";
import { Event } from "../../../types/Event";
import axios from "axios";

interface Props {
  eventInfo: Event | null
}

export default function ExitStreamPage({ eventInfo }: Props){


  return (
    <div className={'flex flex-col justify-center items-center'}>
      <p className={'text-[36px] text-center mt-24 bg-gradient-to-b from-[#C00A00] via-35% to-[#FF8500] text-transparent bg-clip-text'}> Thank You For Listening </p>

      <PostStreamCard streamEvent={eventInfo!}/>
      <button
        type="button"
        className={`bg-[#FF8500] border-[#FF8500] m-4 w-3/4 md:w-72 rounded-md cursor-pointer`}
        disabled={true}

      >
        <h2 className={'text-[#1D0045] '}>{`Claim Rewards`}</h2>
      </button>
      <div className={'flex justify-around w-full'}>
        <div className={'flex'}>
          <img src={'/double-arrow-left.svg'} alt={'explore-livestreams'}/>
          <h3 className={'text-[#B999FA]'}>Livestreams</h3>
        </div>
        <div className={'flex'}>
          <h3 className={'text-[#B999FA]'}>Profile</h3>
          <img src={'/double-arrow-right.svg'} alt={'explore-livestreams'}/>

        </div>

      </div>


    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventID = params?.id?.toString()
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint


  const eventInfo: Event | null = eventID
    ? await axios
      .post(eventURL, {
        id: eventID,
      })
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error fetching event info', error)
      })
    : null

  if (!eventID) {
    return {
      notFound: true,
    }
  }

  if (!eventInfo) {
    return {
      notFound: true,
    }
  }



  const props: Props = {
    eventInfo,
  }
  return {
    props,
  }
}
