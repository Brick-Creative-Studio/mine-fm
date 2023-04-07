import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import EventMoods from 'components/Sections/EventMoods'
import Link from 'next/link'
import { MSSectionHandler as SectionHandler } from 'components/Layout/MSSectionHandler'
import { useLayoutStore } from 'stores'
import Moods from 'components/Sections/MoodsSection'
import MemoryCards from 'components/Sections/MScapeSection'
import ChatBox from 'components/Containers/MessagesContainer'
import EventComments from 'components/Sections/EventComments'
import MoodyModal from 'components/Modals/MoodyModal'
import VoteModal from 'components/Modals/VoteModal'
import { GetServerSideProps } from 'next'
import SpotifyWebApi from 'spotify-web-api-node'
import { InferGetStaticPropsType } from 'next'
import { GetStaticProps } from 'next'
// import spotifyApi from '../../../packages/ipfs-service/src/spotifyApi'


// interface Props {
//   spotify: SpotifyWebApi
// }

// export const getServerSideProps: GetStaticProps = async(context: any) => {
//   const spotify = spotifyApi

//   return {
//     props: { spotify, }, // will be passed to the page component as props
//   }
// }

export default function MoodscapePage({ })  {
  const scopes = [
    'streaming',
    'user-library-read',
    'user-read-playback-state',
    'user-read-currently-playing',
    'ugc-image-upload',
  ],
  redirectUri = 'https://mine-fm.vercel.app/',
  clientId = process.env.NEXT_PUBLIC_CLIENT_ID ? process.env.NEXT_PUBLIC_CLIENT_ID : '',
  clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET,
  state = 'some-state-of-my-choice'
  const { signerAddress } = useLayoutStore((state) => state)
 
  useEffect(() => {
    const spotifyApi = new SpotifyWebApi({
     
    }).getAlbum('4aawyAB9vmqN3uQ7FjRGTy').then(function(data) {
      console.log('runnig query')
      console.log(data.body.tracks)
      return data.body.tracks
    })
  }, [])

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
      component: [<MemoryCards key={'memory-cards'} />],
    },
    
  ]

  useEffect(() => {
    
  })

  return (
    <div className="flex flex-col w-2/3 mt-24 self-center justify-center">
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-row justify-between">
          <div className='flex flex-row'>
            <div className='mr-8'>
            <Image
              src={'/stock/bloomin_poster_square.png'}
              width={340}
              height={340}
              alt={'moodscape poster'}
            />
            </div>
            <div className='flex flex-col justify-between'>
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
            <div className='px-2 bg-[#F25C54]/50 break-words rounded-md w-fit h-fit'>
            <h3> Status: Active</h3>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col jusify-center'> 
                <p> Make Moody </p>
                <MoodyModal/>
                </div>
                <div className='flex flex-col jusify-center'> 
                <p> Vote </p>
                <VoteModal/>
                </div>
            </div>
            </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <h2> Description </h2>
        <p>
          {' '}
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
          in a piece of classical Latin literature from 45 BC, making it over 2000 years
          old. Richard McClintock, a Latin professor at Hampden ...{' '}
        </p>
      </div>
      <div className="flex flex-row p-4 w-2/3 justify-between">
        {/* attendance list box component */}
        {/* TODO: Break out to seperae component  */}
        <div className="w-2/3 h-80 bg-black mr-8"></div>
        <div className="">
          <h2> Latest Activity </h2>
          <ul>
            <li>Current Mood Title: Uplift</li>
            <li>Current DJ: Stonie Blue</li>

          </ul>
        </div>

      </div>
      <div className='w-full p-4 h-full'>
      <SectionHandler
          sections={sections}
          eventId={query?.id?.toString()}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />
      </div>
    </div>
  )
}
