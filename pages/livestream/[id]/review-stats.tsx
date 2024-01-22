import React from 'react'
import { Event } from "../../../types/Event";
import Image from "next/image";
import Link from "next/link";
import CopyButtonLight from "../../../components/CopyButton/CopyButtonLight";
import { ethers } from "ethers";
import { getPreviousTokenPrice } from "../../../data/contract/requests/getPreviousTokenPrice";
import { GetServerSideProps } from "next";
import axios from "axios";
interface Props {
  event: Event | null,
}
export default function ReviewStatsPage({ event } : Props){


  const formatDate = event
    ? new Date(event.startDate)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'N/A'
  const formatTime = event
    ? new Date(event.startDate)?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'N/A'

  const data = getPreviousTokenPrice(event?.tokenAddress as `0x${string}`, 1)
  return (
    <div className="flex flex-col mt-24 items-center justify-center w-full">
      {event ? (

        <div className="flex flex-col p-4 sm:w-full md:w-3/4">
          <div className={'w-full flex justify-center'}>
            <p className={'text-[32px] md:mt-0'}> {`"${event.title}"` + ' Event Summary and Stats'} </p>

          </div>
          <div className="flex flex-col justify-around md:m-8 md:flex-row ">
            <div className="">
              <img
                src={`${event.posterURL}`}
                className={'w-96 h-96'}
                alt={'moodscape poster'}
              />
            </div>
            <div
              className={
                'w-96 h-96 bg-black/50 border-solid border-[#7DD934] rounded-md my-auto items-center justify-center flex'
              }
            >
              <img alt={'memory card'} className={'w-96 h-96'} src={event.memoryCard!} />
            </div>

          </div>
          <div className={'flex mb-10'}>
            <div className="flex flex-col md:mx-auto ">
              <div>
                <p className={'text-2xl md:mt-0'}> Event Info </p>

              </div>

              <div className="mt-2 flex flex-col ">
                <div className={'flex'}>
                  <Image src={'/user-icon-orange.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {`${event.organizer}`}</p>
                </div>
                <div className={'flex'}>
                  <Image src={'/calendar.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {formatDate}</p>
                </div>
                <div className={'flex'}>
                  <Image src={'/clock.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {formatTime}</p>
                </div>
              </div>
            </div>
            <div className={'flex flex-col ml-12 w-1/2'}>
              <p className={'text-2xl mt-0 mb-0 '}> Protocol Details </p>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Network: </p>
                <p className={'text-lg text-[#7DD934]'}>Base </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Address: </p>
                <p className={'text-lg text-[#7DD934]'}>{event.tokenAddress} </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Treasury: </p>
                <p className={'text-lg text-[#7DD934]'}>{event.splitAddress} </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Media: </p>
                <p className={'text-lg text-[#7DD934]'}> IPFS </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Protocol Fee: </p>
                <p className={'text-lg text-[#7DD934]'}> 0.000777 ETH </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}> Initial Price: </p>
                <p className={'text-lg text-[#7DD934]'}> {event.startingPrice} ETH </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}> Last Ticket Price: </p>
                <p className={'text-lg text-[#7DD934]'}>
                  {' '}
                  {ethers.utils.formatEther(data)} ETH{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={'animate-pulse'}>Loading...</div>
      )}
    </div>

  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventID = params?.id?.toString()
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint

  const event: Event | null = eventID
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

  if (!event) {
    return {
      notFound: true,
    }
  }

  const props: Props = {
    event,
  }

  return {
    props,
  }
}