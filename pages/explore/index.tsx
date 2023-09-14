import React, { useEffect } from 'react'
import { EventCard } from 'components/Cards/EventCard'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import { useAccount } from 'wagmi'
import StreamSection from '../../components/Sections/StreamSection'
import IRLSection from '../../components/Sections/IRLSection'
import MoodsSection from "../../components/Sections/MoodsSection";
import { ExploreSectionHandler } from '../../components/Layout/ExploreSectionHandler'

export default function Explore({}) {
  const { signerAddress } = useLayoutStore((state) => state)
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
    {
      title: 'Moods',
      component: [<MoodsSection key={'moods'} />],
    },
  ]

  return (
    <div className="flex flex-col mt-28 w-full">
      <div className={'ml-12'}>
        <h3 className={'text-[14px] font-light text-[#B999FA]'}> Explore {query?.tab} </h3>
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
