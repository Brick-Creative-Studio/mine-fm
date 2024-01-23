import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Event } from '../../types/Event'
import useSWR from 'swr'
import getAttendees from '../../data/rest/getAttendees'
import { User } from '../../types/User'
import useTokenInfo from "../../data/contract/requests/useTokenInfo";
import axios from 'axios'
import addRewardFee from "../../utils/addRewardFee";
import { Attendee } from '../../types/Attendee'
import TwitterShare from 'components/Modals/TwitterShare'
import { ethers } from "ethers";
interface Props {
  event: Event
  treasuryAmountInEth: number | null
  nextTokenPrice: bigint | null,

}
const StreamInfoDesktop = ({ event, treasuryAmountInEth, nextTokenPrice }: Props) => {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [shareUrl, setShareUrl] = useState<string>('')
  const { uri, totalMinted, maxSupply } = useTokenInfo(event?.tokenAddress!, 1)
  const [currentPrice, setCurrentPrice] = useState('0')


  useEffect(() => {
    if (!event.isFree) {
      const priceWithFee = addRewardFee(nextTokenPrice!)
      setCurrentPrice(ethers.utils.formatEther(priceWithFee.toString()))
    }
  }, [event])
  async function loader(eventID: string) {
    const attendeeEndpoint = `attendee/${eventID}`
    const attendeeURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint




    const audience: Attendee[] = await axios
      .get(attendeeURL)
      .then((res) => {
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
          style={{ background: event.ownerAura ? event.ownerAura : '#fff'}}
          className={
            'flex-row flex items-center justify-center w-8 h-8 rounded-full'
          }
        />

        <p className={'text-[#7DD934]'}>{`${event.artist}`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/UserIcon.svg'} alt="attendance count" />
        <p className={'text-[#7DD934] overflow-clip'}>{`${
          data?.length !== 0 ? data?.length : attendees?.length
        } miners`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/ticket-icon.svg'} alt="ticket-price icon" />
        <p className={'text-[#7DD934]'}>{event.isFree ? 'N/A ETH' : `${currentPrice} ETH`}</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/CubeIcon.svg'} alt="treasury-icon" />
        <p suppressHydrationWarning={true}  className={'text-[#7DD934]'}>{event.isFree ? 'N/A ETH' : `${treasuryAmountInEth} ETH` }</p>
      </div>

      <div className={'flex-row gap-2 flex items-center justify-center w-full'}>
        <Image width={24} height={24} src={'/TimerIcon.svg'} alt="duration icon" />
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
