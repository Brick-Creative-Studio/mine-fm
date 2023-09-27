import React from 'react'
import Image from 'next/image'
import { Event } from "../../types/Event";

interface Props {
  eventInfo : Event
}

export default function StreamInfo({ eventInfo } : Props) {
  const hostTitle = 'Brick Studio'
  const attendanceCount = 210
  const entryFee = 0.013
  const treasury = 3.287
  const channelName = 'Titi Me Pregunto'
  const eventDate = '8.10.23'
  const eventTime = '5-7pm EST'

  return (
    <div className={'flex flex-col h-96 px-4 overflow-scroll md:h-[604px] md:w-full md:bg-gray-400/25'}>
      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-5/12 text-[#984DDF]'}> HOST DETAILS </h3>
        <div className={'h-0.5 w-2/3 bg-[#984DDF]'} />
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2 '}> Host: </p>
        <p className={'text-[#7DD934]'}> {`${eventInfo.artist}`} </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Attendance: </p>
        <p className={'text-[#7DD934]'}> {`${attendanceCount}`} </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Current Entry Fee: </p>
        <p className={'text-[#7DD934]'}> {`${entryFee} eth`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Treasury: </p>
        <p className={'text-[#7DD934]'}> {`${treasury} eth`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2 text-[#984DDF]'}> CHANNEL DETAILS </h3>
        <div className={'h-0.5 w-1/2 bg-[#984DDF]'} />
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Channel Name: </p>
        <p className={'text-[#7DD934]'}> {`${eventInfo.title}`} </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Event Time: </p>
        <p className={'text-[#7DD934] mr-2'}> {`${eventInfo.startDate}`} </p>
        <p className={'text-[#7DD934]'}> {`${eventInfo.startDate}`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2 text-[#984DDF]'}> SHARE DETAILS </h3>
        <div className={'h-0.5 w-2/3 bg-[#984DDF]'} />
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <button className={'bg-transparent'}>
          <Image width={24} height={24} src={'/share.svg'} alt="share button" />
        </button>
        <p className={'text-[#7DD934] ml-2'}> Share </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <button className={'bg-transparent'}>
          <Image width={24} height={24} src={'/globe.svg'} alt="share button" />
        </button>
        <p className={'text-[#7DD934] ml-2'}> Socials / Website  </p>
      </div>
    </div>
  )
}
