import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useProfileStore } from '../../stores'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import useSWR, { Fetcher, Key } from 'swr'
import { Event } from '../../types/Event'
import { Attendee } from '../../types/Attendee'
import { User } from '../../types/User'
import process from 'process'
import { useConnectModal } from '@rainbow-me/rainbowkit'

export default function StreamInfoPage({}) {
  const router = useRouter()
    const { id: pathID } = router.query
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { id: accountId } = useProfileStore()

  const endpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  const attendeeEndpoint = `attendee/${pathID}`
  const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint

  async function fetchEvent(url: string) {
    if (pathID){
      //fetch event info
      const data: Event = await axios
        .post(url, {
          id: pathID,
        })
        .then((res) => {
          // setEvent(res.data)
          console.log('event data', res.data)
          return res.data
        })
        .catch((error) => {
          // setEvent(null)
          router.push('/404')
          console.log('error fetching event data:', error)
        })
      return data;
    }
  }

  const { data: eventData, error } = useSWR([eventURL], fetchEvent, {
    revalidateOnMount: true
  })

  const formatDate = eventData
    ? new Date(eventData.startDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    : 'N/A'
  const formatTime = eventData
    ? new Date(eventData.startDate).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    : 'N/A'

  async function fetchAttendeeList (url: string){
    //fetch attendees
    return await axios
      .get(url)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error fetching stream data:', error)
      })
  }

  async function fetchUserList(attendees: Attendee[]) {

    const rsvpList: User[] = await Promise.all(attendees.map((attendee) => {
      return axios
        .post(userURL, {
          id: attendee.userID,
        })
        .then((res) => {
          // setAttendees(res.data)
          console.log('attendees', res.data)
          return res.data
        })
        .catch((error) => {
          console.log('error fetching stream data:', error)
        })
    }))
    return rsvpList
  }

  async function fetchAttendance(url : string){
    const dataList : User[] = await fetchAttendeeList(url).then((attendees) => {
      return fetchUserList(attendees)
    })
    return dataList;
  }

  const { data: attendanceData } = useSWR([rsvpURL], fetchAttendance)

  async function rsvp(event: Event) {
    const attendeeEndpoint = `attendee/create`
    const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint

    if (!isConnected && openConnectModal) {
      openConnectModal()
      return
    }

    if (event?.ownerAddress === (address as string)) {
      await router.push(`/livestream/${pathID}`, `/livestream/${pathID}`, { shallow: false })
      return
    }

    if (attendanceData && attendanceData?.length > 1) {
      attendanceData.map((user) => {
        if (user.walletAddress === (address as string)) {
          router.push(`/livestream/${pathID}`, `/livestream/${pathID}`, { shallow: false })
          return
        }
      })
    }

    await axios
      .post(rsvpURL, {
        userID: accountId,
        eventID: pathID,
      })
      .then((res) => {
        router.push(`/livestream/${pathID}`, `/livestream/${pathID}`, { shallow: false })
      })
      .catch((error) => {
        console.log('error rsvping to event:', error)
      })
  }
  function formatAuraList(userList : User[]){
    if(userList.length > 5){
      return userList.slice(0, 5)
    }
    return userList
  }


  return (
    <div className="flex flex-col mt-24 items-center justify-center w-full">
      {eventData ? (
        <div className="flex flex-col p-4 sm:w-full md:w-3/4">
          <div className="flex flex-col mx-auto md:mx-0 md:flex-row md:mr-12">
            <div className=" md:mr-8">
              <Image
                src={`${eventData.posterURL}`}
                width={340}
                height={340}
                alt={'moodscape poster'}
              />
            </div>
            <div className="flex flex-col md:mx-auto ">
              <div>
                <p className={'text-[32px] md:mt-0'}> {eventData.title} </p>
                <button
                  onClick={() => rsvp(eventData)}
                  className={
                    'bg-[#FF8500] hover:bg-orange-300 m-2 rounded-sm cursor-pointer'
                  }
                >
                  <h3 className={'text-sm text-[#1D0045]'}> ENTER STREAM </h3>
                </button>
              </div>
              <div className="mt-2 flex flex-col ">
                <div className={'flex'}>
                  <Image src={'/user-icon-orange.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {`${eventData.organizer}`}</p>
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
              <div className={'flex flex-col mt-auto text-[#FF8500]'}>
                <p> {attendanceData?.length} Attendee(s) </p>
               {  attendanceData && formatAuraList(attendanceData).map((user, index) => {
                 const aura = `linear-gradient(to ${user.direction}, ${user.colorOne}, ${user.colorTwo}, ${user.colorThree})`;
                 return <div style={{ background: aura}} className={'w-10 h-10 rounded-full'} />
               }) }
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2 md:py-4 items-center">
            <p className={'text-[32px] self-start'}> Description </p>
            <p className={'text-xl text-start self-start'}>{eventData.description}</p>
          </div>
          <div className="flex flex-row p-2 w-full justify-center rounded-lg">
            {/* attendance list box component */}
            {/* TODO: Break out to separate component  */}
            <div className="w-full h-80 bg-black/50 border-solid border-gray-500 rounded-lg flex items-center justify-center">
              <p className={'text-center'}>
                {' '}
                The organizer has not made any announcements yet{' '}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={'animate-pulse'}>Loading...</div>
      )}
    </div>
  )
}
