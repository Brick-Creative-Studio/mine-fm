import React from 'react'
import Image from 'next/image'

export default function MintCard() {
  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="h-fit w-fit border-solid border-black bg-black rounded-lg drop-shadow-lg">
        <Image
          src="/memory-cards/mCARD-DARK-v3.svg"
          width={400}
          height={400}
          alt="memory-card"
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col m-8 space-y-8 > * + *	">
        <button className="hover:bg-sky-100 rounded-lg bg-gradient-to-r from-yellow-500 to-blue-500 cursor-pointer">
          {' '}
          <h2>Mint</h2>{' '}
        </button>
        <button className="hover:bg-sky-100 rounded-lg bg-gradient-to-r from-red-500 to-orange-300 cursor-pointer">
          <h2> Skip Minting</h2>{' '}
        </button>
      </div>
    </div>
  )
}
