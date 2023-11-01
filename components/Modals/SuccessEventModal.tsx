import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import {useLayoutStore, useProfileStore} from 'stores'
import Link from "next/link";

interface ModalProps {
  isOpen: boolean,
  eventId: string | undefined
}



export default function SuccessEventModal({ isOpen, eventId } : ModalProps) {
  const { signerAddress } = useLayoutStore((state) => state)

  function closeModal() {

  }


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-0" onClose={closeModal}>
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
                <Dialog.Panel className="flex flex-col items-center w-full max-w-md transform overflow-hidden rounded-2xl bg-black  p-6 text-left align-middle shadow-xl transition-all">
                  <img src={'/gif/mine-cube.gif'} alt={'mine cube gif'} className={'h-32 w-32 p-0 m-0'} />


                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6"
                  >
                    Thanks for your submission!
                  </Dialog.Title>
                  <p className={'text-center mb-2'}>
                    Please give us at least 24 hours to review your submission. If approved then your stream it will be available in the explore page and listeners will be able to reserve their spot.
                  </p>

                  <p className={'text-center m-0'}>
                    Until then check out your Event info page which also contains your stream key and broadcasting guide, which inlcudes instruction on how to stream with MINE.FM when your show is live.
                  </p>


                  <div className="mt-4">
                    { eventId ?
                      <Link href={`/livestream/${eventId}`}>
                      <button
                        type="submit"
                        className="not-italic bg-black/40 h-12 rounded-lg font-mono font-bold text-green-200 text-lg p-2 px-4 border-[#7DD934] border-solid cursor-pointer mb-8"
                      >
                        Head to your event info page
                      </button>
                    </Link> :
                      <button
                        className="not-italic bg-black/40 h-12 border-[#7DD934] border-solid rounded-lg font-mono font-bold text-green-200 text-lg p-2 px-4 cursor-pointer mb-8"
                      >
                        Fetching Event Data
                      </button>
                    }

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
