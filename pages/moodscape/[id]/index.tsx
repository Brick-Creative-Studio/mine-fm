import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { MSSectionHandler as SectionHandler } from 'components/Layout/MSSectionHandler'
import { useLayoutStore } from 'stores'
import Moods from 'components/Sections/MoodsSection'
import MemoryCards from 'components/Sections/MScapeSection'

export default function MoodscapePage({}) {
  const { signerAddress } = useLayoutStore((state) => state)


  const { query } = useRouter()

  const sections = [
    {
        title: 'Moods',
        component: [<Moods key={'moods'} />],
      },
      {
        title: 'Comments',
        component: [<Moods key={'moods'} />],
      },
      {
        title: 'Mini',
        component: [<Moods key={'moods'} />],
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
              src={'/stock/stonie-test-poster.jpeg'}
              width={340}
              height={340}
              alt={'moodscape poster'}
            />
            </div>
            <div className='flex flex-col justify-between'>
            <div> 
                <h2> Bloomin&#39; Moodscape </h2>
                <h3> Host(s): Mine.FM and Somewhere Good </h3>
            </div>
            <div> 
                <p> 4/8/23 @ 5-8pm EST </p>
                <p> 2 Moods </p>
            </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className='px-2 bg-black/50 h-fit'>
            <h3> Status: Active</h3>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col jusify-center'> 
                <p> Make Mini </p>
                <Image 
                    src={'/disc.svg'}
                    width={32}
                    height={32}
                    color='white'
                    alt={'make button'}
                /> 
                </div>
                <div className='flex flex-col jusify-center'> 
                <p> Vote </p>
                <Image 
                    src={'/star.svg'}
                    width={32}
                    height={32}
                    alt={'vote icon'}
                /> 
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
