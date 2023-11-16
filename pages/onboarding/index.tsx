import React, { useEffect } from 'react'
import { OnboardingSectionHandler as SectionHandler } from 'components/Layout/SectionHandlers/OnboardingHandler'
import { useLayoutStore, useMCStore } from 'stores'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IdentityForm from 'components/Forms/IdentityForm'
import AuraForm from 'components/Forms/AuraForm'
import MintCard from 'components/Sections/MintCard'
import { GetServerSideProps } from 'next'

export default function Onboarding({}) {
  const { signerAddress } = useLayoutStore((state) => state)
  const { query } = useRouter()
  const { needsCard, setStatus} = useMCStore((state) => state)

  let sections = [
    {
      title: 'Aura',
      component: [<AuraForm key={'Aura'} />],
    },
    {
      title: 'Identity',
      component: [<IdentityForm key={'Identity'} />],
    },
  ]


  return (
    <div className="flex flex-col w-full mt-28">
      <div className="flex flex-row justify-center items-center w-full">
        <div className="flex flex-col w-full justify-center">
          <h2 className="mx-8 self-center"> Onboarding </h2>
          <SectionHandler
          sections={sections}
          signerAddress={signerAddress ? signerAddress : undefined}
          activeTab={query?.tab ? (query.tab as string) : undefined}
           />
        </div>
      </div>
    </div>
  )
}
