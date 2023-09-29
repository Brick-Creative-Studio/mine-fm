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
  const formatDate = new Date(streamEvent.startDate).toLocaleDateString("en-US", { weekday: "long",year: "numeric", month: "long", day: "numeric",})
  const formatTime = new Date(streamEvent.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
        className={'flex justify-center items-center rounded-tl-lg h-10 w-24 bg-[#FF8500] self-end'}
      >

        <h3 className={'text-sm  text-[#1D0045] my-0 mr-1'}>ENTER</h3>
        <img alt={'enter icon'} src={'/exit-dark.svg'}/>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#1D0045] text-left align-middle shadow-xl transition-all">
                  <div className="flex h-auto rounded-lg cursor-pointer  w-full">
                    <Image
                      objectFit={'cover'}
                      objectPosition={'50% 25%'}
                      width={460}
                      quality={100}
                      height={200}
                      src={getFetchableUrl(streamEvent.posterURL)!!}
                      alt="cover art"
                      className="rounded-lg"
                    />
                  </div>
                  <div className={'px-8 py-4'}>
                    <Dialog.Title
                      as="p"
                      className="text-[22px] font-medium leading-6 mb-2 text-[#F25C54]"
                    >

                      <span
                        className={'text-white'}
                      >{` ${streamEvent.title}`}</span>

                    </Dialog.Title>
                    <p className={'text-[16px] text-[#FF8500] my-0'}>{streamEvent.artist}</p>

                    <div className="mt-2 flex flex-col ">
                      <div className={'flex'}>
                        <Image src={'/user-icon-orange.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {`${streamEvent.organizer}`}</p>
                      </div>
                      <div className={'flex'}>
                        <Image src={'/calendar.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {formatDate}</p>
                      </div>
                      <div className={'flex'}>
                        <Image src={'/clock.svg'}  width={18} height={18}/>
                        <p className={'ml-2'}> {formatTime}</p>
                      </div>

                      <p className={'mt-4'}> {streamEvent.description} </p>
                    </div>

                    <div className={'flex justify-around'}>

                    <div className="mt-4 w-1/3 ">
                      {/*<Link href={`/livestream/${streamEvent.id}?tab=chat`}>*/}
                      <button
                        type="button"
                        className="w-full bg-[#1D0045] rounded-sm border-solid border border-[#FF8500]"
                      >
                        <h3 className={'text-[#FF8500]'}>{`SEE MORE`}</h3>
                      </button>
                      {/*</Link>*/}
                    </div>
                      <div className="mt-4 w-1/3">
                        {/*<Link href={`/livestream/${streamEvent.id}?tab=chat`}>*/}
                        <button
                          type="button"
                          className="bg-[#FF8500] w-full rounded-sm"
                          onClick={handleRSVP}
                        >
                          <h3 className={'text-[#1D0045]'}>{`ENTER`}</h3>
                        </button>
                        {/*</Link>*/}
                      </div>

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
