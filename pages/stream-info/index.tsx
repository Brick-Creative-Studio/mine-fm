import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useLayoutStore, useProfileStore } from '../../stores'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import useSWR, { Fetcher, Key } from 'swr'
import { Event } from '../../types/Event'
import { Attendee } from '../../types/Attendee'
import { User } from '../../types/User'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import CopyButtonLight from '../../components/CopyButton/CopyButtonLight'
import { useIsMounted } from '../../hooks/useMounted'
import useMint from '../../data/contract/requests/useMint'
import useTokenInfo from '../../data/contract/requests/useTokenInfo'
import { useVerifyAttendance } from "../../hooks/useVerifyAttendance";
import addRewardFee from '../../utils/addRewardFee'
import { getNextTokenPrice } from '../../data/contract/requests/getNextTokenPrice'
import { ethers } from 'ethers'
import { NULL_ADDRESS } from "../../constants/addresses";
export default function StreamInfoPage({}) {
  const router = useRouter()
  const { id: pathID } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState<Event | undefined>(undefined)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const { isConnected, address } = useAccount()
  const { openConnectModal } = useConnectModal()
  const { id: accountId } = useProfileStore()
  const [codeVisibile, setCodeVisibilty] = useState<boolean>(false)
  const streamKey = process.env.NEXT_PUBLIC_EVENINGS_KEY
  const isMounted = useIsMounted()
  const endpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + endpoint
  const attendeeEndpoint = `attendee/${pathID}`
  const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint
  const [currentPrice, setCurrentPrice] = useState('0')
  const {isError, isLoading: verifyLoading, isVerified } = useVerifyAttendance(
    address as `0x${string}`,
    1,
    event?.tokenAddress as `0x${string}`
  )
  const [ isValid, setValidity ] = useState<boolean>(false)


  async function fetchEvent(url: string) {
    if (pathID) {
      //fetch event info
      const data: Event = await axios
        .post(url, {
          id: pathID,
        })
        .then((res) => {
          setEvent(res.data)
          return res.data
        })
        .catch((error) => {
          setEvent(undefined)
          router.push('/404')
          console.log('error fetching event data:', error)
        })
      return data
    }
  }

  useEffect(() => {
    if (!isMounted) {
      return
    }
  })

  useEffect(() => {
    fetchEvent(eventURL)
  }, [pathID, eventURL])

  const nextTokenPrice = getNextTokenPrice(
    event?.tokenAddress as `0x${string}`,
    event?.tokenId ? event?.tokenId : 1
  )

  const data = event ? event!.startDate! : undefined

  const formatDate = event
    ? new Date(event.startDate)?.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A'
  const formatTime = event
    ? new Date(event.startDate)?.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'

  async function fetchAttendeeList(url: string) {
    //fetch attendees
    return await axios
      .get(url)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('error fetching stream data:', error)
      })
  }

  async function fetchUserList(attendees: Attendee[]) {
    const rsvpList: User[] = await Promise.all(
      attendees.map((attendee) => {
        return axios
          .post(userURL, {
            id: attendee.userID,
          })
          .then((res) => {
            return res.data
          })
          .catch((error) => {
            console.log('error fetching stream data:', error)
          })
      })
    )
    return rsvpList
  }

  async function fetchAttendance(url: string) {
    const dataList: User[] = await fetchAttendeeList(url).then((attendees) => {
      return fetchUserList(attendees)
    })
    return dataList
  }

  const { data: attendanceData } = useSWR(rsvpURL, fetchAttendance)

  function formatAuraList(userList: User[]) {
    if (userList.length > 5) {
      return userList.slice(0, 5)
    }
    return userList
  }

  useEffect(() => {
    if (event) {
      event.ownerAddress === address ? setIsOwner(true) : setIsOwner(false)
      setValidity(true)
      const priceWithFee = addRewardFee(nextTokenPrice)
      setCurrentPrice(priceWithFee.toString())
    }
  }, [event, nextTokenPrice])

  const { uri, totalMinted, maxSupply } = useTokenInfo(event?.tokenAddress!, 1)



  const {
    data: mintData,
    isTxLoading,
    isSuccess,
    write,
    settled,
    txData,
  } = useMint(
    event?.tokenAddress as `0x${string}`,
    1,
    ethers.utils.formatEther(currentPrice),
    address ? address as `0x${string}` : NULL_ADDRESS
  )



  useEffect(() => {
    if (txData?.status === 'success'){
      setTimeout(() => {
        setIsLoading(false)
        setValidity(true)

      }, 7000);
    }

    if(isTxLoading){
      setIsLoading(true)
    }

  }, [isSuccess, txData, isTxLoading])

  return (
    <div className="flex flex-col mt-24 items-center justify-center w-full">
      {event ? (
        <div className="flex flex-col p-4 sm:w-full md:w-3/4">
          <div className="flex flex-col mx-auto md:mx-0 md:flex-row md:mr-12">
            <div className=" md:mr-8">
              <Image
                src={`${event.posterURL}`}
                width={340}
                height={340}
                alt={'moodscape poster'}
              />
            </div>
            <div className="flex flex-col md:mx-auto ">
              <div>
                <p className={'text-[32px] md:mt-0'}> {event.title} </p>

                <button
                  className={
                    'bg-[#FF8500] hover:bg-orange-300 m-2 rounded-sm cursor-pointer'
                  }
                >
                  { !isValid ? (
                    <h3 className={'text-sm w-48 text-[#1D0045]'}>
                      {' '}
                      MEMORY CARD REQUIRED {' '}
                    </h3>
                  ) : (
                    <Link
                      href={`/livestream/${pathID}`}
                    >
                    <h3 className={'text-sm w-32 text-[#1D0045]'}> ENTER STREAM </h3>
                    </Link>
                  )}
                </button>
              </div>
              {isOwner ? (
                codeVisibile ? (
                  <div className={'flex items-center w-44'}>
                    <button
                      onClick={() => setCodeVisibilty(false)}
                      className={
                        'flex items-center bg-transparent m-2 rounded-sm cursor-pointer'
                      }
                    >
                      <img
                        className={'mr-2'}
                        alt={'key viewable icon'}
                        src={'/eye-open.svg'}
                      />
                      <p className={'text-[#7DD934] '}> {streamKey}</p>
                    </button>
                    <CopyButtonLight text={streamKey} />
                  </div>
                ) : (
                  <div className={'flex'}>
                    <button
                      onClick={() => setCodeVisibilty(true)}
                      className={
                        'flex items-center bg-transparent m-2 rounded-sm cursor-pointer'
                      }
                    >
                      <img
                        className={'mr-2'}
                        alt={'key hidden icon'}
                        src={'/eye-closed.svg'}
                      />
                      <p className={'text-[#7DD934]'}>Reveal Stream Key</p>
                    </button>
                  </div>
                )
              ) : null}

              <div className="mt-2 flex flex-col ">
                <div className={'flex'}>
                  <Image src={'/user-icon-orange.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {`${event.organizer}`}</p>
                </div>
                <div className={'flex'}>
                  <Image src={'/calendar.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {formatDate}</p>
                </div>
                <div className={'flex'}>
                  <Image src={'/clock.svg'} width={18} height={18} />
                  <p className={'ml-2'}> {formatTime}</p>
                </div>
              </div>
              <div className={'flex flex-col mt-auto text-[#FF8500]'}>
                <p> {attendanceData?.length} Attendee(s) </p>
                <div className={'flex'}>
                  {attendanceData &&
                    formatAuraList(attendanceData).map((user, index) => {
                      const aura = `linear-gradient(to ${user.direction}, ${user.colorOne}, ${user.colorTwo}, ${user.colorThree})`
                      return (
                        <div
                          style={{ background: aura }}
                          className={'w-10 h-10 mx-1 rounded-full'}
                        />
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2 md:py-4 items-center">
            <p className={'text-[32px] self-start mb-1'}> Description </p>
            <p className={'text-xl text-start self-start'}>{event.description}</p>
          </div>
          <div className={'flex mb-10'}>
            <div
              className={
                'w-96 h-96 bg-black/50 border-solid border-[#7DD934] rounded-md my-auto items-center justify-center flex'
              }
            >
              <img alt={'memory card'} className={'w-96 h-96'} src={event.memoryCard!} />
            </div>
            <div className={'flex flex-col ml-12 w-1/2'}>
              <p className={'text-2xl mt-0 mb-0 '}> Details </p>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Network: </p>
                <p className={'text-lg text-[#7DD934]'}>Base </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Address: </p>
                <p className={'text-lg text-[#7DD934]'}>{event.tokenAddress} </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Treasury: </p>
                <p className={'text-lg text-[#7DD934]'}>{event.splitAddress} </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Media: </p>
                <p className={'text-lg text-[#7DD934]'}> IPFS </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}>Protocol Fee: </p>
                <p className={'text-lg text-[#7DD934]'}> 0.000777 ETH </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}> Initial Price: </p>
                <p className={'text-lg text-[#7DD934]'}> {event.startingPrice} ETH </p>
              </div>
              <div className={'flex justify-between'}>
                <p className={'text-lg'}> Current Price: </p>
                <p className={'text-lg text-[#7DD934]'}>
                  {' '}
                  {ethers.utils.formatEther(currentPrice)} ETH{' '}
                </p>
              </div>

              <button
                className="not-italic bg-transparent h-12 rounded-lg font-mono font-bold hover:bg-purple-400 text-lg p-2 px-4 border-solid border-[#B999FA] mt-6 cursor-pointer"
                onClick={() => {
                  write?.()
                }}
              >
                {isLoading ? (<p className={'text-lg m-0 animate-pulse'}>Processing Transaction</p>) : (<p className={'text-lg m-0'}>Mint: ${ethers.utils.formatEther(currentPrice)} ETH</p>)}
              </button>
            </div>
          </div>
          <div className="flex flex-row p-2 w-full justify-center rounded-lg">
            {/* attendance list box component */}
            {/* TODO: Break out to separate component  */}
            <div className="w-full h-80 bg-black/50 border-solid border-gray-500 rounded-lg flex items-center justify-center">
              <p className={'text-center'}>
                {' '}
                The organizer has not made any announcements yet{' '}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={'animate-pulse'}>Loading...</div>
      )}
    </div>
  )
}
