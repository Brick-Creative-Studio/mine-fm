import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import process from 'process'
import axios from 'axios'
import { useAccount } from "wagmi";

interface Props {
  ownerAddress: string
  userId: string
  eventId: string
}
export default function ExitModal({ ownerAddress, eventId, userId }: Props) {
  let [isOpen, setIsOpen] = useState(false)
  const { address } = useAccount()

  function closeModal() {
    setIsOpen(false)
  }

  async function leaveStream() {
    const endpoint = `attendee/delete`

    const url = process.env.NEXT_PUBLIC_BASE_URL + endpoint

    if (ownerAddress !== address) {
      await axios
        .post(url, {
          eventID: eventId,
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

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      {/*<Link href={'/explore?tab=livestream'}>*/}
      <button className={'bg-transparent'} onClick={openModal}>
        <div className="flex flex-row mx-6 cursor-pointer">
          <Image src={'/chevron-left.svg'} width={28} height={28} alt="gallery button" />
          <p className={'text-white text-md'}> Exit </p>
        </div>
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
                <Dialog.Panel className="w-full max-w-md transform border-solid border-[#B999FA] overflow-hidden rounded-2xl bg-[#12002C] p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="p"
                    className="text-lg font-light mx-auto leading-6 text-[#B999FA] p-2 w-fit border border-solid border-[#B999FA] rounded-md"
                  >
                    Leave Livestream?
                  </Dialog.Title>


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
    </>
  )
}
