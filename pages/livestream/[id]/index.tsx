import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLayoutStore } from '../../../stores'
import Image from 'next/image'
import AudienceGrid from '../../../components/Layout/AudienceGrid'
import { StreamSectionHandler as SectionHandler } from '../../../components/Layout/StreamSectionHandler'
import AdminSection from '../../../components/Sections/AdminSection'
import { ChatSectionHandler } from '../../../components/Layout/ChatSectionHandler'
import GeneralChatSection from '../../../components/Sections/GenChatSection'
import GroupChatSection from '../../../components/Sections/GroupChatSection'
import StreamInfoDesktop from 'components/Sections/StreamInfo-Desktop'
import StreamInfo from "../../../components/Sections/StreamInfo-Section";
import SectionsGrid from '../../../components/Sections/SectionGrid'
import Link from 'next/link'
import PageAudioPlayer from '../../../components/PageAudioPlayer.tsx'
import { GetServerSideProps } from "next";

interface Props {
  eventId: string
}

export default function LivestreamPage({ eventId }: Props) {
  const { query } = useRouter()
  const { isMobile } = useLayoutStore()

  const chatSections = [
    {
      title: 'General',
      component: [<GeneralChatSection key={'general'} />],
    },
    {
      title: 'Private',
      component: [<GroupChatSection key={'section'} />],
    },
  ]
  const guestSections = [
    {
      title: 'Chat',
      component: [<GeneralChatSection key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid key={'audience'} />],
    },
    {
      title: 'Admin',
      component: [<AdminSection key={'Admin'} />],
    },
    {
      title: 'Info',
      component: [<StreamInfo key={'info'} />],
    },
  ]

  const desktopSections = [
    {
      title: 'Chat',
      component: [
        <ChatSectionHandler
          sections={chatSections}
          key={'chat'}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />,
      ],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid key={'audience'} />],
    },
    {
      title: 'Section',
      component: [<SectionsGrid key={'section'} />],
    },
  ]

  const adminSections = [
    {
      title: 'Chat',
      component: [
        <ChatSectionHandler
          sections={chatSections}
          key={'chat'}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />,
      ],
    },
    {
      title: 'Audience',
      component: [<AudienceGrid key={'audience'} />],
    },
    {
      title: 'Section',
      component: [<SectionsGrid key={'section'} />],
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
          <div className={'rounded-full w-4 h-4 bg-red-700'} />
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
          eventId={ eventId }
        />
      </div>
    </div>
  )
}

export const getServerSideProps : GetServerSideProps = async ({
  params
}) => {
  const eventId = params?.id?.toString()!
  const props : Props = {
    eventId
  }
  return {
    props,
  }

}
