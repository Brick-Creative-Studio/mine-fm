import React from 'react'
import { useRouter } from 'next/router'
import { ProfileSectionHandler as SectionHandler } from 'components/Layout/ProfileSectionHandler'
import MemoryCardSection from '../../../components/Sections/MemoryCardSection'
import OreSection from '../../../components/Sections/OresSection'
import FollowerModal from '../../../components/Modals/FollowerModal'
import FollowingModal from '../../../components/Modals/FollowingModal'
import useGetUser from '../../../hooks/useGetUser'

export default function Profile() {
  const { query } = useRouter()
  const pathAddress = query?.address?.toString()
  const { user } = useGetUser(pathAddress as string)

  const sections = [
    {
      title: 'Memory Cards',
      component: [<MemoryCardSection key={'MemoryCards'} />],
    },
    {
      title: 'Ores',
      component: [<OreSection key={'Ores'} />],
    },
  ]

  return (
    <div className="flex flex-col w-full mt-24 mb-auto">
      <div className="flex flex-row mx-4">
        <div className="flex flex-col w-1/2">
          <div className="text-lg">@Blobbity</div>
          <div className="text-3xl">Blobbity Blah</div>
          <p className="text-ellipsis">
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has
            roots in a piece of classical Latin literature from 45 BC, making it over 2000
            years old. Richard McClintock, a Latin professor at Hampden
          </p>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div className="flex flex-col items-center">
            <p className="text-lg">Cards</p>
            <p className="-mt-2">310</p>
          </div>

          <FollowerModal />
          <FollowingModal />
        </div>
      </div>

      <SectionHandler
        sections={sections}
        signerAddress={user?.walletAddress ? user.walletAddress : undefined}
        activeTab={query?.tab ? (query.tab as string) : undefined}
      />
    </div>
  )
}
