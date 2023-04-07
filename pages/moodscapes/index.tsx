import React, { useEffect } from 'react'
import { MoodscapeCard } from 'components/Cards/MoodscapeCard'
import Link from 'next/link'
import { useLayoutStore, useProfileStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import ConnectModal from 'components/Modals/ConnectModal'
import CreateAcctModal from 'components/Modals/CreateAcctModal'
import { useAccount } from 'wagmi'

export default function Explore({}) {
  const { signerAddress } = useLayoutStore((state) => state)
  const router = useRouter()
  const { isConnected } = useAccount()
  const { hasAccount } = useProfileStore((state) => state)

  const checkAccountStatus = () => {

    if (!isConnected) {
      return <ConnectModal />
    }
    if (!hasAccount) return <CreateAcctModal />

    if (hasAccount && isConnected) {
      return(
        <Link href={`/moodscape/${1}`} key={1}>
        <button className="hover:bg-sky-100 hover:text-black rounded-lg bg-black/50">
          <h3> Enter Moodscape </h3>
        </button>
      </Link>
      )
    }
  }

  useEffect( () => {

  }, [signerAddress, isConnected])

  return (
    <div className="flex flex-col mt-28 mx-32">
      <div>
        <h2> Moodscapes </h2>
      </div>

      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col">
          <h3 className="mx-8"> Explore </h3>
          <div className="w-auto h-0.5 bg-sky-500/75" />
        </div>
      </div>
      <div className="w-full h-0.5 bg-gray-500/75" />

      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <MoodscapeCard id={'1'} />
        {checkAccountStatus()}
      </div>
    </div>
  )
}
