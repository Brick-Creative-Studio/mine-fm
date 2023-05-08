import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore } from 'stores'

export default function MCGallery({}) {
  const { signerAddress: address } = useLayoutStore()

  return (
    <div className="flex flex-col mt-24">
      <div className="flex justify-around items-center">
        <div className="">
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

        <h2> Gallery </h2>

        <div className="">
          <Link
            href={{
              pathname: `/profile/${address}`,
            }}
          >
            <div className="flex flex-row cursor-pointer">
              <h3>Profile</h3>
              <Image
                src={'/chevron-right.svg'}
                width={32}
                height={32}
                alt="gallery button"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="w-full  border border-white opacity-10 border-solid bg-white" />

      <div className="flex  justify-around items-center mt-12">
        <button className="w-12 h-12 bg-slate-200/75 mx-2 rounded-full ">
          <Image src="/arrow-left.svg" width={24} height={24} alt="back-button" />
        </button>
        <div className="h-fit w-fit border-solid border-black bg-black rounded-xl drop-shadow-lg">
          <Image
            src="/memory-cards/mCARD-DARK-5.svg"
            width={400}
            height={400}
            alt="memory-card"
            className="rounded-lg"
          />
        </div>
        <button className="w-12 h-12 bg-slate-200/75 mx-2 rounded-full">
          <Image src="/arrow-right.svg" width={32} height={32} alt="forward-button" />
        </button>
      </div>
      <div className={'border-solid border-gray-200 bg-gray-300/75 mx-12 my-12 h-32 p-4'}>
        <p className={'text-black'}> Memory Card Information: Moodscape 001 - BLOOMIN </p>
      </div>
    </div>
  )
}
