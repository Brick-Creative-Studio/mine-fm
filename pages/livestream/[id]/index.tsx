import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Attendee } from "../../../types/Attendee";
import AudienceGrid from '../../../components/Layout/AudienceGrid'
import { StreamSectionHandler as SectionHandler } from '../../../components/Layout/StreamSectionHandler'
import AdminSection from '../../../components/Sections/AdminSection'
import GeneralChatSection from '../../../components/Sections/GenChatSection'
import StreamInfoDesktop from 'components/Sections/StreamInfo-Desktop'
import StreamInfo from "../../../components/Sections/StreamInfo-Section";
import SectionsGrid from '../../../components/Sections/SectionGrid'
import Link from 'next/link'
import PageAudioPlayer from '../../../components/PageAudioPlayer.tsx'
import axios from 'axios'
import { GetServerSideProps } from "next";
import process from "process";
import { User } from "../../../types/User";
import { Event } from "../../../types/Event";

interface Props {
  attendees: User[],
  eventInfo: Event
}

export default function LivestreamPage({ attendees, eventInfo }: Props) {
  const { query } = useRouter()

  // console.log('attendance size: ', attendees)
  const guestSections = [
    {
      title: 'Chat',
      component: [<GeneralChatSection eventId={eventInfo.id!} key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid audienceList={attendees} key={'audience'} />],
    },
    {
      title: 'Info',
      component: [<StreamInfo eventInfo={eventInfo} key={'info'} />],
    },
  ]


  const adminSections = [
    {
      title: 'Chat',
      component: [<GeneralChatSection eventId={eventInfo.id!} key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid audienceList={attendees} key={'audience'} />],
    },
    {
      title: 'Section',
      component: [<StreamInfo eventInfo={eventInfo} key={'info'} />],
    },
    {
      title: 'Admin',
      component: [<AdminSection key={'Admin'} />],
    },
  ]

  return (
    <div className="flex flex-col w-full mt-24">
      <div className={'flex justify-between mb-4'}>
        <Link href={'/explore?tab=livestream'}>
          <div className="flex flex-row mx-6 cursor-pointer">
            <Image
              src={'/chevron-left.svg'}
              width={28}
              height={28}
              alt="gallery button"
            />
            <p> Exit </p>
          </div>
        </Link>
        <div className="flex flex-row items-center justify-around w-20 h-10 mx-6 rounded-md bg-zinc-800">
          <div className={'rounded-full w-4 h-4 bg-red-700 animate-pulse'} />
          <p>LIVE</p>
        </div>
      </div>
      <div className={'md:flex md:flex-row '}>
        <div className={'flex flex-col w-full md:h-full md:w-3/4 md:ml-4'}>
          <div
            className={
              'flex justify-center items-center bg-black/75 w-full h-64 md:h-[600px]'
            }
          >
            <PageAudioPlayer />
          </div>

          <div className="hidden md:flex">
            <StreamInfoDesktop />
          </div>
        </div>

        <SectionHandler
          sections={guestSections}
          activeTab={query?.tab ? (query.tab as string) : undefined}
          eventId={ eventInfo.id as string }
        />
      </div>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async ({
  params
}) => {
  const eventID = params?.id?.toString()!
  const attendeeEndpoint = `attendee?${eventID}`
  const url = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint



  const attendeesList : Attendee[] = await axios.get(url).then((res) => {
    return res.data
  }).catch((error) => {
    console.log('error fetching stream data:', error)
  })

  const attendees : User[] = await Promise.all(
    attendeesList.map(async (attendee) => {

      return await axios.post(userURL, {
        id: attendee.userID
      }).then((res) => {
        return res.data
      }).catch((error) => {
        console.log('error fetching stream data:', error)
      })
    })
  )

  const eventInfo: Event = await axios.post(eventURL, {
    id: eventID
  }).then((res) => {
    console.log('fetching event info', res.data)
    return res.data;
  }).catch((error) => {
    console.log('error fetching event info', error)
  })


  const props : Props = {
    attendees,
    eventInfo

  }
  return {
    props,

  }

}
