import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CreatePage() {
  return (
    <div className="flex flex-col justify-center items-center mt-24 h-full">
      <div className={'flex flex-col w-full'}>
        <p className={'my-1 ml-12 self-start md:text-[64px] text-[32px] text-[#B999FA]'}> CREATE </p>
        <div className={'w-full border-2 border-solid border-[#B999FA]'} />
      </div>
      <div
        className={
          'h-full w-full flex flex-col md:flex-row justify-center md:justify-around items-center mt-8 md:mt-20 md:px-12'
        }
      >
        <div className={'flex flex-col items-center'}>
          <p className="text-[#B999FA] text-[48px] mb-4 md:mb-10"> LIVESTREAM </p>

          <Link href={`/create/stream`}>
          <div className="flex flex-col justify-center items-center w-80 h-48 p-8 border-solid md:w-[35rem] border-[#B999FA] border-4 rounded-full bg-[#1D0045] mb-10 cursor-pointer hover:opacity-80">
            <h3 className="text-center text-[20px] font-light text-[#B999FA]">
              {' '}
              Audio livestreams events with reward distributions. Token gated and
              intimate.{' '}
            </h3>
          </div>
        </Link>
        </div>
        <div className={'flex flex-col items-center'}>
        <p className="text-[#B999FA] text-[48px] mb-4 md:mb-10"> IRL </p>
        <a
          target="_blank"
          href="https://mine.fm/Stay-Connected"
          rel="noopener noreferrer"
        >

        <div className="flex flex-col justify-center items-center border-solid border-4 border-[#B999FA] h-48 p-8 w-80 md:w-[35rem] mb-10 rounded-full bg-[#1D0045] cursor-pointer hover:opacity-80">

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
