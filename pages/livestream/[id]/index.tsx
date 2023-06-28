import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLayoutStore } from '../../../stores'
import Image from 'next/image'
import { StreamSectionHandler } from "../../../components/Layout/StreamSectionHandler";
import StreamSection from "../../../components/Sections/StreamSection";
import IRLSection from "../../../components/Sections/IRLSection";

export default function LivestreamPage({}) {
  const { query } = useRouter()
  const { isMobile } = useLayoutStore()

  const sections = [
    {
      title: 'Chat',
      component: [<StreamSection key={'chat'} />],
    },
    {
      title: 'Audience',
      component: [<IRLSection key={'audience'} />],
    },
    {
      title: 'Section',
      component: [<StreamSection key={'section'} />],
    },
    {
      title: 'Info',
      component: [<StreamSection key={'info'} />],
    }
  ]

  return (
    <div className="flex flex-col mt-32 w-full">
      <div className={'flex justify-between'}>
        <div className="flex flex-row cursor-pointer mx-6">
          <Image src={'/chevron-left.svg'} width={32} height={32} alt="gallery button" />
          <p> Exit </p>
        </div>
        <div className="flex flex-row items-center justify-around rounded-md bg-zinc-800 w-20 h-10 mx-6">
          <div className={'rounded-full w-4 h-4 bg-red-700'} />
          <p>LIVE</p>
        </div>
      </div>
      <div className="w-full border border-white opacity-10 border-solid" />
      <div className={'flex justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-72'}>
        <div className={'rounded-full m-auto w-40 h-40 bg-black'} />

      </div>
      {/*  //TODO: Seperate UI sections into components
        //TODO: Create Livestream section handler*/}
      <StreamSectionHandler sections={sections}/>

    </div>
  )
}
