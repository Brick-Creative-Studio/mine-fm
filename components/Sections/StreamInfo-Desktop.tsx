import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Event } from '../../types/Event'
import useSWR from 'swr'
import getAttendees from '../../data/rest/getAttendees'
import { User } from '../../types/User'
import axios from 'axios'
import { Attendee } from '../../types/Attendee'
import TwitterShare from 'components/Modals/TwitterShare'

interface Props {
  event: Event
}
const StreamInfoDesktop = ({ event }: Props) => {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [shareUrl, setShareUrl] = useState<string>('')

  async function loader(eventID: string) {
    const attendeeEndpoint = `attendee/${eventID}`
    const attendeeURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
    console.log('stream id:', eventID)

    const audience: Attendee[] = await axios
      .get(attendeeURL)
      .then((res) => {
        console.log('stream data:', res.data)
        setAttendees(res.data)
        return res.data
      })
      .catch((error) => {
        console.log('error fetching stream data:', error)
      })
    return audience
  }
  const { data, error } = useSWR([event?.id], loader, {
    revalidateOnMount: true,
    revalidateIfStale: true,
  })

  function selectTweet() {
    return `I just minted ‘${event.title}’ on @mine_fm`
  }

  useEffect(() => {
    setShareUrl(`${process.env.NEXT_PUBLIC_CLIENT_URL}/livestream/${event.id}`)
    async function m() {
      const a = await loader(event.id as string)
      setAttendees(a)
    }
    m()
  }, [])

  return (
    <div
      className={
        'grid lg:grid-cols-6 grid-cols-3 grid-rows-2 lg:grid-rows-1 w-full  self-center mx-auto bg-[#12002C] p-2 pb-2.5'
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
        <p className={'text-[#7DD934] overflow-clip'}>{`${
          data?.length !== 0 ? data?.length : attendees?.length
        } miners`}</p>
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

      <TwitterShare text={selectTweet()} url={shareUrl}>
        <button
          className={
            'flex-row gap-2 flex items-center justify-center w-full bg-transparent cursor-pointer'
          }
        >
          <Image width={24} height={24} src={'/ShareIcon.svg'} alt="share button" />
          <p className={'text-[#7DD934] ml-2'}>Share</p>
        </button>
      </TwitterShare>
    </div>
  )
}

export default StreamInfoDesktop
