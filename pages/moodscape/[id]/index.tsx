import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import EventMoods from 'components/Sections/EventMoods'
import Link from 'next/link'
import useSWR from 'swr'
import { MSSectionHandler as SectionHandler } from 'components/Layout/MSSectionHandler'
import { useLayoutStore } from 'stores'
import Moods from 'components/Sections/MoodsSection'
import PersonalSection from 'components/Sections/PersonalSection'
import EventComments from 'components/Sections/EventComments'
import MoodyModal from 'components/Modals/MoodyModal'
import VoteModal from 'components/Modals/VoteModal'
import axios from "axios";

export default function MoodscapePage({}) {
  const { signerAddress } = useLayoutStore((state) => state)
  const server = `https://minefm-server.herokuapp.com/comments`

  // const getComments = async(url: string, id: string) => {
  //   console.log('modal id check: ',id)
  //   const comments = await axios.get(url, {
  //     moodscapeId: id,
  //   }).then((res) => {
  //     console.log('got moody', res.data)
  //     return res.data
  //   })
  //
  //   return comments;
  // }

  // const comments = useSWR([server, 1], getComments).data
  //


  const { query } = useRouter()

  const sections = [
    {
      title: 'EventMoods',
      component: [<EventMoods key={'eventMood'} />],
    },
    {
      title: 'Comments',
      component: [<EventComments key={'commments'} />],
    },
    {
      title: 'Moodys',
      component: [<Moods key={'moody'} />],
    },
    {
      title: 'Personal',
      component: [<PersonalSection key={'personal'} />],
    },
  ]

  //
  return (
    <div className="flex flex-col mt-24 items-center justify-center w-full">
      <div className="flex flex-col p-4  ">
        <div className="flex flex-col justify-between items-center justify-center">
          <div className="flex flex-col">
            <div className="">
              <Image
                src={'/stock/bloomin_poster_square.png'}
                width={340}
                height={340}
                alt={'moodscape poster'}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2> The Bloomin Moodscape </h2>
                <h3> Host(s): Mine.FM and Somewhere Good </h3>
              </div>
              <div>
                <p> 4/8/23 @ 5-8pm EST </p>
                <p> 2 Moods </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="px-2 bg-red-500/75 break-words rounded-md w-fit h-fit">
              <p> Status: Finished </p>
            </div>
              <div className="flex flex-col	items-center">
                <p> Make Moody </p>
                <MoodyModal />
              </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 items-center">
        <h2> Description </h2>
        <p className={'text-xl'}>

          This April, we welcome you to BLOOMIN, our first ever MOODSCAPE event. Enter
          the world of MINE.FM and learn more about how we are bridging communities through
          music. Get a chance to play with the MINE.FM beta and help decide the future of
          music curation
        </p>
      </div>
      <div className="flex flex-row p-4 w-full justify-center rounded-lg">
        {/* attendance list box component */}
        {/* TODO: Break out to separate component  */}
        <div className="w-full h-80 bg-black/50 border-solid border-gray-500 rounded-lg flex items-center justify-center">
          <p className={'text-center'}> Attendance will appear when event the begins </p>
        </div>

      </div>
      <div className="w-full p-4 h-full items-center justify-center mr-4">
        <SectionHandler
          sections={sections}
          eventId={query?.id?.toString()}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />
      </div>
    </div>
  )
}
