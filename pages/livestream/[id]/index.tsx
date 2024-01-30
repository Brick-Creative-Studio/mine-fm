import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AudienceGridSection from '../../../components/Sections/AudienceGridSection'
import { StreamSectionHandler as SectionHandler } from '../../../components/Layout/SectionHandlers/StreamSectionHandler'
import AdminSection from '../../../components/Sections/AdminSection'
import GeneralChatSection from '../../../components/Sections/GenChatSection'
import StreamInfoDesktop from 'components/Sections/StreamInfo-Desktop'
import StreamInfo from '../../../components/Sections/StreamInfo-Section'
import Link from 'next/link'
import PageAudioPlayer from '../../../components/PageAudioPlayer.tsx'
import axios from 'axios'
import { useVerifyAttendance } from '../../../hooks/useVerifyAttendance'
import { useAccount } from 'wagmi'
import { GetServerSideProps } from 'next'
import { Event } from '../../../types/Event'
import { useProfileStore } from '../../../stores'
import { socket } from '../../../utils/socket-client'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import readTreasury from '../../../data/contract/requests/readTreasury'
import { getNextTokenPrice } from '../../../data/contract/requests/getNextTokenPrice'
import { Leva } from 'leva'
interface Props {
  eventInfo: Event | null
}

export default function LivestreamPage({ eventInfo }: Props) {
  const { id: userId, miner_tag, aura, hasAccount } = useProfileStore((state) => state)
  const auraCode = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
  const [promptOpen, setPrompt] = useState<boolean>(false)
  const router = useRouter()
  const { openConnectModal } = useConnectModal()
  const { query } = useRouter()
  const { address } = useAccount()
  const [modalText, setModalText] = useState<string>('Verifying Your RSVP...')
  const [isConnected, setIsConnected] = useState(socket.connected)
  const { isError, isLoading, isVerified } = useVerifyAttendance(
    address as `0x${string}`,
    1,
    eventInfo?.tokenAddress as `0x${string}`
  )
  const treasuryAmountInEth = readTreasury(eventInfo?.splitAddress as `0x${string}`)

  const nextTokenPrice = getNextTokenPrice(
    eventInfo?.tokenAddress as `0x${string}`,
    eventInfo?.tokenId ? eventInfo?.tokenId : 1
  )

  const [isGranted, setGranted] = useState<boolean>(eventInfo?.isFree ? true : isVerified)

  const guestSections = [
    {
      title: 'Chat',
      component: [
        <GeneralChatSection socket={socket} eventId={eventInfo?.id!} key={'chat'} />,
      ],
    },
    {
      title: 'Audience',
      component: [<AudienceGridSection event={eventInfo!} key={'audience'} />],
    },
    {
      title: 'Info',
      component: [
        <StreamInfo
          treasury={treasuryAmountInEth}
          nextTokenPrice={nextTokenPrice}
          eventInfo={eventInfo!}
          key={'info'}
        />,
      ],
    },
    {
      title: 'Viz',
      component: [<Leva key={'leva-controls'} flat fill />],
    },
  ]

  const adminSections = [
    {
      title: 'Chat',
      component: [
        <GeneralChatSection socket={socket} eventId={eventInfo?.id!} key={'chat'} />,
      ],
    },
    {
      title: 'Audience',
      component: [<AudienceGridSection event={eventInfo!} key={'audience'} />],
    },
    {
      title: 'Info',
      component: [
        <StreamInfo
          treasury={treasuryAmountInEth}
          nextTokenPrice={nextTokenPrice}
          eventInfo={eventInfo!}
          key={'info'}
        />,
      ],
    },
    {
      title: 'Admin',
      component: [
        <AdminSection
          treasurySum={treasuryAmountInEth}
          splitAddress={eventInfo?.splitAddress as `0x${string}`}
          event={eventInfo!}
          key={'Admin'}
        />,
      ],
    },
    {
      title: 'Viz',
      component: [<Leva key={'leva-controls'} flat fill />],
    },
  ]

  useEffect(() => {
    if (eventInfo?.isFree) {
      return
    }
    if (isVerified || eventInfo?.ownerAddress === address) {
      setGranted(true)
    } else {
      closeValidationModal()
    }
  }, [isVerified, address])

  useEffect(() => {
    if (eventInfo && isGranted) {
      socket.on('connect', () => {
        socket.emit('join_room', {
          roomName: eventInfo.id,
          messenger: {
            userId: userId,
            miner_tag: miner_tag,
            socketId: socket.id,
            auraCode: auraCode,
            walletAddress: address as string,
          },
        })
        setIsConnected(true)

        //check wallet connection
        if (!isConnected && openConnectModal) {
          openConnectModal()
          return
        }
        //check for mine account
        if (!hasAccount) {
          return
        }

        // handleRSVP()
      })
      socket.connect()
    }

    return () => {
      socket.disconnect()
      socket.off('connect')
      socket.off('disconnect')
      socket.off('chat')
      //leaveStream()
    }
  }, [eventInfo?.id, socket, isVerified, isGranted])

  const warningText =
    'Are you sure you want to leave this page? Leaving this page will impact your listening stats.'

  useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      e.preventDefault()

      socket.off('connect')
      socket.off('disconnect')
      socket.off('chat')
      // setPrompt(true)
    }
    window.addEventListener('beforeunload', handleWindowClose)

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
    }
  }, [socket])

  function closeExitModal() {
    setPrompt(false)
  }

  function closeValidationModal() {
    setTimeout(() => {
      setModalText('RSVP not found. Leaving livestream...')
      router.push('/explore?tab=livestream')
    }, 2500)
  }

  function openModal() {
    setPrompt(true)
  }

  const infoSection = () => {
    if (isConnected) {
      return eventInfo?.ownerAddress === address ? adminSections : guestSections
    }
    return guestSections
  }

  return (
    <div className="flex flex-col h-min	 w-full mt-8 md:my-auto">
      <div className={'flex justify-between mb-4'}>
        <button className={'bg-transparent'} onClick={() => setPrompt(true)}>
          <div className="flex flex-row mx-6 cursor-pointer">
            <Image
              src={'/chevron-left.svg'}
              width={28}
              height={28}
              alt="gallery button"
            />
            <p className={'text-white text-[16px]'}> Exit </p>
          </div>
        </button>

        <div>
          <h2 className={'my-0 w-full text-center text-[#B999FA]'}>
            {' '}
            "{eventInfo?.title}"{' '}
          </h2>
        </div>
        <div className="flex flex-row items-center justify-around w-24 h-10 mx-6 rounded-md p-2">
          <div className={'rounded-full w-4 h-4 bg-red-700 animate-pulse '} />
          <p className={'mx-2 text-[#B999FA]'}>LIVE</p>
        </div>
      </div>
      <div className={'md:flex md:flex-row '}>
        <div className={'flex flex-col w-full md:h-full md:w-3/4 md:ml-4'}>
          <div
            className={
              'flex justify-center items-center bg-black/75 w-full h-64 md:h-[600px]'
            }
          >
            <PageAudioPlayer />
          </div>

          <div className="hidden md:flex">
            <StreamInfoDesktop
              nextTokenPrice={nextTokenPrice}
              treasuryAmountInEth={treasuryAmountInEth}
              event={eventInfo!}
            />
          </div>
        </div>

        <SectionHandler
          sections={infoSection()}
          activeTab={query?.tab ? (query.tab as string) : undefined}
          eventId={eventInfo?.id as string}
        />
      </div>
      {/* Confirm Exit Modal */}
      <Transition appear show={promptOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeExitModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform border-solid border-[#B999FA] overflow-hidden rounded-2xl bg-[#12002C] p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="p"
                    className="text-lg font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    Leave Livestream?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-white">
                      Are you sure you want to leave this page? Leaving will impact your
                      listening stats.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      type="button"
                      className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeExitModal}
                    >
                      I'm staying
                    </button>
                    <Link href={'/explore?tab=livestream'}>
                      <button
                        type="button"
                        className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Leave Stream
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* Validation Modal*/}
      <Transition appear show={!isGranted} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => console.log()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform border-solid border-[#B999FA] overflow-hidden rounded-2xl bg-[#12002C] p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="p"
                    className="text-lg font-light mx-auto animate-pulse leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    {modalText}
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventID = params?.id?.toString()
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint

  const eventInfo: Event | null = eventID
    ? await axios
        .post(eventURL, {
          id: eventID,
        })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          console.log('error fetching event info', error)
        })
    : null

  if (!eventID) {
    return {
      notFound: true,
    }
  }

  if (!eventInfo) {
    return {
      notFound: true,
    }
  }

  const props: Props = {
    eventInfo,
  }

  return {
    props,
  }
}
