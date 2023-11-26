import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CreatePage() {
  return (
    <div className="flex flex-col justify-center items-center my-24 h-full w-full">
      <div className={'flex flex-col w-full items-center justify-center'}>
        <p className={'my-1  md:text-[64px] text-[32px] text-[#B999FA]'}> CREATE </p>
      </div>
      <div
        className={
          'h-full w-full flex flex-col md:flex-row justify-center md:justify-around items-center mt-8 md:mt-40 md:px-12'
        }
      >
        <div className={'flex flex-col items-center'}>

          <Link href={`/create/stream`}>
          <div className="flex flex-col justify-center items-center w-96 h-68 p-8 border-solid md:w-[35rem] border-[#B999FA] border-4 rounded-full bg-[#1D0045] mb-10 cursor-pointer hover:opacity-80">
            <p className="text-[#B999FA] text-[48px] m-2"> LIVESTREAM </p>

            <h3 className="text-center text-[20px] font-light text-[#B999FA]">
              {' '}
              Audio livestreams events with reward distributions. Token gated and
              intimate.{' '}
            </h3>
          </div>
        </Link>
        </div>
        <div className={'flex flex-col items-center'}>
        <a
          target="_blank"
          href="https://mine.fm/Stay-Connected"
          rel="noopener noreferrer"
        >

        <div className="flex flex-col justify-center items-center border-solid border-4 border-[#B999FA] h-68 p-8 w-96 md:w-[35rem] mb-10 rounded-full bg-[#1D0045] cursor-pointer hover:opacity-80">
          <p className="text-[#B999FA] text-[48px] m-2"> IRL </p>

          <h3 className="text-center text-[20px] font-light text-[#B999FA]">
            {' '}
            Create a hybrid event for IRL and online. Contact team for private access{' '}
          </h3>
        </div>
        </a>
        </div>
      </div>
    </div>
  )
}
