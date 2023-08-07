import React from 'react'
import Image from 'next/image'

const StreamInfoDesktop = () => {
  const hostTitle = 'Bad Bunny'
  const attendanceCount = 200
  const entryFee = 0.013
  const treasury = 3.287

  return (
    <div
      className={
        'grid lg:grid-cols-6 grid-cols-3 grid-rows-2 lg:grid-rows-1 w-full bg-[#B999FA]'
      }
    >
      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <div
          className={
            'flex-row flex items-center justify-center w-8 h-8 bg-[#1D0045] rounded-full'
          }
        />

        <p className={'text-[#1D0045]'}>{`${hostTitle}`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/UserIcon.svg'} alt="share button" />
        <p className={'text-[#1D0045]'}>{`${attendanceCount} attendees`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/ETHIcon.svg'} alt="share button" />
        <p className={'text-[#1D0045]'}>{`${entryFee}ETH`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/CubeIcon.svg'} alt="share button" />
        <p className={'text-[#1D0045]'}>{`${treasury}ETH`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/TimerIcon.svg'} alt="share button" />
        <p className={'mr-2 text-[#1D0045]'}>46:58</p>
      </div>

      <button
        className={
          'flex-row gap-2 flex items-center justify-center w-full bg-transparent'
        }
      >
        <Image width={24} height={24} src={'/ShareIcon.svg'} alt="share button" />
        <p className={'text-[#1D0045] ml-2'}>Share</p>
      </button>
    </div>
  )
}

export default StreamInfoDesktop
