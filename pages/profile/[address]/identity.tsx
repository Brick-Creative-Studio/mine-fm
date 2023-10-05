import React from 'react'
import IdentityForm from 'components/Forms/IdentityForm'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore } from 'stores'


export default function SettingsPage({}) {
  const { signerAddress: address } = useLayoutStore()


  return (
    <div className="flex flex-col w-full mt-24 h-full">
      
      <div className="flex flex-row w-full items-center">
        <div className="absolute ml-12">
          <Link
            href={{
              pathname: `/profile/${address}/aura`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <Image src={'/chevron-left.svg'} width={32} height={32} alt="back button" />
              <h3>Back</h3>
            </div>
          </Link>
        </div>
        <div className={'mx-auto'}>
        <h2 > Identity </h2>
        </div>
      </div>
      <div className="w-full border border-white opacity-10 border-solid bg-white" />

      
      <IdentityForm />
      
    </div>
  )
}
