import React from 'react'
import Image from 'next/image'
import { Event } from '../../types/Event'

interface Props {
  event: Event
  attendanceCount: number
}
const StreamInfoDesktop = ({ event, attendanceCount }: Props) => {
  return (
    <div
      className={
        'grid lg:grid-cols-6 grid-cols-3 grid-rows-2 lg:grid-rows-1 w-full  self-center mx-auto bg-[#12002C] p-2'
      }
    >
      <div className={'flex-row gap-2 flex items-center ml-2 w-full'}>
        <div
          className={
            'flex-row flex items-center justify-center w-8 h-8 bg-red-200 rounded-full'
          }
        />

        <p className={'text-[#7DD934]'}>{`${event.artist}`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/UserIcon.svg'} alt="share button" />
        <p className={'text-[#7DD934] overflow-clip'}>{`${attendanceCount} miners`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/ticket-icon.svg'} alt="share button" />
        <p className={'text-[#7DD934]'}>{`N/A ETH`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/CubeIcon.svg'} alt="share button" />
        <p className={'text-[#7DD934]'}>{`N/A ETH`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/TimerIcon.svg'} alt="share button" />
        <p className={'mr-2 text-[#7DD934]'}>∞</p>
      </div>

      <button
        className={
          'flex-row gap-2 flex items-center justify-center w-full bg-transparent'
        }
      >
        <Image width={24} height={24} src={'/ShareIcon.svg'} alt="share button" />
        <p className={'text-[#7DD934] ml-2'}>Share</p>
      </button>
    </div>
  )
}

export default StreamInfoDesktop
