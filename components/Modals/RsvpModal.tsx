import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { getFetchableUrl } from '../../packages/ipfs-service'
import Image from 'next/image'
import { Event } from '../../types/Event'
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useProfileStore } from "../../stores";
import process from "process";

interface ModalProps {
  streamEvent: Event,
}

export default function RsvpModal({ streamEvent }: ModalProps) {
  let [isOpen, setIsOpen] = useState(false)
  const formatDate = new Date(streamEvent.startDate).toISOString().replace(/T/, ' ').replace(/\..+/, '').substring(0, 16)
  const router = useRouter();
  const { id: userId } = useProfileStore((state) => state)



  async function handleRSVP() {
    const endpoint = 'attendee/create'
    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint
    const attendee = {
      eventID: streamEvent.id,
      userID: userId
    }
    try {
       await axios.post(url, attendee).then((res) => {
        console.log(res.data)
        return res.data
      }).catch((error) => {
        console.log('fetch user error:', error)
      })
    } catch (error) {
      console.log('create event error:', error)
      return
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={'rounded-lg h-8 w-20 bg-[#F25C54] self-end'}
      >
        {' '}
        RSVP{' '}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#240045] text-left align-middle shadow-xl transition-all">
                  <div className="flex h-auto rounded-lg cursor-pointer  w-full">
                    <Image
                      objectFit={'cover'}
                      objectPosition={'50% 25%'}
                      width={460}
                      quality={100}
                      height={140}
                      src={getFetchableUrl(streamEvent.posterURL)!!}
                      alt="cover art"
                      className="rounded-lg"
                    />
                  </div>
                  <div className={'p-4'}>
                    <Dialog.Title
                      as="h2"
                      className="text-lg font-medium leading-6 text-[#F25C54]"
                    >
                      RSVP:{' '}
                      <span
                        className={'text-white'}
                      >{` ${streamEvent.title} by ${streamEvent.artist}`}</span>
                      <button className={'bg-transparent absolute right-5 top-28 rounded-full'}>
                        <Image alt={'notify'} src={'/bell.svg'} width={24} height={24} />
                      </button>
                    </Dialog.Title>
                    <div className="mt-2 w-full h-0.5 bg-[#F25C54]" />

                    <div className="mt-2 flex flex-col">
                      <div className={'flex'}>
                        <Image src={'/calendar.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {'July 12, 2023 - Wednesday'}</p>
                      </div>
                      <div className={'flex'}>
                        <Image src={'/clock.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {'7:30PM - 12AM'}</p>
                      </div>

                      <div className={'flex'}>
                        <Image src={'/sewing-pin.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {'Online'}</p>
                      </div>
                      <p className={'m-0'}> Access to the livestream will be available 10 minutes before the start date </p>
                    </div>
                    <div className="mt-2 w-full h-0.5 bg-[#F25C54]" />
                    <div className="mt-2 w-full flex flex-col">
                      <div className={'flex'}>
                        <p className={'text-[#F25C54]'}> Organized By:  </p>
                        <p className={'ml-2'}> {streamEvent.organizer}</p>
                      </div>
                      <div className={'flex'}>
                        <p className={'text-[#F25C54]'}> RSVP's:  </p>
                        <p className={'ml-2'}> {streamEvent.organizer}</p>
                      </div>
                    </div>
                    <div className="mt-2 w-full h-0.5 bg-[#F25C54]" />
                    <div className="mt-4">
                      {/*<Link href={`/livestream/${streamEvent.id}?tab=chat`}>*/}
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={handleRSVP}
                      >
                        {`Enter Livestream`}
                      </button>
                      {/*</Link>*/}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
