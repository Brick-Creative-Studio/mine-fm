import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
import ExitModal from "../../../components/Modals/ConfirmExitModal";
import { useProfileStore } from "../../../stores";
import { socket} from "../../../utils/socket-client";

interface Props {
  attendees: User[] | null,
  eventInfo: Event | null
}

export default function LivestreamPage({ attendees, eventInfo }: Props) {

  const { id: userId, m_tag, aura } = useProfileStore(state => state)
  const auraCode = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`

  const { query } = useRouter()
  const [isConnected, setIsConnected] = useState(socket.connected)

  const guestSections = [
    {
      title: 'Chat',
      component: [<GeneralChatSection socket={socket} eventId={eventInfo?.id!} key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid audienceList={attendees} key={'audience'} />],
    },
    {
      title: 'Info',
      component: [<StreamInfo attendanceCount={attendees?.length!} eventInfo={eventInfo!} key={'info'} />],
    },
  ]


  const adminSections = [
    {
      title: 'Chat',
      component: [<GeneralChatSection socket={socket} eventId={eventInfo?.id!} key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid audienceList={attendees} key={'audience'} />],
    },
    {
      title: 'Section',
      component: [<StreamInfo eventInfo={eventInfo!} attendanceCount={attendees?.length!} key={'info'} />],
    },
    {
      title: 'Admin',
      component: [<AdminSection key={'Admin'} />],
    },
  ]

  useEffect(() => {

    if (eventInfo){
      socket.on('connect', () => {
        socket.emit('join_room', {
          roomName: eventInfo.id,
          messenger: {
            userId: userId,
            miner_tag: m_tag,
            socketId: socket.id,
            auraCode: auraCode,
          }
        })
      })
    }

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      // socket.off('chat')
    }
  }, [])

  return (
    <div className="flex flex-col w-full mt-24 mb-12">
      <div className={'flex justify-between mb-4'}>
        <ExitModal eventId={eventInfo?.id!} userId={userId!} ownerAddress={eventInfo?.ownerAddress!}/>
        <div>
          <h2 className={'my-0 w-full text-center text-[#B999FA]'}> "{eventInfo?.title}" </h2>
        </div>
        <div className="flex flex-row items-center justify-around w-20 h-10 mx-6 rounded-md bg-zinc-800 p-2">
          <div className={'rounded-full w-4 h-4 bg-red-700 animate-pulse mx-1'} />
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
            <StreamInfoDesktop attendanceCount={attendees?.length!} event={eventInfo!}/>
          </div>
        </div>

        <SectionHandler
          sections={guestSections}
          activeTab={query?.tab ? (query.tab as string) : undefined}
          eventId={ eventInfo?.id as string }
        />
      </div>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async ({
  params
}) => {
  const eventID = params?.id?.toString()
  const attendeeEndpoint = `attendee/${eventID}`
  const url = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint

  const attendeesList : Attendee[] | null = eventID ? await axios.get(url).then((res) => {

    return res.data
  }).catch((error) => {
    console.log('error fetching stream data:', error)
  }) : null

  const attendees : User[] | null = attendeesList ?  await Promise.all(
    attendeesList.map(async (attendee) => {
      return await axios.post(userURL, {
        id: attendee.userID
      }).then((res) => {
        return res.data
      }).catch((error) => {
        console.log('error fetching stream data:', error)
      })
    })
  ) : null


  const eventInfo: Event | null = eventID ? await axios.post(eventURL, {
    id: eventID
  }).then((res) => {
    return res.data;
  }).catch((error) => {
    console.log('error fetching event info', error)
  }) : null

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

  const props : Props = {
    attendees,
    eventInfo
  }
  return {
    props,
  }

}
