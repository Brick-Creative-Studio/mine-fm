import React, { useEffect } from 'react'
import { EventCard } from 'components/Cards/EventCard'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import StreamSection from '../../components/Sections/StreamSection'
import IRLSection from '../../components/Sections/IRLSection'
import { ExploreSectionHandler } from '../../components/Layout/ExploreSectionHandler'

export default function Explore({}) {
  const { signerAddress } = useLayoutStore((state) => state)
  const router = useRouter()
  const { isConnected } = useAccount()
  const { hasAccount } = useProfileStore((state) => state)
  const { query } = useRouter()

  const sections = [
    {
      title: 'Livestream',
      component: [<StreamSection key={'livestream'} />],
    },
    {
      title: 'I R L',
      component: [<IRLSection key={'irl'} />],
    },
  ]

  useEffect(() => {
    const server = `https://minefm-server.herokuapp.com/comments`

    //getComments(server, 1)
  }, [signerAddress, isConnected])

  return (
    <div className="flex flex-col mt-28 w-full">
      <div className={' mx-32'}>
        <h2> Explore Moodscapes </h2>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <ExploreSectionHandler
          sections={sections}
          signerAddress={signerAddress ? signerAddress : undefined}
          activeTab={query?.tab ? (query.tab as string) : undefined}
        />
      </div>
    </div>
  )
}
