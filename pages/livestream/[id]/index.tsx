import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Attendee } from '../../../types/Attendee'
import AudienceGridSection from '../../../components/Sections/AudienceGridSection'
import { StreamSectionHandler as SectionHandler } from '../../../components/Layout/SectionHandlers/StreamSectionHandler'
import AdminSection from '../../../components/Sections/AdminSection'
import GeneralChatSection from '../../../components/Sections/GenChatSection'
import StreamInfoDesktop from 'components/Sections/StreamInfo-Desktop'
import StreamInfo from '../../../components/Sections/StreamInfo-Section'
import SectionsGrid from '../../../components/Sections/SectionGrid'
import Link from 'next/link'
import PageAudioPlayer from '../../../components/PageAudioPlayer.tsx'
import axios from 'axios'
import { useAccount } from 'wagmi'
import { GetServerSideProps } from 'next'
import process from 'process'
import { User } from '../../../types/User'
import useSWR, { useSWRConfig, preload } from 'swr'

import { Event } from '../../../types/Event'
import ExitModal from '../../../components/Modals/ConfirmExitModal'
import { useProfileStore } from '../../../stores'
import { socket } from '../../../utils/socket-client'
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';

interface Props {
  eventInfo: Event | null
}



export default function LivestreamPage({ eventInfo }: Props) {
  const { mutate } = useSWRConfig()
  const { id: userId, m_tag, aura, hasAccount } = useProfileStore((state) => state)
  const auraCode = `linear-gradient(to ${aura.direction}, ${aura.colorOne}, ${aura.colorTwo}, ${aura.colorThree})`
  const [ promptOpen, setPrompt] = useState<boolean>(false);
  const router = useRouter()
  const { openConnectModal } = useConnectModal();
  const { query } = useRouter()
  const { address } = useAccount()
  const [isConnected, setIsConnected] = useState(socket.connected)
  const createRSVPEndpoint = 'attendee/create'
  const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + createRSVPEndpoint



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
          eventInfo={eventInfo!}
          key={'info'}
        />,
      ],
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
      title: 'Section',
      component: [
        <StreamInfo
          eventInfo={eventInfo!}
          key={'info'}
        />,
      ],
    },
    {
      title: 'Admin',
      component: [<AdminSection key={'Admin'} />],
    },
  ]

  async function handleRSVP(){

    const attendee = {
      eventID: eventInfo?.id,
      userID: userId
    }

      await axios.post(rsvpURL, attendee).then((res) => {
        console.log(res.data)
        return res.data
      }).catch((error) => {
        console.log('create attendee error:', error)
      })

  }

  useEffect(() => {
    if (eventInfo) {
      socket.on('connect', () => {
        socket.emit('join_room', {
          roomName: eventInfo.id,
          messenger: {
            userId: userId,
            miner_tag: m_tag,
            socketId: socket.id,
            auraCode: auraCode,
          },
        })
        setIsConnected(true)

        //check wallet connection
        if(!isConnected && openConnectModal){
          openConnectModal()
          return
        }
        //check for mine account
        if(!hasAccount){
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
  }, [eventInfo?.id, socket])

  const warningText =
    'Are you sure you want to leave this page? Leaving will impact your listening stats.'

  useEffect(() => {
    const handleWindowClose = (e : BeforeUnloadEvent) => {
      // if (e.) return
      // e.preventDefault()
      // return (e.returnValue = 'test')
      //leaveStream()
      socket.off('connect')
      socket.off('disconnect')
      socket.off('chat')
      // setPrompt(true)
    }
    const handleBrowseAway = () => {
      //leaveStream()
      // if (window.confirm(warningText)) return
      // router.events.emit('routeChangeError')
      // throw 'routeChange aborted.'

      // setPrompt(true)
    }
    window.addEventListener('beforeunload', handleWindowClose)

    router.events.on('routeChangeStart', handleBrowseAway)
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose)
      router.events.off('routeChangeStart', handleBrowseAway)

    }
  }, [socket])

  function closeModal() {
    setPrompt(false)
  }

  function openModal() {
    setPrompt(true)
  }

  async function leaveStream() {
    const endpoint = `attendee/delete`

    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

    if (eventInfo!.ownerAddress !== address) {
      await axios
        .post(url, {
          eventID: eventInfo?.id,
          userID: userId,
        })
        .then((res) => {
          return res.data
        })
        .catch((error) => {
          console.log('error fetching stream data:', error)
        })
    }
    closeModal()
  }

  useEffect(() => {
    // const rsvpList = await preload([eventInfo?.id], getAttendees)

  }, [eventInfo])


  return (
    <div className="flex flex-col h-min	 w-full mt-8 md:my-auto">

      <div className={'flex justify-between mb-4'}>
        {/*<ExitModal*/}
        {/*  eventId={eventInfo?.id!}*/}
        {/*  userId={userId!}*/}
        {/*  ownerAddress={eventInfo?.ownerAddress!}*/}
        {/*/>*/}
        <button className={'bg-transparent'} onClick={() => setPrompt(true)}>
          <div className="flex flex-row mx-6 cursor-pointer">
            <Image src={'/chevron-left.svg'} width={28} height={28} alt="gallery button" />
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
            <StreamInfoDesktop event={eventInfo!} />
          </div>
        </div>

        <SectionHandler
          sections={guestSections}
          activeTab={query?.tab ? (query.tab as string) : undefined}
          eventId={eventInfo?.id as string}
        />
      </div>
      <Transition appear show={promptOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      Are you sure you want to leave this page? Leaving will impact your listening stats.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      type="button"
                      className=" cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      I'm staying
                    </button>
                    <Link href={'/explore?tab=livestream'}>
                      <button
                        type="button"
                        className="cursor-pointer inline-flex justify-center border-solid border-[#B999FA] rounded-md bg-[#B999FA] px-4 py-2 text-sm font-medium text-[#12002C] hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => leaveStream()}
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
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const eventID = params?.id?.toString()
  const attendeeEndpoint = `attendee/${eventID}`
  const attendeeURL = process.env.NEXT_PUBLIC_BASE_URL + attendeeEndpoint
  const userEndpoint = 'user/user'
  const userURL = process.env.NEXT_PUBLIC_BASE_URL + userEndpoint
  const eventEndpoint = 'event/event'
  const eventURL = process.env.NEXT_PUBLIC_BASE_URL + eventEndpoint
  const createRSVPEndpoint = 'attendee/create'
  const rsvpURL = process.env.NEXT_PUBLIC_BASE_URL + createRSVPEndpoint

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
