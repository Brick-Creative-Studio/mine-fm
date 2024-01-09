import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Event } from '../../types/Event'
import { Attendee } from '../../types/Attendee'
import useSWR from 'swr'
import getAttendees from '../../data/rest/getAttendees'
import TwitterShare from 'components/Modals/TwitterShare'

interface Props {
  eventInfo: Event
}

export default function StreamInfo({ eventInfo }: Props) {
  const [shareUrl, setShareUrl] = useState<string>('')
  const { data: attendees, error } = useSWR([eventInfo?.id], getAttendees, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })
  const time = new Date(eventInfo.startDate).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
  const formatDate = new Date(eventInfo.startDate)
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')
    .substring(0, 16)

  function selectTweet() {
    return `I just minted ‘${eventInfo.title}’ on @mine_fm`
  }

  useEffect(() => {
    setShareUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/livestream/${eventInfo.id}`)
  }, [eventInfo])

  return (
    <div className={'flex flex-col h-fit px-4 overflow-scroll md:h-[604px] md:w-full '}>
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
        <p className={'text-[#7DD934]'}> {`${attendees?.length}`} </p>
      </div>
      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Current Entry Fee: </p>
        <p className={'text-[#7DD934]'}> {`N/A eth`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <p className={'mr-2'}> Treasury: </p>
        <p className={'text-[#7DD934]'}> {`N/A eth`} </p>
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
        <p className={'text-[#7DD934] mr-2'}> {`${time}`} </p>
      </div>

      <div className={'flex-row flex items-center w-full'}>
        <h3 className={'w-1/2 text-[#984DDF]'}> SHARE DETAILS </h3>
        <div className={'h-0.5 w-2/3 bg-[#984DDF]'} />
      </div>
      <TwitterShare text={selectTweet()} url={shareUrl}>
        <a href="" className="hover:bg-white/30 w-36 rounded-md cursor-pointer">
          <div className={'flex-row flex items-center w-full'}>
            <button className={'bg-transparent'}>
              <Image width={24} height={24} src={'/share.svg'} alt="share button" />
            </button>
            <p className={'text-[#7DD934] ml-2'}> Share </p>
          </div>
        </a>
      </TwitterShare>
      <a
        href={`https://${eventInfo.social}`}
        className="hover:bg-white/30 w-36 rounded-md cursor-pointer"
        target="_blank"
        rel="noreferrer"
      >
        <div className={'flex-row flex items-center w-full'}>
          <button className={'bg-transparent'}>
            <Image width={24} height={24} src={'/share-social.svg'} alt="share button" />
          </button>
          <p className={'text-[#7DD934] ml-2'}> Socials </p>
        </div>
      </a>
      <a
        href={`https://${eventInfo.website}`}
        className="hover:bg-white/30 w-36 rounded-md cursor-pointer"
        target="_blank"
        rel="noreferrer"
      >
        <div className={'flex-row flex items-center w-full'}>
          <button className={'bg-transparent'}>
            <Image width={24} height={24} src={'/globe.svg'} alt="share button" />
          </button>
          <p className={'text-[#7DD934] ml-2'}> Website </p>
        </div>
      </a>
    </div>
  )
}
