import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLayoutStore } from 'stores'

export default function MCGallery({}) {
  const { signerAddress: address } = useLayoutStore()

  return (
    <div className="flex flex-col w-full h-full mt-24 justify-center items-center">
      <div className="flex flex-row justify-around w-full items-center">
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

        <h1> Memory Card Gallery </h1>

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

      <div className="flex flex-row w-full justify-center items-center space-x-24 > * + *	">
        <button className="w-16 h-16 bg-slate-200/75 rounded-full ">
          <Image src="/arrow-left.svg" width={32} height={32} alt="back-button" />
        </button>
        <div className="flex justify-center items-center mt-8 h-fit w-fit border-solid border-black bg-black rounded-xl drop-shadow-lg">
        <Image
          src="/memory-cards/mCARD-DARK-5.svg"
          width={400}
          height={400}
          alt="memory-card"
          className="rounded-lg"
        />
      </div>
        <button className="w-16 h-16 bg-slate-200/75 rounded-full">
          <Image src="/arrow-right.svg" width={32} height={32} alt="forward-button" />
        </button>
      </div>
    </div>
  )
}
