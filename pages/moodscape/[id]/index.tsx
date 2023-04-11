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
    <div className="flex flex-col w-2/3 mt-24 self-center justify-center">
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <div className="mr-8">
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

          <div className="flex flex-col justify-between">
            <div className="px-2 bg-yellow-400/50 break-words rounded-md w-fit h-fit">
              <h3> Status: Approaching </h3>
            </div>
            <div className="flex flex-row	justify-end mr-12">
              <div className="flex flex-col		">
                <p> Make Moody </p>
                <MoodyModal />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h2> Description </h2>
        <p className={'text-xl'}>

          This April, we welcome you to BLOOMIN, our first ever MOODSCAPE event. Enter
          the world of MINE.FM and learn more about how we are bridging communities through
          music. Get a chance to play with the MINE.FM beta and help decide the future of
          music curation
        </p>
      </div>
      <div className="flex flex-row p-4 w-full justify-center">
        {/* attendance list box component */}
        {/* TODO: Break out to seperae component  */}
        <div className="w-2/3 h-80 bg-black mr-8 flex items-center justify-center">
          <p> Attendance will appear when event the begins </p>
        </div>

      </div>
      <div className="w-full p-4 h-full">
        <SectionHandler
          sections={sections}
          eventId={query?.id?.toString()}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />
      </div>
    </div>
  )
}
