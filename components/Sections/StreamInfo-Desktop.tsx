import React from 'react'
import Image from 'next/image'

const StreamInfoDesktop = () => {
  const hostTitle = 'Bad Bunny'
  const attendanceCount = 200
  const entryFee = 0.013
  const treasury = 3.287

  return (
    <div className={'flex flex-row px-4 overflow-scroll w-full bg-[#B999FA]'}>
      <div className={'flex-row flex items-center justify-center w-full'}>
        <p className={'text-[#1D0045]'}>{`${hostTitle}`}</p>
      </div>

      <div className={'flex-row flex items-center justify-center w-full'}>
        <p className={'text-[#1D0045]'}>{`${attendanceCount} attendees`}</p>
      </div>

      <div className={'flex-row flex items-center justify-center w-full'}>
        <p className={'text-[#1D0045]'}>{`${entryFee} eth`}</p>
      </div>

      <div className={'flex-row flex items-center justify-center w-full'}>
        <p className={'text-[#1D0045]'}>{`${treasury} eth`}</p>
      </div>

      <div className={'flex-row flex items-center justify-center w-full'}>
        <p className={'mr-2 text-[#1D0045]'}>46:58</p>
      </div>

      <button
        className={'flex-row flex items-center justify-center w-full bg-transparent'}
      >
        <Image width={24} height={24} src={'/share.svg'} alt="share button" />
        <p className={'text-[#1D0045] ml-2'}>Share</p>
      </button>
    </div>
  )
}

export default StreamInfoDesktop
