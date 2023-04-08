import React from 'react'
import Image from 'next/image'
import Link from "next/link";

export default function MintCard() {
  return (
    <div className="flex flex-col justify-center items-center mt-8">
      <div className="h-fit w-fit border-solid border-black bg-black rounded-lg drop-shadow-lg">
        <Image
          src="/memory-cards/mCARD-DARK-5.svg"
          width={400}
          height={400}
          alt="memory-card"
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col m-8 space-y-8 > * + *	">
        {/*<button className="hover:bg-green-300/75 hover:text-black rounded-lg bg-black/50 cursor-pointer">*/}
        {/*  {' '}*/}
        {/*  <h2>Mint</h2>{' '}*/}
        {/*</button>*/}
        <Link href={'/'}>
        <button className="hover:bg-green-300/75 hover:text-black rounded-lg bg-black/50 cursor-pointer">
          <h2> Finish Account Set Up </h2>{' '}
        </button>
        </Link>
      </div>
    </div>
  )
}
