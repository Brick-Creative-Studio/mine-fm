import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLayoutStore } from '../../../stores'
import Image from 'next/image'
import AudienceGrid from "../../../components/Layout/AudienceGrid";
import { StreamSectionHandler as SectionHandler } from "../../../components/Layout/StreamSectionHandler";
import StreamSection from "../../../components/Sections/StreamSection";
import IRLSection from "../../../components/Sections/IRLSection";
import { ChatSectionHandler } from "../../../components/Layout/ChatSectionHandler";
import GeneralChatSection from "../../../components/Sections/GenChatSection";
import GroupChatSection from "../../../components/Sections/GroupChatSection";
import StreamInfo from "../../../components/Sections/StreamInfo-Section";
import SectionsGrid from "../../../components/Sections/SectionGrid";
import Link from "next/link";

export default function LivestreamPage({}) {
  const { query } = useRouter()
  const { isMobile } = useLayoutStore()


  const chatSections = [
    {
    title: 'General',
    component: [<GeneralChatSection key={'general'}/>],
  },
    {
      title: 'Private',
      component: [<GroupChatSection key={'section'}/>]
    }
  ]
  const sections = [
    {
      title: 'Chat',
      component: [<ChatSectionHandler
        sections={chatSections}
        key={'chat'}
        activeTab={query?.tab ? (query.tab as string) : undefined}
      />
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
      title: 'Info',
      component: [<StreamInfo key={'info'} />],
    }
  ]

  return (
    <div className="flex flex-col mt-24 h-full w-full">
      <div className={'flex justify-between'}>
        <Link href={'/explore?tab=livestream'}>
        <div className="flex flex-row cursor-pointer mx-6">
          <Image src={'/chevron-left.svg'} width={28} height={28} alt="gallery button" />
          <p> Exit </p>
        </div>
      </Link>
        <div className="flex flex-row items-center justify-around rounded-md bg-zinc-800 w-20 h-10 mx-6">
          <div className={'rounded-full w-4 h-4 bg-red-700'} />
          <p>LIVE</p>
        </div>
      </div>
      <div className="w-full border border-white opacity-10 border-solid" />
      <div className={'flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-64 z-0'}>
        <Image src={'/stock/keithcharles-headshot.jpeg'} width={120} height={120} alt={'artist-avatar'} className={' z-10 rounded-full '}  />

      </div>
      {/*  //TODO: Seperate UI sections into components
        //TODO: Create Livestream section handler*/}
      <SectionHandler
        sections={sections}
        activeTab={query?.tab ? (query.tab as string) : undefined}

      />

    </div>
  )
}
